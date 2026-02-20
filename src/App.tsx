import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { ChatAssistant } from './components/ChatAssistant';
import { Product } from './data';

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    // Optional: Add a toast notification here
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white font-sans selection:bg-[#3D5AFE] selection:text-white">
      <Navbar cartCount={cart.length} onSearch={setSearchQuery} />
      
      <main>
        <Hero />
        <Shop searchQuery={searchQuery} onAddToCart={handleAddToCart} />
        <ChatAssistant />
      </main>

      {/* Footer */}
      <footer className="bg-[#080810] py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} MBeuroparts. Premium Mercedes-Benz Aftermarket & OEM Parts.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-[#3D5AFE] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#3D5AFE] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3D5AFE] transition-colors">Shipping Info</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
