import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
function NotFoundPage() {
  return <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-8">
        <span className="font-heading text-4xl font-bold text-muted-foreground">404</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-heading mb-4">Page not found</h1>
      <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={() => window.history.back()} className="h-12 px-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
        <Button asChild className="h-12 px-6">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>;
}
export {
  NotFoundPage
};
