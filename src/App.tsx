
import { Toaster } from 'sonner'
import './App.css'
import { CartProvider } from './Context/CartContext'
import FloatingCart from './Layout/FloatingCart'
import Navbar from './Layout/Navbar'
import Products from './Pages/Products'

function App() {
  

  return (
    <>
    <CartProvider>
      <Toaster position="top-center"/>
      <Navbar />
      <Products/>
      <FloatingCart />
    </CartProvider>
      
    </>
  )
}

export default App
