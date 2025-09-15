import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/OtherComponent/Footer'
import { Toaster } from './components/ui/sonner'

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation navigate={navigate} currentPath={pathname} />
      <main className="pt-16 flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}