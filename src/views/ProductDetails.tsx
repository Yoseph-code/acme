import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useStores from "../hooks/useStores"
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { Product } from "../stores/ProductStore"

const ProductDetails = observer(() => {
  const { productStore, favoriteStore, cartStore } = useStores()
  const params = useParams()
  const [product, setProduct] = useState<any>({})

  useEffect(() => {
    setProduct(productStore.getOneProduct(String(params.id)))
  }, [])

  const setFavorite = async (props: Product) => {
    productStore.deleteProduct(props)
    favoriteStore.setFavoreteItem(props)
  }

  const setCart = async (props: Product) => {
    cartStore.addToCart(props)
    productStore.deleteProduct(props)
  }

  return (
    <div className="bg-gray-700 p-5 rounded-md flex">
      <div>
        <img src={`https://picsum.photos/id/${product?.id}/500/300`} />
      </div>
      <div className="px-5" />
      <div className="grid grid-cols-3 gap-4 text-white">
        <div>
          <p>Nome:</p>
          <p>{product.name}</p>
        </div>
        <div>
          <p>Descrisao:</p>
          <p>{product.description}</p>
        </div>
        <div>
          <p>Preço:</p>
          <p>{product.price}</p>
        </div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div className="flex justify-between">
          <div />
          <div>
            <button
              className="text-2xl"
              onClick={() => setFavorite(product)}
            >
              <AiFillHeart />
            </button>
            <button
              className="text-2xl"
              onClick={() => setCart(product)}
            >
              <AiOutlineShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductDetails