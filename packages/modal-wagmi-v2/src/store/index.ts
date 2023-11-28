import { createStore } from 'vanilla-cafe'
import { View } from '../types'
import { Config } from '@wagmi/core'

type ModalStore = {
	open: boolean
	view: View
	config?: Config
	projectId: string
	uri: string
	metadata?: Record<string, string>
	ens?: string
}

export const { set, get, sub } = createStore<ModalStore>({
	open: false,
	view: 'main',
	config: undefined,
	projectId: '',
	metadata: undefined,
	uri: '',
	ens: undefined,
})
