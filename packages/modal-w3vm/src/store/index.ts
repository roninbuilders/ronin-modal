import { createStore } from 'vanilla-cafe'
import { View } from '../types'

type ModalStore = {
	open: boolean
	view: View
	ens?: string
}

export const { set, get, sub } = createStore<ModalStore>({
	open: false,
	view: 'main',
	ens: undefined,
})
