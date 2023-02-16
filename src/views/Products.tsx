import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import useStores from "../hooks/useStores"
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { Product } from "../stores/ProductStore"

const Products = observer(() => {
  const { productStore, cartStore } = useStores()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const result = await productStore.getProducts()

    setProducts(result as any)
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
                <div className="gap-5 flex">
                  <button>
                    <AiFillHeart />
                  </button>
                  <button
                    onClick={() => cartStore.addToCart(item)}
                  >
                    <AiOutlineShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
})

export default Products