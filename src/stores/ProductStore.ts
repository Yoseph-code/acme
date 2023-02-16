import { makeAutoObservable } from "mobx";
import api from "../api";
import { RootStore } from "./RootStore";

export type Product = {
  author: string
  download_url: string
  height: number
  width: number
  url: string
  id: string
  name: string
  description: string
  price: number
}

export class ProductStore {
  private verbs = ["Armário", "Navio", "Mala", "Base", "Hidroavião", "Revista", "Carretel", "Minissaia", "Tamborim",
    "Andador", "Geladeira", "Estátua", "Rolo", "Crachá", "Peneira", "Bafômetro", "Desentupidor",
    "Guarda-chuva", "Espanador", "Escudo", "Raquete", "Vaso sanitário", "Lancheira", "Cofre",
    "Helióstato", "Medalha", "Foguete", "Lata", "Sintetizador", "Grampo", "Bucha", "Catraca",
    "Alfinete", "Caneca", "Fita", "Moeda", "Gel", "Maquete", "Interfone", "Gaveta", "Helicóptero",
    "Vela de cera", "Quimono", "Necessaire", "Machado", "Tecido", "Vareta de freio", "Obra de arte",
    "Canga"]
  private adjectives = ["prepotente", "valioso", "legítimo", "desleixado", "Natural", "inteligente", "disciplinado",
    "louvável", "amargurado", "honesto", "odioso", "vergonhoso", "horroroso", "magnífico", "gordo",
    "romântico", "sublime", "mesquinho", "injusto", "medroso", "otário", "quente", "intenso", "Sábio",
    "zeloso", "desapegado", "faceiro", "companheiro", "empenhado", "espantoso", "traidor",
    "perfeccionista", "Qualificado", "feio", "tolerante", "orgulhoso", "ignorante", "lutador", "desejado",
    "exigente", "nostálgico", "próspero", "compreensivo", "excelente", "estourado", "malvado",
    "windsurfista", "falso", "melhor", "terno"]
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  private randomNum(max: number, min: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  getLocalStore(type: "products"): Product[] {
    const result = window.localStorage.getItem(type)

    if (result === null) {
      return []
    }

    return JSON.parse(result)
  }

  setLocalStore(type: "products", products: Product[]) {
    window.localStorage.setItem(type, JSON.stringify(products))
  }

  async getProducts() {
    const res = this.getLocalStore("products")

    if (res.length === 0) {
      const { data } = await api.get("/list")

      let result: Product[] = []

      for (let i = 0; i < data.length; i++) {
        const verb = this.verbs[this.randomNum(0, this.verbs.length)]
        const adjective = this.adjectives[this.randomNum(0, this.adjectives.length)]

        const name = verb + " " + adjective
        // const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis perferendis iure optio quibusdam fugiat autem assumenda sint earum dolorem error, modi repellendus sit quae expedita quo. Officia animi repellendus quibusdam."
        const description = "algum text ai improvisado"

        result.push({
          ...data[i],
          name,
          description,
          price: 10 + name.length * ((500 - description.length) / (3 - name.length))
        })
      }

      this.setLocalStore("products", result)

      return result
    }

    return res
  }
}