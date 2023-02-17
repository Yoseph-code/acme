import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import useStores from "../hooks/useStores"
import { Product } from "../stores/ProductStore"
import { AiOutlineCloseCircle } from "react-icons/ai"

const Cart = observer(() => {
  const { cartStore } = useStores()
  const [products, setProducts] = useState<Product[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [content, setContent] = useState({})

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    const result = cartStore.getCartProducts()

    setProducts(result)
  }

  const getContent = () => {
    const cart = cartStore.getCartProducts()

    setContent({
      ...content,
      cart
    })
  }

  return (
    <>
      <div className="flex justify-between">
        <div />
        <button
          className="bg-gray-700 rounded-md py-5 px-5 text-white"
          onClick={() => {
            setOpenModal(!openModal)
            getContent()
          }}
        >
          checkout
        </button>
      </div>
      {
        openModal ? (
          <div className="fixed z-50 flex items-center justify-center inset-0">
            <div className="container mx-auto">
              <div className="bg-gray-700 rounded-md overflow-scroll max-h-[500px] min-w-[450px] py-2 px-5 text-white">
                <div className="flex justify-between">
                  <div />
                  <button
                    className="text-4xl"
                    onClick={() => {
                      setOpenModal(!openModal)
                    }}
                  >
                    <AiOutlineCloseCircle />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <pre>
                    {String(JSON.stringify(content, null, 2)) ?? ""}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
      <div className="py-2" />
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
                  onClick={() => {
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