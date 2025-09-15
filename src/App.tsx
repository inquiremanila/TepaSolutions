import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/sonner'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="pt-16 flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}