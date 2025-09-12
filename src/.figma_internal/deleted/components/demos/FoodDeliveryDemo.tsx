import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Plus, Search, Filter, Heart, ArrowLeft, ShoppingCart, Minus, CreditCard, Clock3, Car, CheckCircle2, MapPinIcon, User, Phone } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Color scheme as requested
const colors = {
  primary: '#4CAF50',     // Fresh Green
  secondary: '#795548',   // Earthy Brown
  accent: '#FFB300',      // Citrus Orange
  background: '#F5F5F5',  // Neutral Background
  text: '#212121'         // Text / Dark Contrast
};

const restaurants = [
  { 
    id: 1, 
    name: "QuickBite Burgers", 
    rating: 4.3, 
    time: "15-25 min", 
    cuisine: "Fast Food",
    image: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NTY3MDQyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    delivery: "Free",
    promoted: true,
    distance: "0.8 km"
  },
  { 
    id: 2, 
    name: "Pizza Palace", 
    rating: 4.5, 
    time: "25-35 min", 
    cuisine: "Pizza",
    image: "https://images.unsplash.com/photo-1651978595423-9c91f4883ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjBkZWxpdmVyeXxlbnwxfHx8fDE3NTY3MTMxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    delivery: "$2.99",
    promoted: false,
    distance: "1.2 km"
  },
  { 
    id: 3, 
    name: "Golden Dragon", 
    rating: 4.2, 
    time: "20-30 min", 
    cuisine: "Chinese",
    image: "https://images.unsplash.com/photo-1652862730506-9f7310faabbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZm9vZCUyMHRha2VvdXR8ZW58MXx8fHwxNzU2NzEzMTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    delivery: "$1.99",
    promoted: false,
    distance: "0.5 km"
  },
  { 
    id: 4, 
    name: "Brew & Beans", 
    rating: 4.7, 
    time: "10-15 min", 
    cuisine: "Coffee",
    image: "https://images.unsplash.com/photo-1674724610138-23464928987a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwZHJpbmt8ZW58MXx8fHwxNzU2NzEzMTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    delivery: "Free",
    promoted: false,
    distance: "0.3 km"
  }
];

const categories = [
  { name: "All", icon: "🍽️", active: true },
  { name: "Fast Food", icon: "🍔", active: false },
  { name: "Pizza", icon: "🍕", active: false },
  { name: "Asian", icon: "🥡", active: false },
  { name: "Coffee", icon: "☕", active: false }
];

const menuItems = [
  { 
    id: 1,
    name: "Classic Burger", 
    price: 12.99, 
    image: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NTY3MDQyNDV8MA&ixlib=rb-4.1.0&q=80&w=200",
    description: "Juicy beef patty with fresh lettuce, tomato, and special sauce",
    popular: true,
    rating: 4.6,
    reviews: 156
  },
  { 
    id: 2,
    name: "Crispy Chicken Nuggets", 
    price: 8.99, 
    image: "https://images.unsplash.com/photo-1566918214014-a3b3e0132267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGdvbGRlbnxlbnwxfHx8fDE3NTY3MTMxODF8MA&ixlib=rb-4.1.0&q=80&w=200",
    description: "Golden crispy chicken pieces with your choice of dipping sauce",
    popular: false,
    rating: 4.4,
    reviews: 89
  },
  { 
    id: 3,
    name: "Golden Fries", 
    price: 4.99, 
    image: "https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweXxlbnwxfHx8fDE3NTY2MjEyMjV8MA&ixlib=rb-4.1.0&q=80&w=200",
    description: "Perfectly seasoned and crispy golden french fries",
    popular: true,
    rating: 4.7,
    reviews: 234
  }
];

const orderSteps = [
  { status: "confirmed", label: "Order confirmed", time: "2:14 PM", icon: "✓", description: "We've received your order" },
  { status: "preparing", label: "Restaurant preparing", time: "2:16 PM", icon: "👨‍🍳", description: "Your food is being prepared" },
  { status: "pickup", label: "Driver picking up", time: "2:28 PM", icon: "🏃‍♂️", description: "Driver is collecting your order" },
  { status: "delivery", label: "On the way", time: "2:32 PM", icon: "🚗", description: "Your order is being delivered" },
  { status: "delivered", label: "Delivered", time: "2:45 PM", icon: "🎉", description: "Enjoy your meal!" }
];

