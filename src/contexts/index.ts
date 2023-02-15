import { createContext } from "react";
import { RootStore } from "../stores/RootStore";

export const storesContext = createContext(new RootStore)