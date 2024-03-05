import { createStore } from "vanilla-cafe";
import type { ModalStore } from "./types";

export const {
	set: setModal,
	sub: subModal,
	get: getModal,
} = createStore<ModalStore>({
	open: false,
	view: 'main',
	darkMode: false,
})
