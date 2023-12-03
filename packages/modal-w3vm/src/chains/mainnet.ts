import { Chain } from '@w3vm/core'

export const ronin: Chain = {
	chainName: 'Ronin',
	chainId: '0x7E4',
	nativeCurrency: {
		name: 'RON',
		symbol: 'RON',
		decimals: 18,
	},
	rpcUrls: ['https://api.roninchain.com/rpc'],
	blockExplorerUrls: ['https://app.roninchain.com/'],
}
