import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, HeadphonesIcon, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import { Tepabot } from '@/components/Tepabot';

interface ContactUsPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function ContactUsPage({ navigate }: ContactUsPageProps) {
  const contactOptions = [
    {
      title: "Sales Inquiries",
      description: "Talk to our sales team about our services and pricing",
      icon: Phone,
      path: "/contact-us/sales",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues and product support",
      icon: HeadphonesIcon,
      path: "/contact-us/support",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Investor Relations",
      description: "Connect with our investor relations team",
      icon: TrendingUp,
      path: "/contact-us/investors",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const handleNavigation = (path: string) => {
    if (navigate) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Tepa Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for sales inquiries, technical support, or chat with our AI assistant
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  onClick={() => handleNavigation(option.path)}
                  className="w-full group-hover:bg-gray-900 transition-colors"
                >
                  Contact Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tepabot Chat Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chat with Tepabot
            </h2>
            <p className="text-gray-600">
              Get instant answers to your questions with our AI-powered assistant
            </p>
          </div>
          
          {/* Tepabot Component */}
          <div className="max-w-2xl mx-auto">
            <Tepabot />
          </div>
        </div>

        {/* Additional Contact Information */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need something else?
          </h3>
          <p className="text-gray-600 mb-4">
            For general inquiries or other matters, you can also reach us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('/contact-us/event-hosting')}
            >
              Event Hosting
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('/careers')}
            >
              Career Opportunities
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('/volunteer-with-us')}
            >
              Volunteer Opportunities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}