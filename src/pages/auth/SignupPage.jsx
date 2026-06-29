import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Store, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "SELLER"])
});
function SignupPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER"
    }
  });
  const selectedRole = watch("role");
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(data);
      setAuth(response.user, response.token);
      toast.success("Account created successfully!");
      if (response.user.role === "SELLER") {
        navigate("/seller/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return <>
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3">
          <Label>I want to sign up as a</Label>
          <div className="grid grid-cols-2 gap-4">
            <div
    className={cn(
      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors",
      selectedRole === "CUSTOMER" ? "border-primary bg-primary/5 shadow-sm" : "hover:bg-muted"
    )}
    onClick={() => setValue("role", "CUSTOMER")}
  >
              <User className={cn("h-6 w-6", selectedRole === "CUSTOMER" ? "text-primary" : "text-muted-foreground")} />
              <span className="text-sm font-medium">CUSTOMER</span>
            </div>
            <div
    className={cn(
      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors",
      selectedRole === "SELLER" ? "border-primary bg-primary/5 shadow-sm" : "hover:bg-muted"
    )}
    onClick={() => setValue("role", "SELLER")}
  >
              <Store className={cn("h-6 w-6", selectedRole === "SELLER" ? "text-primary" : "text-muted-foreground")} />
              <span className="text-sm font-medium">SELLER</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
    id="name"
    placeholder="John Doe"
    {...register("name")}
    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
  />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
    id="email"
    type="email"
    placeholder="m@example.com"
    {...register("email")}
    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
  />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
    id="password"
    type="password"
    {...register("password")}
    className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
  />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Account
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
      <div className="mt-8 flex justify-center border-t border-border/10 pt-6">
        <Link
    to="/"
    className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors gap-3 group"
  >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Browse as Guest
        </Link>
      </div>
    </>;
}
export {
  SignupPage
};
