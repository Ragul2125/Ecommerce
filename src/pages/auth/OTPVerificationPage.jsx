import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function OTPVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);
  const email = location.state?.email || "your email";
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    if (value.length > 1) {
      const pastedData = value.slice(0, 6).split("");
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      const targetIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      if (inputRefs.current[targetIndex]) {
        inputRefs.current[targetIndex]?.focus();
      }
      return;
    }
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(60);
    toast.success("Verification code resent!");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email verified successfully!");
      navigate("/auth/login");
    }, 1e3);
  };
  return <>
      <div className="mb-6">
        <Link to="/auth/forgot-password" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a verification code to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => <Input
    key={index}
    ref={(el) => {
      inputRefs.current[index] = el;
    }}
    type="text"
    inputMode="numeric"
    maxLength={6}
    value={digit}
    onChange={(e) => handleChange(index, e.target.value)}
    onKeyDown={(e) => handleKeyDown(index, e)}
    className="h-12 w-12 text-center text-xl font-medium"
  />)}
        </div>
        
        <Button className="w-full" type="submit" disabled={isLoading || otp.join("").length !== 6}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Verify Email
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Didn't receive the email?{" "}
        <button
    onClick={handleResend}
    disabled={countdown > 0}
    className="text-primary hover:underline disabled:opacity-50 disabled:hover:no-underline"
  >
          {countdown > 0 ? `Resend code in ${countdown}s` : "Click to resend"}
        </button>
      </div>
    </>;
}
export {
  OTPVerificationPage
};
