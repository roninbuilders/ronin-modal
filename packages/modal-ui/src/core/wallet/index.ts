import type { SIWEConfig } from '@roninbuilders/siwe'
import type { CreateCore } from './types'
import { getCore, setCore, subCore } from './store'

export function createCore(config: CreateCore) {
	if (typeof window === 'undefined') return

  if(config.siweConfig){
    import('@roninbuilders/siwe').then(({ initSIWE })=>{
      initSIWE(config.siweConfig as SIWEConfig)
      setCore.is_SIWE_enabled(true)
    })
  }

	setCore.address(config.address)
	setCore.status(config.status)

	setCore.extensionInstalled(() => config.extensionInstalled)
	setCore.connectExtension(() => config.connectExtension)
	setCore.connectWalletConnect(() => config.connectWalletConnect)
	setCore.disconnect(() => async() => {
    config.disconnect?.()
    
    if(getCore.is_SIWE_enabled()){
      const { getSIWE } = await import('@roninbuilders/siwe')
      const signOut = getSIWE.signOut()
      if(signOut) signOut()
    }
  })

	config.subscribe_URI(setCore.URI)
	config.subscribe_address(setCore.address)
	config.subscribe_status(setCore.status)

	async function onAddress(address: string | undefined) {
		if (address) {
			try {
        const { getName } = await import('@roninbuilders/rns')
        
				const RNS = await getName(address)
				setCore.RNS(RNS)
			} catch (e) {
				console.error('Error while getting name: ', e)
			}
		} else {
			setCore.RNS(undefined)
		}
	}
	subCore.address(onAddress)
}