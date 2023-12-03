import './ui/button'

export {
	setModal,
	getModal,
	subModal,
	openModal,
	closeModal,
	initModal,
	type View,
	type ConnectorID,
} from './core/modal'
export {
	setCore,
	getCore,
	subCore,
	createCore,
	type CreateCore,
	type Core_status,
	type Subscriber,
} from './core/wallet'
export { WALLETCONNECT_ID, INJECTED_ID } from './core/constants'
