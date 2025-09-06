import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowDown, Zap, Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary/5 to-accent/20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm">Taking on select client projects</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Digital{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ 
                rotate: [0, -5, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Innovation
            </motion.span>
            <br />
            Agency
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We transform businesses with cutting-edge web applications, mobile solutions, and intelligent automation systems. 
            Partner with our expert team to accelerate your digital transformation and unlock unprecedented growth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="size-4 mr-2 group-hover:rotate-12 transition-transform" />
              Explore Our Solutions
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Today
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}