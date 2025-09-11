import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Package, DollarSign, Users, TrendingUp, Bell, Search, Clock, Star, Truck, AlertTriangle, MapPin, UserPlus } from 'lucide-react';

const weeklyRevenueData = [
  { name: 'Mon', revenue: 1250 },
  { name: 'Tue', revenue: 980 },
  { name: 'Wed', revenue: 1680 },
  { name: 'Thu', revenue: 1150 },
  { name: 'Fri', revenue: 1520 },
  { name: 'Sat', revenue: 2100 },
  { name: 'Sun', revenue: 1380 }
];

const topSellingItems = [
  { name: 'Pepperoni Pizza', sold: 47, revenue: 752 },
  { name: 'Chicken Burger', sold: 38, revenue: 456 },
  { name: 'Caesar Salad', sold: 32, revenue: 288 },
  { name: 'Beef Tacos', sold: 28, revenue: 392 }
];

const customerData = [
  { name: 'New', value: 35, color: '#4CAF50' },
  { name: 'Returning', value: 65, color: '#FFB300' }
];

const topLocations = [
  { area: 'Downtown', orders: 45 },
  { area: 'University District', orders: 38 },
  { area: 'Riverside', orders: 32 },
  { area: 'Mall Area', orders: 28 }
];

const alerts = [
  { id: 1, type: 'delay', message: 'Order #1234 delayed - 45 mins', time: '2 mins ago' },
  { id: 2, type: 'payment', message: 'Payment failed for Order #1235', time: '5 mins ago' },
  { id: 3, type: 'driver', message: '2 drivers went offline', time: '8 mins ago' }
];

