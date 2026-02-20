import { Product } from '../data';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#12121c] rounded-2xl border border-white/5 overflow-hidden group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#080810]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 cursor-pointer"
          loading="lazy"
          onClick={() => onViewDetails(product)}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white bg-[#080810]/80 backdrop-blur-md rounded-full border border-white/10 uppercase">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-[#3D5AFE] text-[#3D5AFE]" />
          <span className="text-sm text-gray-400 font-medium">{product.rating}</span>
        </div>
        
        <h3 
          className="text-lg font-display font-bold text-white mb-2 line-clamp-2 cursor-pointer hover:text-[#3D5AFE] transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <button
          onClick={() => onViewDetails(product)}
          className="text-xs font-bold text-[#3D5AFE] uppercase tracking-widest hover:text-white transition-colors mb-6 text-left"
        >
          View Details
        </button>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-2xl font-display font-bold text-white">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-white/5 hover:bg-[#3D5AFE] border border-white/10 hover:border-transparent rounded-full text-white transition-all group/btn"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
