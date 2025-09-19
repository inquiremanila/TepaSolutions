import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Play, Pause, Clock, MapPin, DollarSign, Calendar, Camera, FileText, Users } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const projects = [
  { 
    id: 1,
    name: 'Kitchen Renovation', 
    client: 'Johnson Family', 
    rate: 85, 
    status: 'active',
    progress: 65,
    deadline: 'Mar 15',
    address: '123 Oak Street',
    totalHours: 47.5,
    estimatedTotal: 120,
    image: 'https://images.unsplash.com/photo-1642006953665-4046190641ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0b29sc3xlbnwxfHx8fDE3NTU4ODI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  { 
    id: 2,
    name: 'Bathroom Remodel', 
    client: 'Smith Residence', 
    rate: 75, 
    status: 'pending',
    progress: 0,
    deadline: 'Apr 2',
    address: '456 Pine Ave',
    totalHours: 0,
    estimatedTotal: 80,
    image: 'https://images.unsplash.com/photo-1642006953665-4046190641ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0b29sc3xlbnwxfHx8fDE3NTU4ODI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  { 
    id: 3,
    name: 'Deck Installation', 
    client: 'Davis Home', 
    rate: 65, 
    status: 'completed',
    progress: 100,
    deadline: 'Feb 28',
    address: '789 Elm St',
    totalHours: 52,
    estimatedTotal: 50,
    image: 'https://images.unsplash.com/photo-1642006953665-4046190641ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0b29sc3xlbnwxfHx8fDE3NTU4ODI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
  }
];

const timeEntries = [
  { id: 1, project: 'Kitchen Renovation', date: 'Today', timeIn: '08:30', timeOut: '12:30', hours: 4.0, notes: 'Installing cabinets' },
  { id: 2, project: 'Kitchen Renovation', date: 'Yesterday', timeIn: '09:00', timeOut: '17:00', hours: 8.0, notes: 'Plumbing rough-in' },
  { id: 3, project: 'Deck Installation', date: 'Mar 1', timeIn: '07:30', timeOut: '15:30', hours: 8.0, notes: 'Final inspection and cleanup' }
];

const expenses = [
  { id: 1, item: 'Cabinet Hardware - Home Depot', amount: 245.67, date: 'Today', category: 'Materials', project: 'Kitchen Renovation', receipt: true },
  { id: 2, item: 'Gas - Shell Station', amount: 52.34, date: 'Yesterday', category: 'Fuel', project: 'General', receipt: true },
  { id: 3, item: 'Lunch - Subway', amount: 12.50, date: 'Yesterday', category: 'Meals', project: 'Kitchen Renovation', receipt: false },
  { id: 4, item: 'Drill Bits - Harbor Freight', amount: 89.99, date: 'Feb 28', category: 'Tools', project: 'General', receipt: true }
];

