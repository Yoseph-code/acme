import { makeAutoObservable } from "mobx";
import { Product } from "./ProductStore";
import { RootStore } from "./RootStore";

export class CartStore {
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  getLocalStore(item: "cart" | "favorite"): Product[] {
    const result = window.localStorage.getItem(item)

    if (result === null) {
      return []
    }

    return JSON.parse(result)
  }

  setLocalStore(type: "cart" | "favorite", item: Product[]) {
    window.localStorage.setItem(type, JSON.stringify(item))
  }

  addToCart(product: Product) {
    const products = this.getLocalStore("cart")

    if (products.length === 0) {
      this.setLocalStore("cart", [product])
      return
    }

    let arr: Product[] = products

    for (let item of products) {
      if (item.id === product.id) {
        console.log("item adicionado")
        return
      }
    } 

    arr.push(product)

    this.setLocalStore("cart", arr)
  }

  getCartProducts(): Product[] {
    return this.getLocalStore("cart")
  }

  deleteProduct(item: Product) {
    const products = this.getLocalStore("cart")

    const arr: Product[] = []

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === item.id) {
        delete products[i]
      } else {
        arr.push(products[i])
      }
    }

    this.setLocalStore("cart", arr)
  }
}