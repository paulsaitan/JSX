import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import GuideShop from "./components/GuideShop";
import Footer from "./components/Footer";
import PartnersCarousel from "./components/PartnersCarousel";
import ProductList from "./components/ProductList";

import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./context/PrivateRoute";

const Home = () => {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <GuideShop />
        <ProductList showAll={false} />
        <PartnersCarousel />
      </main>

      <Footer />
    </>
  );
};

const Products = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-20">
        <ProductList showAll={true} />
      </main>

      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payment/:paymentId" element={ <PrivateRoute> <Payment /> </PrivateRoute>  }/>

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/payment-cancel" element={<PaymentCancel />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<PrivateRoute>
              
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
