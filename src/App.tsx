import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Cart from "./views/Cart"
import Products from "./views/Products"

const router = createBrowserRouter([
  {
    // index: true,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />
      },
      {
        path: "cart",
        element: <Cart />
      },
    ]
  }
])

const App = () => {
  useEffect(()=> {
    window.localStorage.clear()
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