export function ContractorAppDemo({ isVisible, isLiveDemo = false }: { isVisible: boolean; isLiveDemo?: boolean }) {
  const [currentView, setCurrentView] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentView(0);
      setIsTracking(false);
      setCurrentTime('00:00:00');
      setSeconds(0);
      return;
    }

    const sequence = async () => {
      // Show project list
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to time tracking
      setCurrentView(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Start time tracking
      setIsTracking(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Stop time tracking
      setIsTracking(false);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show expenses view
      setCurrentView(2);
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Back to projects
      setCurrentView(0);
      setSeconds(0);
      setCurrentTime('00:00:00');
    };

    sequence();
  }, [isVisible]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const secs = newSeconds % 60;
          setCurrentTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return newSeconds;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ width: '320px', height: '640px' }}>
      {/* Status Bar */}
      <div className="bg-white flex justify-between items-center px-6 py-2 text-sm border-b border-gray-100">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <div className="text-xs">100%</div>
          <div className="w-6 h-3 border border-gray-800 rounded-sm">
            <div className="w-full h-full bg-green-500 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { name: 'Projects', icon: FileText, index: 0 },
            { name: 'Time', icon: Clock, index: 1 },
            { name: 'Expenses', icon: DollarSign, index: 2 }
          ].map((tab) => (
            <motion.button
              key={tab.name}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === tab.index ? 'text-blue-600' : 'text-gray-500'
              }`}
              animate={{ 
                color: currentView === tab.index ? '#2563eb' : '#6b7280'
              }}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="h-full pb-20 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 0 && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold">ContractorPro</h1>
                    <p className="text-blue-100 text-sm">Mike Johnson Construction</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">MJ</span>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-blue-100 text-xs">Active Jobs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">47.5</p>
                    <p className="text-blue-100 text-xs">Hours This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">$3,875</p>
                    <p className="text-blue-100 text-xs">Week Earnings</p>
                  </div>
                </div>
              </div>

              {/* Projects List */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Current Projects</h2>
                  <button className="text-blue-600 text-sm font-medium">+ New</button>
                </div>

                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{project.address}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={project.status === 'active' ? 'default' : 
                                   project.status === 'completed' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className="bg-blue-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Rate: </span>
                            <span className="font-medium">${project.rate}/hr</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Due: </span>
                            <span className="font-medium">{project.deadline}</span>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                          Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 1 && (
            <motion.div
              key="timetracking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">Time Tracking</h1>
                <p className="text-gray-600 text-sm">Tuesday, March 5, 2024</p>
              </div>

              <div className="px-6 py-4">
                {/* Active Timer */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Kitchen Renovation</h3>
                    <p className="text-gray-600 text-sm">Johnson Family</p>
                  </div>

                  <motion.div 
                    className="text-center mb-6"
                    animate={{ scale: isTracking ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 2, repeat: isTracking ? Infinity : 0 }}
                  >
                    <div className="text-4xl font-mono font-bold text-gray-900 mb-2">{currentTime}</div>
                    <p className="text-green-600 font-medium">
                      {isTracking ? '⏰ Timer Running' : '⏸️ Timer Paused'}
                    </p>
                  </motion.div>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-semibold shadow-lg ${
                        isTracking 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      animate={{ 
                        backgroundColor: isTracking ? '#ef4444' : '#22c55e'
                      }}
                    >
                      {isTracking ? (
                        <>
                          <Pause className="w-5 h-5 inline mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 inline mr-2" />
                          Start
                        </>
                      )}
                    </motion.button>
                    <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>123 Oak Street, Downtown</span>
                    </div>
                  </div>
                </div>

                {/* Recent Time Entries */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">Recent Entries</h3>
                  <div className="space-y-3">
                    {timeEntries.slice(0, 3).map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{entry.project}</h4>
                            <p className="text-gray-600 text-sm">{entry.notes}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>{entry.timeIn} - {entry.timeOut}</span>
                              <span>•</span>
                              <span>{entry.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">{entry.hours}h</p>
                            <p className="text-green-600 text-sm font-medium">${(entry.hours * 85).toFixed(0)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 2 && (
            <motion.div
              key="expenses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Expenses</h1>
                    <p className="text-gray-600 text-sm">March 2024</p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    + Add
                  </button>
                </div>
              </div>

              <div className="px-6 py-4">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200">
                  <div className="text-center">
                    <h3 className="font-semibold text-purple-900 mb-1">Monthly Total</h3>
                    <p className="text-3xl font-bold text-purple-700">$1,247.50</p>
                    <p className="text-purple-600 text-sm">4 categories • 12 receipts</p>
                  </div>
                  
                  {/* Category Breakdown */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { name: 'Materials', amount: 845.67, color: 'bg-blue-100 text-blue-700' },
                      { name: 'Fuel', amount: 165.34, color: 'bg-green-100 text-green-700' },
                      { name: 'Tools', amount: 189.99, color: 'bg-orange-100 text-orange-700' },
                      { name: 'Meals', amount: 46.50, color: 'bg-red-100 text-red-700' }
                    ].map((cat, index) => (
                      <div key={cat.name} className={`${cat.color} p-2 rounded-lg text-center`}>
                        <p className="text-xs font-medium">{cat.name}</p>
                        <p className="text-sm font-bold">${cat.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expense List */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">Recent Expenses</h3>
                  <div className="space-y-3">
                    {expenses.map((expense, index) => (
                      <motion.div
                        key={expense.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            expense.category === 'Materials' ? 'bg-blue-100' :
                            expense.category === 'Fuel' ? 'bg-green-100' :
                            expense.category === 'Tools' ? 'bg-orange-100' : 'bg-red-100'
                          }`}>
                            <span className="text-lg">
                              {expense.category === 'Materials' ? '🔨' : 
                               expense.category === 'Fuel' ? '⛽' :
                               expense.category === 'Tools' ? '🛠️' : '🍽️'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{expense.item}</h4>
                                <p className="text-gray-600 text-sm">{expense.project}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-500">{expense.date}</span>
                                  {expense.receipt && (
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">📸 Receipt</span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">${expense.amount}</p>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {expense.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}