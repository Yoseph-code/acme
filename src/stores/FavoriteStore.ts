import { makeAutoObservable } from "mobx";
import { Product } from "./ProductStore";
import { RootStore } from "./RootStore";

export class FavoriteStore {
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  getLocalStore(item: "favorite"): Product[] {
    const result = window.localStorage.getItem(item)

    if (result === null) {
      return []
    }

    return JSON.parse(result)
  }

  setLocalStore(type: "favorite", ids: Product[]) {
    window.localStorage.setItem(type, JSON.stringify(ids))
  }

  setFavoreteItem(props: Product) {
    const favorite = this.getLocalStore("favorite")

    if (favorite.length === 0) {
      this.setLocalStore("favorite", [props])
      return
    }

    let arr: Product[] = favorite

    for (let item of favorite) {
      if (item.id === props.id) {
        console.log("item adicionado")
        return
      }
    } 

    arr.push(props)

    this.setLocalStore("favorite", arr)
  }

  getFavoriteList(): Product[] {
    return this.getLocalStore("favorite")
  }

  deleteFavorite(item: string) {
    // const favorites = this.getLocalStore("favorite")

    // const arr: Favorite[] = []

    // for (let i = 0; i < favorites.length; i++) {
    //   if (favorites[i].id === item.id) {
    //     delete products[i]
    //   } else {
    //     arr.push(products[i])
    //   }
    // }

    // this.setLocalStore("cart", arr)
  }
}