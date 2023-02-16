import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class FavoriteStore {
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  getLocalStore(item: "favorite"): string[] {
    const result = window.localStorage.getItem(item)

    if (result === null) {
      return []
    }

    return JSON.parse(result)
  }

  setLocalStore(type: "favorite", ids: string[]) {
    window.localStorage.setItem(type, JSON.stringify(ids))
  }

  setFavoreteItem(id: string) {
    const favorites = this.getLocalStore("favorite")

    if (favorites.length === 0) {
      this.setLocalStore("favorite", [id])
      return
    }

    let arr: string[] = favorites

    for (let item of favorites) {
      if (item === id) {
        console.log("item favoritado")
        return
      }
    }

    arr.push(id)

    this.setLocalStore("favorite", arr)
  }

  getFavoriteList(): string[] {
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