import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Award, 
  Users, 
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  Heart,
  Smile,
  Stethoscope
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DentalWebsiteDemoProps {
  isVisible: boolean;
  isLiveDemo: boolean;
}

export function DentalWebsiteDemo({ isVisible, isLiveDemo }: DentalWebsiteDemoProps) {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isVisible || isLiveDemo) return;
    
    const sequence = [
      { page: 'home', duration: 3000 },
      { page: 'services', duration: 2500 },
      { page: 'booking', duration: 2500 },
      { page: 'about', duration: 2000 },
      { page: 'home', duration: 1000 }
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setCurrentPage(sequence[currentIndex].page);
    }, sequence[currentIndex]?.duration || 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, isLiveDemo]);

  const services = [
    {
      title: "General Dentistry",
      description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments.",
      price: "From $120",
      icon: <Stethoscope className="w-3 h-3" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Cosmetic Dentistry",
      description: "Enhance your smile with veneers, whitening, and aesthetic treatments.",
      price: "From $300",
      icon: <Smile className="w-3 h-3" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Orthodontics",
      description: "Braces and clear aligners to straighten teeth and correct bite issues.",
      price: "From $2,500",
      icon: <ShieldCheck className="w-3 h-3" />,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Emergency Care",
      description: "Immediate dental care for urgent situations and dental emergencies.",
      price: "From $150",
      icon: <Heart className="w-3 h-3" />,
      color: "bg-red-50 text-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Dr. Smith and the team at ISmile made me feel so comfortable. My new smile looks amazing!",
      treatment: "Cosmetic Dentistry"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Professional, friendly, and excellent results. Highly recommend for anyone looking for quality dental care.",
      treatment: "General Dentistry"
    },
    {
      name: "Emily Davis",
      rating: 5,
      text: "The best dental experience I've ever had. The staff is incredibly caring and skilled.",
      treatment: "Orthodontics"
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBookingSubmit = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Handle form submission
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setBookingStep(1);
        setSelectedService('');
        setSelectedDate('');
        setSelectedTime('');
        setBookingForm({ name: '', email: '', phone: '', message: '' });
        setCurrentPage('home');
      }, 3000);
    }
  };

  const NavBar = () => (
    <motion.nav 
      className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="px-2 py-1">
        <div className="flex justify-between items-center h-8">
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-teal-500 rounded flex items-center justify-center">
              <Smile className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900">ISmile</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-3 text-xs">
            {['home', 'services', 'about', 'booking'].map((page) => (
              <motion.button
                key={page}
                onClick={() => isLiveDemo && setCurrentPage(page)}
                className={`capitalize transition-colors px-2 py-1 rounded ${
                  currentPage === page 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page === 'home' ? 'Home' : page}
              </motion.button>
            ))}
            <Button 
              size="sm"
              onClick={() => isLiveDemo && setCurrentPage('booking')}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-xs h-6 px-2"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  const HomePage = () => (
    <div className="space-y-6 text-xs">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="px-3 py-8">
          <div className="grid grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                ✨ Advanced Dental Care
              </Badge>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Your Perfect{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                  Smile
                </span>{' '}
                Starts Here
              </h1>
              <p className="text-xs text-gray-600 leading-relaxed">
                Experience compassionate, state-of-the-art dental care in a comfortable, 
                welcoming environment.
              </p>
              <div className="flex flex-col gap-2">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-xs h-7"
                  onClick={() => isLiveDemo && setCurrentPage('booking')}
                >
                  Book Appointment
                  <Calendar className="ml-1 w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  <Phone className="mr-1 w-3 h-3" />
                  Call (555) 123-4567
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm58ZW58MXx8fHwxNzU2NzE3ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern dental clinic"
                  className="w-full h-24 object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-6">
        <div className="px-3">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Users, label: "Happy Patients", value: "10,000+" },
              { icon: Award, label: "Years Experience", value: "15+" },
              { icon: Star, label: "Average Rating", value: "4.9" },
              { icon: ShieldCheck, label: "Success Rate", value: "98%" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-3 h-3 text-white" />
                </div>
                <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-6 bg-gray-50">
        <div className="px-3">
          <div className="text-center mb-6">
            <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 text-xs">
              Our Services
            </Badge>
            <h2 className="text-sm font-bold text-gray-900 mb-2">
              Comprehensive Dental Care
            </h2>
            <p className="text-xs text-gray-600">
              From routine cleanings to complex procedures, we offer a full range of dental services.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center mb-2 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs">{service.title}</h3>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">{service.description}</p>
                <div className="text-blue-600 font-medium text-xs">{service.price}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => isLiveDemo && setCurrentPage('services')}
              className="text-xs h-7"
            >
              View All Services
              <ChevronRight className="ml-1 w-3 h-3" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => (
    <div className="py-6 bg-white text-xs">
      <div className="px-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 text-xs">
            Complete Care
          </Badge>
          <h2 className="text-sm font-bold text-gray-900 mb-2">
            Our Dental Services
          </h2>
          <p className="text-xs text-gray-600">
            Comprehensive dental care tailored to your needs, using the latest technology and techniques.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${service.color}`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">{service.price}</span>
                    <Button 
                      size="sm"
                      onClick={() => isLiveDemo && setCurrentPage('booking')}
                      className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-xs h-6"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingPage = () => {
    if (showThankYou) {
      return (
        <div className="py-12 bg-gray-50 text-xs">
          <div className="px-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Appointment Booked Successfully!
              </h2>
              <p className="text-xs text-gray-600 mb-4">
                Thank you for choosing ISmile Dental Clinic. We've sent a confirmation email to your address.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg text-left">
                <h4 className="font-medium text-blue-900 mb-2 text-xs">Appointment Details:</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>Service: {selectedService}</div>
                  <div>Date: {selectedDate}</div>
                  <div>Time: {selectedTime}</div>
                  <div>Patient: {bookingForm.name}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="py-6 bg-gray-50 text-xs">
        <div className="px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 text-xs">
              Book Appointment
            </Badge>
            <h2 className="text-sm font-bold text-gray-900 mb-2">
              Schedule Your Visit
            </h2>
            <p className="text-xs text-gray-600">
              Choose your preferred service, date, and time for your appointment.
            </p>
          </motion.div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                Step {bookingStep} of 3
              </CardTitle>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(bookingStep / 3) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <AnimatePresence mode="wait">
                {bookingStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-3"
                  >
                    <h3 className="text-sm font-semibold">Select Service</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service) => (
                        <div
                          key={service.title}
                          onClick={() => isLiveDemo && setSelectedService(service.title)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedService === service.title
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${service.color}`}>
                              {service.icon}
                            </div>
                            <div>
                              <div className="font-medium text-xs">{service.title}</div>
                              <div className="text-xs text-gray-600">{service.price}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {bookingStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-semibold">Choose Date & Time</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Select Date</label>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="text-xs h-8"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Available Times</label>
                        <div className="grid grid-cols-3 gap-1">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => isLiveDemo && setSelectedTime(time)}
                              className={`p-2 text-xs rounded border transition-all ${
                                selectedTime === time
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-3"
                  >
                    <h3 className="text-sm font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input
                          placeholder="Full Name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="text-xs h-8"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          className="text-xs h-8"
                        />
                      </div>
                    </div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="text-xs h-8"
                    />
                    <Textarea
                      placeholder="Additional notes or concerns..."
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      rows={2}
                      className="text-xs"
                    />
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1 text-xs">Appointment Summary</h4>
                      <div className="text-xs text-blue-700 space-y-1">
                        <div>Service: {selectedService}</div>
                        <div>Date: {selectedDate}</div>
                        <div>Time: {selectedTime}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => bookingStep > 1 && setBookingStep(bookingStep - 1)}
                  disabled={bookingStep === 1}
                  className="text-xs h-7"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={handleBookingSubmit}
                  disabled={
                    (bookingStep === 1 && !selectedService) ||
                    (bookingStep === 2 && (!selectedDate || !selectedTime)) ||
                    (bookingStep === 3 && (!bookingForm.name || !bookingForm.email))
                  }
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-xs h-7"
                >
                  {bookingStep === 3 ? 'Book Appointment' : 'Next'}
                  <ChevronRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="py-6 bg-white text-xs">
      <div className="px-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 text-xs">
            About ISmile
          </Badge>
          <h2 className="text-sm font-bold text-gray-900 mb-2">
            Caring for Smiles Since 2008
          </h2>
          <p className="text-xs text-gray-600">
            We're committed to providing exceptional dental care in a comfortable, 
            state-of-the-art environment with a personal touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1683520701490-7172fa20c8f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwdGVhbXxlbnwxfHx8fDE3NTY3MTc4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Our dental team"
              className="w-full h-24 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-bold text-gray-900">Our Expert Team</h3>
            <p className="text-xs text-gray-600">
              Led by Dr. Sarah Smith, our team of experienced dental professionals 
              is dedicated to providing personalized care that meets your unique needs.
            </p>
            <div className="space-y-2">
              {[
                { title: "Advanced Technology", desc: "State-of-the-art equipment for precise treatments" },
                { title: "Personalized Care", desc: "Tailored treatment plans designed just for you" },
                { title: "Comfortable Environment", desc: "Relaxing atmosphere to ease dental anxiety" }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-xs">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-bold text-center text-gray-900 mb-4">
            What Our Patients Say
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 mb-2 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 text-xs">{testimonial.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.treatment}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg shadow-2xl overflow-hidden" style={{ width: '580px', height: '400px' }}>
      <NavBar />
      <div className="h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'booking' && <BookingPage />}
          {currentPage === 'about' && <AboutPage />}
        </AnimatePresence>
      </div>
    </div>
  );
}