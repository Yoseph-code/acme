import { useContext } from "react"
import { storesContext } from "../contexts"

const useStores = function () {
  return useContext(storesContext)
}

export default useStores