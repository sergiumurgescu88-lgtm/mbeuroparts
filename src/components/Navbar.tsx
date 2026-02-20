import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onSearch: (query: string) => void;
}

export function Navbar({ cartCount, onSearch }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#080810]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3D5AFE] flex items-center justify-center">
              <span className="font-display font-bold text-white text-lg">MB</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">
              MBeuroparts
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-[#12121c] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] sm:text-sm transition-colors"
                placeholder="Search parts by name or model..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#3D5AFE] rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#12121c] border-b border-white/10 px-4 pt-2 pb-4"
        >
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-[#080810] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] sm:text-sm"
              placeholder="Search parts..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </motion.div>
      )}
    </nav>
  );
}
