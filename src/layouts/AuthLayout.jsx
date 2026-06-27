import { Outlet, Link } from "react-router-dom";
function AuthLayout() {
  return <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 md:p-8">
      {
    /* Background decoration elements for premium feel */
  }
      <div className="absolute inset-0 z-0 overflow-hidden point-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center mt-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <span className="font-bold font-heading text-lg">S</span>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight ">
              Ecommerce
            </span>
          </Link>
        </div>
        
        <div className="glass rounded-2xl p-8 shadow-xl">
          <Outlet />
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>;
}
export {
  AuthLayout
};
