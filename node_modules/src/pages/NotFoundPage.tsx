import { Button } from '../components/ui/button';

export function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={handleGoHome} className="w-full">
            Back to Homepage
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Looking for something specific?</p>
            <div className="mt-2 space-x-4">
              <a href="/mobile-app-development" className="text-primary hover:underline">Mobile Apps</a>
              <a href="/web-application-development" className="text-primary hover:underline">Web Development</a>
              <a href="/business-automation" className="text-primary hover:underline">Automation</a>
              <a href="/contact-us/sales" className="text-primary hover:underline">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}