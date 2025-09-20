// T-shirt product data
export const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 599,
    originalPrice: 799,
    description: "Premium quality 100% cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy Blue", "Gray"],
    category: "Basic",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Vintage Graphic Tee",
    price: 699,
    originalPrice: 899,
    description: "Retro-inspired graphic t-shirt with vintage artwork. Made from soft cotton blend.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4b3b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f37f4b3b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Red"],
    category: "Graphic",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Premium Polo Shirt",
    price: 1299,
    originalPrice: 1599,
    description: "Classic polo shirt with premium cotton pique fabric. Perfect for casual and semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy Blue", "Black", "Green"],
    category: "Polo",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Oversized Comfort Tee",
    price: 549,
    originalPrice: 699,
    description: "Relaxed fit oversized t-shirt for ultimate comfort. Perfect for lounging and casual outings.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "White", "Beige"],
    category: "Oversized",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Athletic Performance Tee",
    price: 799,
    originalPrice: 999,
    description: "Moisture-wicking athletic t-shirt designed for sports and workouts. Lightweight and breathable.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy Blue", "Red", "Green"],
    category: "Athletic",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Minimalist Logo Tee",
    price: 649,
    originalPrice: 799,
    description: "Clean and simple t-shirt with subtle logo design. Versatile for any occasion.",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    category: "Minimalist",
    rating: 4.2,
    reviews: 67,
    inStock: true,
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Basic', name: 'Basic Tees' },
  { id: 'Graphic', name: 'Graphic Tees' },
  { id: 'Polo', name: 'Polo Shirts' },
  { id: 'Oversized', name: 'Oversized' },
  { id: 'Athletic', name: 'Athletic' },
  { id: 'Minimalist', name: 'Minimalist' }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};
