import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/store/authStore";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data.email, data.password);
      setAuth(response.user, response.token);
      toast.success("Successfully logged in!");
      if (response.user.role === "SELLER" && from === "/") {
        navigate("/seller/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  const setDemoSeller = () => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (emailInput && passwordInput) {
      emailInput.value = "seller@premium.com";
      passwordInput.value = "password";
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  const setDemoCustomer = () => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (emailInput && passwordInput) {
      emailInput.value = "customer@premium.com";
      passwordInput.value = "password";
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  return <>
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to log in
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
    id="password"
    type="password"
    {...register("password")}
    className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
  />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or demo with</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="w-full text-xs" onClick={setDemoCustomer}>
            CUSTOMER
          </Button>
          <Button variant="outline" className="w-full text-xs" onClick={setDemoSeller}>
            SELLER
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-primary hover:underline">
          Sign up
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
  LoginPage
};
