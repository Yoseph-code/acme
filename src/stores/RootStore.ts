import { CartStore } from "./CartStore";
import { FavoriteStore } from "./FavoriteStore";
import { ProductStore } from "./ProductStore";

export class RootStore {
  public productStore: ProductStore
  public cartStore: CartStore
  public favoriteStore: FavoriteStore

  constructor() {
    this.productStore = new ProductStore(this)
    this.cartStore = new CartStore(this)
    this.favoriteStore = new FavoriteStore(this)
  }
}