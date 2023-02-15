import { ProductStore } from "./ProductStore";

export class RootStore {
  public productStore: ProductStore

  constructor() {
    this.productStore = new ProductStore(this)
  }
}