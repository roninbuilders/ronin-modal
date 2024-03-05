import { createStore } from "vanilla-cafe";
import { CoreStates } from "./types";

export const {
	set: setCore,
	sub: subCore,
	get: getCore,
} = createStore<CoreStates>({
	status: undefined,
	address: undefined,
	URI: '',
	RNS: undefined,
  is_SIWE_enabled: false,

	/* functions */
	extensionInstalled: () => false,
	connectWalletConnect: undefined,
	connectExtension: undefined,
	disconnect: undefined,
})