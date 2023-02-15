import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Products from "./views/Products"

const router = createBrowserRouter([
  {
    // index: true,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
