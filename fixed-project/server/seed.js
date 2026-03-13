import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User, Admin, Product } from './models/Schema.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop';

const products = [

  // ─── FASHION - Men ───────────────────────────────────────────────
  {
    title: "Men's Classic White Shirt",
    description: "Premium cotton formal shirt with a slim fit design. Perfect for office and casual outings. Breathable fabric for all-day comfort.",
    mainImg: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4466?w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Fashion",
    gender: "Men",
    price: 1299,
    discount: 20
  },
  {
    title: "Men's Slim Fit Jeans",
    description: "Stretchable denim jeans with a modern slim fit. Available in deep blue wash. Durable and stylish for everyday wear.",
    mainImg: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Fashion",
    gender: "Men",
    price: 1899,
    discount: 15
  },
  {
    title: "Men's Casual Polo T-Shirt",
    description: "Soft pique cotton polo t-shirt with ribbed collar. Versatile casual wear for weekends and outings.",
    mainImg: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Fashion",
    gender: "Men",
    price: 799,
    discount: 10
  },

  // ─── FASHION - Women ─────────────────────────────────────────────
  {
    title: "Women's Floral Kurti",
    description: "Beautiful floral printed kurti made from soft rayon fabric. Perfect for festive occasions and casual outings.",
    mainImg: "https://images.unsplash.com/photo-1631233108-48e4584e5e87?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1631233108-48e4584e5e87?w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=80",
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Fashion",
    gender: "Women",
    price: 999,
    discount: 25
  },
  {
    title: "Women's Denim Jacket",
    description: "Trendy light-wash denim jacket with button closure. A must-have layering piece for every season.",
    mainImg: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    category: "Fashion",
    gender: "Women",
    price: 2499,
    discount: 18
  },
  {
    title: "Women's Summer Dress",
    description: "Lightweight flowy summer dress with spaghetti straps. Perfect for beach outings and casual brunches.",
    mainImg: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Fashion",
    gender: "Women",
    price: 1499,
    discount: 30
  },

  // ─── ELECTRONICS ─────────────────────────────────────────────────
  {
    title: "Wireless Bluetooth Earbuds",
    description: "True wireless earbuds with active noise cancellation, 30hr battery life, and IPX5 water resistance. Crystal clear audio.",
    mainImg: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Electronics",
    gender: "Unisex",
    price: 3999,
    discount: 22
  },
  {
    title: "Smart LED Desk Lamp",
    description: "Touch-controlled LED desk lamp with 5 brightness levels and 3 colour modes. USB charging port included.",
    mainImg: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35400bf2?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Electronics",
    gender: "Unisex",
    price: 1799,
    discount: 12
  },
  {
    title: "Portable Power Bank 20000mAh",
    description: "High-capacity power bank with dual USB-A and USB-C outputs. Fast charging support. LED power indicator.",
    mainImg: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
      "https://images.unsplash.com/photo-1618478047523-ddf7e9a8b429?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Electronics",
    gender: "Unisex",
    price: 2199,
    discount: 17
  },
  {
    title: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches. Anti-ghosting technology with N-key rollover for gaming precision.",
    mainImg: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1601445638532-3b6f97a3a3e0?w=800&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Electronics",
    gender: "Unisex",
    price: 4499,
    discount: 20
  },

  // ─── MOBILES ─────────────────────────────────────────────────────
  {
    title: "ProMax X12 Smartphone",
    description: "6.7-inch AMOLED display, 108MP triple camera, 5000mAh battery with 65W fast charging. 8GB RAM + 128GB storage.",
    mainImg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Mobiles",
    gender: "Unisex",
    price: 24999,
    discount: 10
  },
  {
    title: "Budget 5G Phone Z5",
    description: "Affordable 5G smartphone with 6.5-inch IPS LCD, 50MP camera, 5000mAh battery. 4GB RAM + 64GB storage.",
    mainImg: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Mobiles",
    gender: "Unisex",
    price: 12999,
    discount: 8
  },
  {
    title: "UltraSlim Foldable Phone",
    description: "Innovative foldable smartphone with 7.6-inch inner display. Compact and stylish with premium build quality.",
    mainImg: "https://images.unsplash.com/photo-1610945264803-c22b62831454?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1610945264803-c22b62831454?w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Mobiles",
    gender: "Unisex",
    price: 59999,
    discount: 5
  },

  // ─── GROCERIES ───────────────────────────────────────────────────
  {
    title: "Organic Green Tea (100 bags)",
    description: "Premium Darjeeling organic green tea. Rich in antioxidants, helps boost metabolism. No artificial flavours.",
    mainImg: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Groceries",
    gender: "Unisex",
    price: 449,
    discount: 10
  },
  {
    title: "Extra Virgin Olive Oil 1L",
    description: "Cold-pressed extra virgin olive oil from Mediterranean farms. Ideal for cooking, salad dressings, and marinades.",
    mainImg: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
      "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Groceries",
    gender: "Unisex",
    price: 699,
    discount: 15
  },
  {
    title: "Mixed Dry Fruits Pack 500g",
    description: "Premium mix of cashews, almonds, walnuts, and raisins. Packed fresh, no preservatives. Great healthy snack.",
    mainImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Groceries",
    gender: "Unisex",
    price: 599,
    discount: 12
  },

  // ─── SPORTS EQUIPMENT ────────────────────────────────────────────
  {
    title: "Professional Yoga Mat",
    description: "6mm thick non-slip yoga mat with alignment lines. Eco-friendly TPE material. Includes carry strap.",
    mainImg: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Sports-Equipment",
    gender: "Unisex",
    price: 1299,
    discount: 20
  },
  {
    title: "Adjustable Dumbbell Set 20kg",
    description: "Space-saving adjustable dumbbell set. Quick weight change from 2kg to 20kg. Chrome-plated steel construction.",
    mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Sports-Equipment",
    gender: "Unisex",
    price: 4999,
    discount: 25
  },
  {
    title: "Running Sports Shoes",
    description: "Lightweight mesh running shoes with cushioned sole and arch support. Breathable upper for maximum comfort during runs.",
    mainImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Sports-Equipment",
    gender: "Unisex",
    price: 2999,
    discount: 18
  },
  {
    title: "Football Size 5",
    description: "FIFA-approved match football with 32-panel design. Durable PU outer with butyl bladder for consistent air retention.",
    mainImg: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc630e2914?w=800&q=80",
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80"
    ],
    sizes: ["M"],
    category: "Sports-Equipment",
    gender: "Unisex",
    price: 899,
    discount: 10
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    // Seed Admin doc with banner + categories
    await mongoose.connection.collection('admin').deleteMany({});
    await mongoose.connection.collection('admin').insertOne({
      banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80',
      categories: ['Fashion', 'Electronics', 'Mobiles', 'Groceries', 'Sports-Equipment']
    });
    console.log('✅ Admin doc seeded (banner + categories)');

    // Seed a demo admin user
    const existingAdmin = await User.findOne({ email: 'admin@shopez.com' });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'Admin',
        email: 'admin@shopez.com',
        password: hashed,
        usertype: 'admin'
      });
      console.log('✅ Demo admin created → email: admin@shopez.com | password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists, skipping');
    }

    // Seed a demo customer user
    const existingCustomer = await User.findOne({ email: 'customer@shopez.com' });
    if (!existingCustomer) {
      const hashed = await bcrypt.hash('customer123', 10);
      await User.create({
        username: 'John Doe',
        email: 'customer@shopez.com',
        password: hashed,
        usertype: 'customer'
      });
      console.log('✅ Demo customer created → email: customer@shopez.com | password: customer123');
    } else {
      console.log('ℹ️  Customer user already exists, skipping');
    }

    console.log('\n🎉 Database seeded successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
