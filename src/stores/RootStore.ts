import { CartStore } from "./CartStore";
import { ProductStore } from "./ProductStore";

export class RootStore {
  public productStore: ProductStore
  public cartStore: CartStore

  constructor() {
    this.productStore = new ProductStore(this)
    this.cartStore = new CartStore(this)
  }
}