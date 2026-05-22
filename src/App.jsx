import { Routes, Route } from 'react-router-dom';
import { useMB } from './store/MBProvider';
import Nav from './components/Nav';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

export default function App() {
  const { viewport, toast } = useMB();
  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav viewport={viewport} />
      <CartDrawer viewport={viewport} />
      {toast && <Toast msg={toast.msg} />}
      <Routes>
        <Route path="/"            element={<Home          viewport={viewport} />} />
        <Route path="/products"    element={<Products      viewport={viewport} />} />
        <Route path="/product/:id" element={<ProductDetail viewport={viewport} />} />
        <Route path="/cart"        element={<Cart          viewport={viewport} />} />
        <Route path="/checkout"    element={<Checkout      viewport={viewport} />} />
        <Route path="/account"     element={<Account       viewport={viewport} />} />
        <Route path="/about"       element={<About         viewport={viewport} />} />
        <Route path="/gallery"     element={<Gallery       viewport={viewport} />} />
        <Route path="/pricing"     element={<Pricing       viewport={viewport} />} />
        <Route path="/contact"     element={<Contact       viewport={viewport} />} />
      </Routes>
    </div>
  );
}
