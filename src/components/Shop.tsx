import { useState, useMemo } from 'react';
import { Product, products } from '../data';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

interface ShopProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const categories = ['All', 'S-Class', 'E-Class', 'G-Class'] as const;

export function Shop({ searchQuery, onAddToCart }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-24 bg-[#080810] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Featured Parts
            </h2>
            <p className="text-gray-400 text-lg">
              Precision-engineered components for your Mercedes-Benz.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-[#3D5AFE] text-white border-[#3D5AFE] shadow-[0_0_20px_rgba(61,90,254,0.3)]'
                    : 'bg-[#12121c] text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-2">No parts found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
