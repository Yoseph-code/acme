import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import useStores from "../hooks/useStores"
import { AiFillHeart } from "react-icons/ai"

const Products = observer(() => {
  const { productStore } = useStores()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const result = await productStore.getProducts()

    setProducts(result as any)
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">Descrição</th>
            <th scope="col" className="px-6 py-3">Preço</th>
            <th scope="col" className="px-6 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(products) && products.map((item: any, index: number) => (
              <tr key={item.id} className="border-b bg-gray-800 border-gray-700">
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                  {String(item.id)}
                </td>
                <td className="px-6 py-4">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  {item.description}
                </td>
                <td className="px-6 py-4">
                  {String(item.price)}
                </td>
                <td className="px-6 py-4">
                  <button>
                    <AiFillHeart />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
})

export default Products