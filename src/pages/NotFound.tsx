
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-neutral p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in glass-panel">
        <h1 className="text-6xl font-bold text-app-text mb-4">404</h1>
        <p className="text-xl text-app-subtle mb-6">Oops! Page not found</p>
        <Button asChild className="bg-app-blue hover:bg-app-blue/90 animate-scale-in">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
