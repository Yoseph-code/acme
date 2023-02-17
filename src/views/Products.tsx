import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import useStores from "../hooks/useStores"
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { Product } from "../stores/ProductStore"
import { HiPencil } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const Products = observer(() => {
  const { productStore, cartStore, favoriteStore } = useStores()
  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])
  const [filter, setFilter] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
    getFavorites()
  }, [])

  const getProducts = async () => {
    const result = await productStore.getProducts()

    setProducts(result as any)
  }

  const getFavorites = () => {
    const fav = favoriteStore.getFavoriteList()

    setFavorites(fav as any)
  }

  const setFavorite = async (props: Product) => {
    productStore.deleteProduct(props)
    await getProducts()
    favoriteStore.setFavoreteItem(props)
    getFavorites()
  }

  const setCart = async (props: Product) => {
    cartStore.addToCart(props)
    productStore.deleteProduct(props)
    await getProducts()
  }

  return (
    <>
      <div className="flex justify-between py-5">
        <div />
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-black"
        />
      </div>
      {favorites.length > 0 ? (
        <h1>Favoritos</h1>
      ) : null}
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(favorites) && favorites.filter((e: Product) => {
          if (filter === "") {
            return e
          } else if (e.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return e
          }
        }).map((item: Product) => (
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
                <button
                  onClick={() => setFavorite(item)}
                >
                  <AiFillHeart />
                </button>
                <button
                  onClick={() => setCart(item)}
                >
                  <AiOutlineShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-2" />
      <h1>Produtos</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          Array.isArray(products) && products.filter((e: Product) => {
            if (filter === "") {
              return e
            } else if (e.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
              return e
            }
          }).map((item: Product) => (
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
                  <button
                    onClick={() => {
                      navigate(`/product/${item.id}`)
                    }}
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => setFavorite(item)}
                  >
                    <AiFillHeart />
                  </button>
                  <button
                    onClick={() => setCart(item)}
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