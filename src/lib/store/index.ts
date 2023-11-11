import { createStore } from "vanilla-cafe";
import { View } from "../types";

type ModalStore = {
  open: boolean
  view: View
}

export const { set, get, sub } = createStore<ModalStore>({
  open: false,
  view: 'main',
})