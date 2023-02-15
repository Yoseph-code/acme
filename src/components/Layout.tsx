import { Link, Outlet } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"

const Layout = () => {
  return (
    <>
      <nav className="fixed z-50 top-0 left-0 right-0 bg-gray-600 py-5 px-5 flex justify-between">
        <Link to="/" className="text-white">
          Acme
        </Link>
        <Link to="/" className="text-white text-2xl">
          <AiOutlineShoppingCart />
        </Link>
      </nav>
      <main className="mt-16 container mx-auto">
        <Outlet />
      </main>
    </>
  )
}

export default Layout