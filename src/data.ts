export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'S-Class' | 'E-Class' | 'G-Class' | 'All';
  image: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'W223 S-Class AMG Line Front Bumper',
    description: 'Genuine AMG Line front bumper assembly for W223 S-Class.',
    price: 1250.00,
    category: 'S-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: 'p2',
    name: 'W213 E-Class Multibeam LED Headlights',
    description: 'Pair of OEM Multibeam LED headlights for E-Class W213 facelift.',
    price: 2100.00,
    category: 'E-Class',
    image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'p3',
    name: 'W463 G-Class Brabus Style Carbon Hood',
    description: 'Premium carbon fiber hood attachment for G-Class W463.',
    price: 1850.00,
    category: 'G-Class',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
  },
  {
    id: 'p4',
    name: 'S-Class W222 Maybach Forged Wheels 20"',
    description: 'Set of 4 genuine Maybach forged alloy wheels.',
    price: 3400.00,
    category: 'S-Class',
    image: 'https://images.unsplash.com/photo-1620882814836-98b9bc1c1103?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
  },
  {
    id: 'p5',
    name: 'E-Class W213 Carbon Fiber Spoiler',
    description: 'Sleek carbon fiber trunk spoiler for E-Class sedan.',
    price: 450.00,
    category: 'E-Class',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
  },
  {
    id: 'p6',
    name: 'G-Class W463A AMG Exhaust System',
    description: 'Performance valved exhaust system for G63 AMG.',
    price: 4200.00,
    category: 'G-Class',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
];
