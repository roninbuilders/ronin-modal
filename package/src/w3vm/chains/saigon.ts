import { Chain } from '@w3vm/core'

export const saigon: Chain = {
	chainName: 'Saigon Testnet',
	chainId: '0x7E5',
	nativeCurrency: {
		name: 'RON',
		symbol: 'RON',
		decimals: 18,
	},
	rpcUrls: ['https://saigon-testnet.roninchain.com/rpc'],
	blockExplorerUrls: ['https://saigon-explorer.roninchain.com/'],
}