export function AdminDashboardDemo({ isVisible, isLiveDemo = false }: { isVisible: boolean; isLiveDemo?: boolean }) {
  const [currentView, setCurrentView] = useState(0);
  const [animatedOrders, setAnimatedOrders] = useState(0);
  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  const [animatedDeliveryTime, setAnimatedDeliveryTime] = useState(0);
  const [animatedDrivers, setAnimatedDrivers] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentView(0);
      setAnimatedOrders(0);
      setAnimatedRevenue(0);
      setAnimatedDeliveryTime(0);
      setAnimatedDrivers(0);
      return;
    }

    const sequence = async () => {
      // Animate dashboard stats
      const animateNumber = (setter: any, target: number, duration: number) => {
        let start = 0;
        const increment = target / (duration / 50);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(start));
          }
        }, 50);
      };

      await new Promise(resolve => setTimeout(resolve, 500));
      animateNumber(setAnimatedOrders, 235, 1500);
      await new Promise(resolve => setTimeout(resolve, 200));
      animateNumber(setAnimatedRevenue, 4580, 1500);
      await new Promise(resolve => setTimeout(resolve, 200));
      animateNumber(setAnimatedDeliveryTime, 32, 1500);
      await new Promise(resolve => setTimeout(resolve, 200));
      animateNumber(setAnimatedDrivers, 12, 1500);

      // Auto-cycle through different views
      const viewCycle = async () => {
        await new Promise(resolve => setTimeout(resolve, 4000));
        setCurrentView(1); // Revenue & Analytics
        await new Promise(resolve => setTimeout(resolve, 4000));
        setCurrentView(2); // Performance & Alerts
        await new Promise(resolve => setTimeout(resolve, 4000));
        setCurrentView(0); // Back to overview
      };

      if (!isLiveDemo) {
        viewCycle();
      }
    };

    sequence();
  }, [isVisible, isLiveDemo]);

  return (
    <div className="bg-gray-50 rounded-lg shadow-2xl overflow-hidden" style={{ width: '580px', height: '400px' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">Q</span>
              </div>
              <h1 className="text-base font-bold text-gray-900">Dashboard</h1>
            </div>
            <nav className="flex gap-4">
              <motion.button 
                className={`text-xs font-medium pb-1 ${currentView === 0 ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                animate={{ color: currentView === 0 ? '#16a34a' : '#6b7280' }}
                onClick={() => isLiveDemo && setCurrentView(0)}
              >
                Overview
              </motion.button>
              <motion.button 
                className={`text-xs font-medium pb-1 ${currentView === 1 ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                animate={{ color: currentView === 1 ? '#16a34a' : '#6b7280' }}
                onClick={() => isLiveDemo && setCurrentView(1)}
              >
                Revenue & Analytics
              </motion.button>
              <motion.button 
                className={`text-xs font-medium pb-1 ${currentView === 2 ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                animate={{ color: currentView === 2 ? '#16a34a' : '#6b7280' }}
                onClick={() => isLiveDemo && setCurrentView(2)}
              >
                Activity
              </motion.button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-6 pr-3 py-1 border border-gray-300 rounded text-xs w-24"
              />
            </div>
            <div className="relative">
              <Bell className="w-4 h-4 text-gray-600" />
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
            </div>
            <div className="w-6 h-6 bg-green-500 rounded-full text-xs text-white flex items-center justify-center font-medium">R</div>
          </div>
        </div>
      </div>

      <div className="p-4 h-full overflow-y-auto">
        {currentView === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Order Overview - Top Row */}
            <div className="grid grid-cols-4 gap-3">
              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <Package className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-green-600 font-medium">+12.3%</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                <motion.p 
                  className="text-lg font-bold text-gray-900"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {animatedOrders}
                </motion.p>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">89.2%</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Completed</p>
                <p className="text-lg font-bold text-gray-900">210</p>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-gray-500">8.9%</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-lg font-bold text-gray-900">21</p>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">×</span>
                  </div>
                  <span className="text-xs text-red-600">1.9%</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Canceled</p>
                <p className="text-lg font-bold text-gray-900">4</p>
              </motion.div>
            </div>

            {/* Revenue and Delivery Performance */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">Daily Revenue</h3>
                  <DollarSign className="w-4 h-4 text-green-500" />
                </div>
                <motion.div 
                  className="text-xl font-bold text-gray-900 mb-1"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  ${animatedRevenue.toLocaleString()}
                </motion.div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+15.3% vs yesterday</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">Delivery Performance</h3>
                  <Truck className="w-4 h-4 text-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Avg. Time</p>
                    <motion.p 
                      className="text-base font-bold text-gray-900"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                    >
                      {animatedDeliveryTime} min
                    </motion.p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Active Drivers</p>
                    <motion.p 
                      className="text-base font-bold text-gray-900"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                    >
                      {animatedDrivers}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Customer Insights and Alerts */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Customer Insights</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">New Today</p>
                    <div className="flex items-center gap-1">
                      <UserPlus className="w-3 h-3 text-green-500" />
                      <span className="text-sm font-bold text-gray-900">28</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Repeat Ratio</p>
                    <span className="text-sm font-bold text-gray-900">65%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Top Location: Downtown</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">45 orders today</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Real-Time Alerts</h3>
                </div>
                <div className="space-y-1">
                  {alerts.slice(0, 2).map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      className={`p-2 rounded text-xs border-l-4 ${
                        alert.type === 'delay' ? 'bg-yellow-50 border-yellow-400' :
                        alert.type === 'payment' ? 'bg-red-50 border-red-400' :
                        'bg-blue-50 border-blue-400'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-gray-600">{alert.time}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentView === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Revenue Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Weekly Revenue Trend</h3>
              <div style={{ width: '100%', height: 140 }}>
                <ResponsiveContainer>
                  <LineChart data={weeklyRevenueData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4CAF50" 
                      strokeWidth={2}
                      dot={{ fill: '#4CAF50', strokeWidth: 1, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Selling Items and Customer Distribution */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Selling Items</h3>
                <div className="space-y-2">
                  {topSellingItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div>
                        <p className="text-xs font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.sold} sold • ${item.revenue}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Distribution</h3>
                <div style={{ width: '100%', height: 100 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={customerData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={40}
                        dataKey="value"
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-3 mt-1">
                  {customerData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-1">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs text-gray-600">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-gray-900">Avg. Order Value</span>
                </div>
                <p className="text-base font-bold text-gray-900">$19.49</p>
                <p className="text-xs text-green-600">+5.2% vs last week</p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-1">
                  <Package className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium text-gray-900">Orders per Hour</span>
                </div>
                <p className="text-base font-bold text-gray-900">9.8</p>
                <p className="text-xs text-blue-600">Peak: 18 (7-8 PM)</p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-purple-500" />
                  <span className="text-xs font-medium text-gray-900">Growth Rate</span>
                </div>
                <p className="text-base font-bold text-gray-900">+18.3%</p>
                <p className="text-xs text-purple-600">Month over month</p>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Delivery Performance Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium text-gray-900">Avg. Delivery Time</span>
                </div>
                <p className="text-lg font-bold text-gray-900">32 min</p>
                <p className="text-xs text-green-600">-3 min vs yesterday</p>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-900">Active Drivers</span>
                </div>
                <p className="text-lg font-bold text-gray-900">12</p>
                <p className="text-xs text-blue-600">2 on break</p>
              </motion.div>

              <motion.div 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-gray-900">Delayed Orders</span>
                </div>
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-xs text-red-600">Require attention</p>
              </motion.div>
            </div>

            {/* Real-Time Alerts */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-1 mb-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Bell className="w-4 h-4 text-red-500" />
                </motion.div>
                <h3 className="text-sm font-semibold text-gray-900">Real-Time Alerts</h3>
                <Badge variant="destructive" className="text-xs">
                  3 Active
                </Badge>
              </div>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    className={`p-2 rounded border-l-4 ${
                      alert.type === 'delay' ? 'bg-yellow-50 border-yellow-400' :
                      alert.type === 'payment' ? 'bg-red-50 border-red-400' :
                      'bg-blue-50 border-blue-400'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-600">{alert.time}</p>
                      </div>
                      <Badge 
                        variant={
                          alert.type === 'delay' ? 'secondary' :
                          alert.type === 'payment' ? 'destructive' :
                          'default'
                        } 
                        className="text-xs"
                      >
                        {alert.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Customer Locations and Driver Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Top Customer Locations</h3>
                </div>
                <div className="space-y-2">
                  {topLocations.map((location, index) => (
                    <motion.div
                      key={location.area}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-900">{location.area}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-900">{location.orders}</span>
                        <span className="text-xs text-gray-600">orders</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-3">
                  <Users className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Driver Performance</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">On-Time Delivery</span>
                    <span className="text-xs font-medium text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Orders Completed</span>
                    <span className="text-xs font-medium">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Average Distance</span>
                    <span className="text-xs font-medium">2.4 km</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}