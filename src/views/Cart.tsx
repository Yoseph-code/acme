import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import useStores from "../hooks/useStores"
import { Product } from "../stores/ProductStore"

const Cart = observer(() => {
  const { cartStore } = useStores()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    const result = cartStore.getCartProducts()

    setProducts(result)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {
          Array.isArray(products) && products.map((item: Product) => (
            <div key={item.id} className="bg-gray-700 rounded-md py-2 items-center flex flex-col text-white">
              <div>
                <img src={`https://picsum.photos/id/${item.id}/500/300`} />
              </div>
              <div className="py-2">
                {item.name}
              </div>
              <div className="py-2">
                {item.description}
              </div>
              <div className="flex justify-between w-full px-5 py-4">
                <p>
                  Preço: {String(Number(item.price).toFixed(2))}
                </p>
                <div />
              </div>
              <div className="w-full justify-between gap-2 flex px-2 py-2">
                <button
                  className="bg-green-500 w-full py-2 rounded-md"
                >
                  comprar
                </button>
                <button
                  className="bg-red-500 w-full py-2 rounded-md"
                  onClick={()=> {
                    cartStore.deleteProduct(item)
                    getProducts()
                  }}
                >
                  deletar
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
})

export default Cart