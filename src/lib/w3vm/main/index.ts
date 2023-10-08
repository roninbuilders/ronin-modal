import { Chain, initW3 } from "@w3vm/core"
import { roninInjected } from "../connectors/injected"
import { WalletConnect, subWC } from "@w3vm/walletconnect"
import { isAndroid, isMobile } from "../../utils/mobile"

/* Import Web Components */
import '../../ui/ronin-modal/index'

type RoninOptions = {
  SSR?: boolean
  projectId: string
  chains: Chain[]
}

export function createRoninModal({ SSR, projectId, chains }: RoninOptions){
  const w3props = initW3({
    connectors: [
      roninInjected, 
      new WalletConnect({ projectId, showQrModal: false, optionalChains: chains.map(({ chainId })=> Number(chainId))})
    ],
    SSR,
  })

  return w3props
}

/* Subscribe to WalletConnect URI for Mobile */
const mobile = isMobile()
const android = isAndroid()

subWC.uri((uri: string)=>{
  if(mobile && Boolean(uri))
  window.open(
    `https://wallet.roninchain.com/auth-connect?uri=${encodeURIComponent(uri)}`,
    android ? '_blanck' : '_self',
    'noreferrer noopener'
  )
})