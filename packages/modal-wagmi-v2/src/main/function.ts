import '../ui/ronin-modal'
import '../ui/button'
import { createConfig, http } from '@wagmi/core'
import type { Chain, Transport } from 'viem'
import { set } from '../store'

type CreateRoninModalOptions = {
  projectId: string
  chain: Chain
  metadata: Record<string, string>
  transport?: Transport
}

export function createRoninModal({ projectId, chain, metadata, transport }: CreateRoninModalOptions){
	if(!projectId) throw Error("Project ID is undefined")
	
	const defaultRPC = chain.rpcUrls.default.http[0]
  const config = createConfig({
		chains: [chain],
		transports:{
			[chain.id]: transport ? transport : http(defaultRPC)
		}
	})

	set.config(config)
	set.projectId(projectId)
	set.metadata(metadata)
	
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