type Screen = 'loading' | 'home' | 'menu' | 'cart' | 'payment' | 'tracking' | 'completed';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function FoodDeliveryDemo({ isVisible, isLiveDemo = false }: { isVisible: boolean; isLiveDemo?: boolean }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrderStep, setCurrentOrderStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Auto-play sequence when demo is visible and not in live mode
  useEffect(() => {
    if (!isVisible || isLiveDemo) {
      setCurrentScreen('loading');
      setCartItems([]);
      setCurrentOrderStep(0);
      return;
    }

    const autoPlaySequence = async () => {
      // Loading screen
      setCurrentScreen('loading');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show home screen with restaurants
      setCurrentScreen('home');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to menu
      setCurrentScreen('menu');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add items to cart automatically
      setCartItems([
        { id: 1, name: "Classic Burger", price: 12.99, quantity: 1, image: menuItems[0].image },
        { id: 3, name: "Golden Fries", price: 4.99, quantity: 1, image: menuItems[2].image }
      ]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show cart
      setCurrentScreen('cart');
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Show payment
      setCurrentScreen('payment');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show tracking
      setCurrentScreen('tracking');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Progress through order steps
      for (let i = 0; i < orderSteps.length; i++) {
        setCurrentOrderStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Show completion
      setCurrentScreen('completed');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Reset
      setCurrentScreen('loading');
      setCartItems([]);
      setCurrentOrderStep(0);
    };

    autoPlaySequence();
  }, [isVisible, isLiveDemo]);

  const addToCart = (item: typeof menuItems[0]) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(cartItem => 
          cartItem.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="relative bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ width: '320px', height: '640px' }}>
      {/* Status Bar */}
      <div className="bg-white flex justify-between items-center px-6 py-2 text-sm relative z-10">
        <span style={{ color: colors.text }}>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.text }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.text }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <div className="ml-2 text-xs" style={{ color: colors.text }}>100%</div>
          <div className="w-6 h-3 border rounded-sm" style={{ borderColor: colors.text }}>
            <div className="w-full h-full rounded-sm" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Loading Screen */}
        {currentScreen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🍔
            </motion.div>
            <h1 className="text-white text-2xl mb-2">QuickEats</h1>
            <p className="text-white/80 text-center px-8">Delicious food delivered to your door</p>
            <motion.div
              className="mt-8 w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Home Screen */}
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full bg-white"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Deliver to</p>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" style={{ color: colors.accent }} />
                    <span style={{ color: colors.text }}>Home - 123 Main St</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  {getTotalItems() > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {getTotalItems()}
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for food or restaurants"
                  className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-lg text-sm"
                  style={{ color: colors.text }}
                />
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              </div>

              {/* Categories */}
              <div className="flex gap-3 mb-6 overflow-x-auto">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[60px]`}
                    style={{
                      backgroundColor: category.active ? colors.primary : '#f3f4f6',
                      color: category.active ? 'white' : colors.text
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg mb-1">{category.icon}</span>
                    <span className="text-xs">{category.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Restaurants List */}
            <div className="flex-1 px-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: colors.text }}>Popular near you</h3>
                <span className="text-sm" style={{ color: colors.primary }}>See all</span>
              </div>
              
              <div className="space-y-4">
                {restaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onTap={() => {
                      if (isLiveDemo) {
                        setSelectedRestaurant(restaurant);
                        setCurrentScreen('menu');
                      }
                    }}
                    style={{ cursor: isLiveDemo ? 'pointer' : 'default' }}
                  >
                    {restaurant.promoted && (
                      <div className="text-white text-xs px-3 py-1" style={{ backgroundColor: colors.accent }}>
                        ⚡ Promoted
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                          <ImageWithFallback 
                            src={restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 style={{ color: colors.text }}>{restaurant.name}</h4>
                              <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                            </div>
                            <Heart className="w-5 h-5 text-gray-300" />
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                              <span className="text-sm">{restaurant.rating}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm">{restaurant.time}</span>
                            </div>
                            <span className="text-sm text-gray-600">• {restaurant.distance}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm" style={{ color: colors.primary }}>
                              {restaurant.delivery === "Free" ? "Free delivery" : `${restaurant.delivery} delivery`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Screen */}
        {currentScreen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full bg-white"
          >
            {/* Restaurant Header */}
            <div className="relative">
              <div className="h-32 flex items-end p-6" style={{ backgroundColor: colors.primary }}>
                <button 
                  className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  onClick={() => isLiveDemo && setCurrentScreen('home')}
                  disabled={!isLiveDemo}
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <div className="text-white">
                  <h2 className="text-xl">{selectedRestaurant.name}</h2>
                  <p className="text-green-100 text-sm">{selectedRestaurant.cuisine} • {selectedRestaurant.time} • {selectedRestaurant.delivery} delivery</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>{selectedRestaurant.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">(1,200+ ratings)</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Info</button>
                    <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Reviews</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-6 py-4">
              <h3 className="text-lg mb-4" style={{ color: colors.text }}>Popular items</h3>
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 style={{ color: colors.text }}>{item.name}</h4>
                          {item.popular && (
                            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: colors.accent }}>Popular</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                          <span className="text-sm">{item.rating}</span>
                          <span className="text-gray-500 text-sm">({item.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg" style={{ color: colors.primary }}>${item.price}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-white p-2 rounded-lg shadow-md"
                            style={{ backgroundColor: colors.primary }}
                            onClick={() => isLiveDemo && addToCart(item)}
                            disabled={!isLiveDemo}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm ml-4">
                        <ImageWithFallback 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Button */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-4 bg-white border-t border-gray-100"
              >
                <motion.button
                  className="w-full text-white py-4 rounded-xl shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => isLiveDemo && setCurrentScreen('cart')}
                  disabled={!isLiveDemo}
                >
                  View cart ({getTotalItems()}) • ${getTotalPrice().toFixed(2)}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Cart Screen */}
        {currentScreen === 'cart' && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full bg-white"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => isLiveDemo && setCurrentScreen('menu')}
                  disabled={!isLiveDemo}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" style={{ color: colors.text }} />
                  <span style={{ color: colors.text }}>Back</span>
                </button>
                <h2 className="text-lg" style={{ color: colors.text }}>Your Cart</h2>
                <ShoppingCart className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-100 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 style={{ color: colors.text }}>{item.name}</h4>
                        <p style={{ color: colors.primary }}>${item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => isLiveDemo && removeFromCart(item.id)}
                          disabled={!isLiveDemo}
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span style={{ color: colors.text }}>{item.quantity}</span>
                        <button
                          onClick={() => isLiveDemo && addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, description: '', popular: false, rating: 0, reviews: 0 })}
                          disabled={!isLiveDemo}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: colors.background }}>
                <h3 className="mb-3" style={{ color: colors.text }}>Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span style={{ color: colors.text }}>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span style={{ color: colors.text }}>$2.99</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span style={{ color: colors.text }}>Total</span>
                    <span style={{ color: colors.primary }}>${(getTotalPrice() + 2.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-4 bg-white border-t border-gray-100">
              <motion.button
                className="w-full text-white py-4 rounded-xl"
                style={{ backgroundColor: colors.primary }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isLiveDemo && setCurrentScreen('payment')}
                disabled={!isLiveDemo}
              >
                Proceed to Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Payment Screen */}
        {currentScreen === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full bg-white"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => isLiveDemo && setCurrentScreen('cart')}
                  disabled={!isLiveDemo}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" style={{ color: colors.text }} />
                  <span style={{ color: colors.text }}>Back</span>
                </button>
                <h2 className="text-lg" style={{ color: colors.text }}>Payment</h2>
                <CreditCard className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
            </div>

            <div className="flex-1 px-6 py-4">
              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="mb-4" style={{ color: colors.text }}>Payment Method</h3>
                <div className="space-y-3">
                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'}`}
                    style={{ borderColor: paymentMethod === 'card' ? colors.primary : '#e5e7eb' }}
                    onClick={() => isLiveDemo && setPaymentMethod('card')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                        <span style={{ color: colors.text }}>Credit Card</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'card' ? 'bg-primary border-primary' : 'border-gray-300'}`} 
                           style={{ backgroundColor: paymentMethod === 'card' ? colors.primary : 'transparent', borderColor: paymentMethod === 'card' ? colors.primary : '#d1d5db' }} />
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer ${paymentMethod === 'cash' ? 'border-primary' : 'border-gray-200'}`}
                    style={{ borderColor: paymentMethod === 'cash' ? colors.primary : '#e5e7eb' }}
                    onClick={() => isLiveDemo && setPaymentMethod('cash')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">💵</span>
                        <span style={{ color: colors.text }}>Cash on Delivery</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'cash' ? 'bg-primary border-primary' : 'border-gray-300'}`}
                           style={{ backgroundColor: paymentMethod === 'cash' ? colors.primary : 'transparent', borderColor: paymentMethod === 'cash' ? colors.primary : '#d1d5db' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="mb-4" style={{ color: colors.text }}>Delivery Address</h3>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 mr-3 mt-1" style={{ color: colors.accent }} />
                    <div>
                      <p style={{ color: colors.text }}>Home</p>
                      <p className="text-gray-600 text-sm">123 Main Street, Apt 4B</p>
                      <p className="text-gray-600 text-sm">New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Total */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.background }}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl" style={{ color: colors.primary }}>${(getTotalPrice() + 2.99).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="p-4 bg-white border-t border-gray-100">
              <motion.button
                className="w-full text-white py-4 rounded-xl"
                style={{ backgroundColor: colors.primary }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isLiveDemo && setCurrentScreen('tracking')}
                disabled={!isLiveDemo}
              >
                Place Order
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Tracking Screen */}
        {currentScreen === 'tracking' && (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full bg-white"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg" style={{ color: colors.text }}>Track Order</h2>
                  <p className="text-gray-600 text-sm">Order #QE2024-1234</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Estimated arrival</p>
                  <p style={{ color: colors.primary }}>2:45 PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-40 flex items-center justify-center m-4 rounded-xl" style={{ backgroundColor: colors.background }}>
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-gray-600 text-sm">Live tracking map</p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full mx-auto mt-2"
                  style={{ backgroundColor: colors.primary }}
                />
              </div>
            </div>

            {/* Driver Info */}
            <div className="mx-4 mb-4 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <span className="text-white text-lg">👨‍🍳</span>
                </div>
                <div className="flex-1">
                  <p style={{ color: colors.text }}>Alex - Your Driver</p>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
                    <span>4.9 • 3 min away</span>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                  <Phone className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Order Progress */}
            <div className="px-6 py-4">
              <h3 className="mb-4" style={{ color: colors.text }}>Order Status</h3>
              <div className="space-y-4">
                {orderSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: index <= currentOrderStep ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center`}
                         style={{
                           backgroundColor: index <= currentOrderStep ? colors.primary : '#e5e7eb',
                           color: index <= currentOrderStep ? 'white' : '#9ca3af'
                         }}>
                      <span className="text-sm">{index <= currentOrderStep ? step.icon : index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className={index <= currentOrderStep ? '' : 'text-gray-400'} style={{ color: index <= currentOrderStep ? colors.text : '#9ca3af' }}>
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                    {index === currentOrderStep && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Screen */}
        {currentScreen === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="h-full flex flex-col items-center justify-center px-6"
            style={{ backgroundColor: colors.primary }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-white text-2xl mb-4 text-center">Order Delivered!</h2>
            <p className="text-white/80 text-center mb-8">
              Your delicious meal from {selectedRestaurant.name} has been delivered successfully!
            </p>
            
            <div className="w-full max-w-sm space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white py-3 rounded-xl"
                style={{ color: colors.primary }}
                onClick={() => isLiveDemo && setCurrentScreen('home')}
                disabled={!isLiveDemo}
              >
                Order Again
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-white text-white py-3 rounded-xl"
                onClick={() => isLiveDemo && setCurrentScreen('home')}
                disabled={!isLiveDemo}
              >
                Rate Your Experience
              </motion.button>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8"
            >
              <span className="text-white/60 text-sm">Thank you for using QuickEats!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}