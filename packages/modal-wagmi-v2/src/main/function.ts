import '../ui/ronin-modal'
import '../ui/button'
import { createConfig, getConnectors, http } from '@wagmi/core'
import { set } from '../store'
import { walletConnect } from '@wagmi/connectors'
import { WALLETCONNECT_ID } from '../utils/constants'
import { CreateRoninModalOptions } from '../types'

function handleUri({ type, data }: { type: string, data?: unknown }) {
  if(type === 'display_uri'){
    set.uri(data as string)
  }
}

export function createRoninModal({ projectId, chain, metadata, transport }: CreateRoninModalOptions){
	if(!projectId) throw Error("Project ID is undefined")
	
	const defaultRPC = chain.rpcUrls.default.http[0]  
  const config = createConfig({
		chains: [chain],
    connectors: [walletConnect({ projectId, showQrModal: false, metadata })],
		transports:{
			[chain.id]: transport ? transport : http(defaultRPC)
		}
	})
  getConnectors(config).find(({id})=> id === WALLETCONNECT_ID)?.emitter.on('message', handleUri)

	set.config(config)
	
	if (typeof window !== 'undefined') {
		const fontEl = document.createElement('link')
		fontEl.rel = 'stylesheet'
		fontEl.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap'
	
		document.head.appendChild(fontEl)
	
		const modal = document.createElement('ronin-modal')
		document.body.insertAdjacentElement('beforeend', modal)
		document.body.style.width = '100%'
	}

	return config
}
