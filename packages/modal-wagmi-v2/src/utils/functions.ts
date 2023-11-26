import { isMobile } from "./mobile"
import { get, set } from "../store"
import { ConnectorID } from "../types"
import { connect, disconnect, getAccount, getConnectors } from '@wagmi/core'
import { injected, walletConnect } from '@wagmi/connectors'
import { RONIN_RDNS } from "../main/constants"

export function openModal() {
  const config = get.config()
  if(!config) throw Error("Config not found")
  if (getAccount(config).isConnected) return disconnect(config)
  if (isMobile()) connect(config, { connector: walletConnect({ projectId: get.projectId(), showQrModal: false }) })
  set.open(true)
}

export function closeModal(){
  set.open(false), set.view('main')
}

export function goToMain(){
  set.view('main')
}

export function getAddress(){
  const config = get.config()
  if(!config) throw Error("Config not found")
  const address = getAccount(config).address 
  if (getAccount(config).isConnected) return
  try{
    // ens
  }catch(e){console.log(e)}
  if(address) return address.slice(0, 6) + '...' + address.slice(-6)
}

export async function connectModal(CONNECTOR_ID: ConnectorID){
  const config = get.config()
  if(!config) throw Error("Config not found")
  const extension = getConnectors(config).find(({id})=> id === RONIN_RDNS)
  await connect(config, { 
    connector: CONNECTOR_ID === 'injected' && extension ? extension : 
      walletConnect({
        projectId: get.projectId(),
        showQrModal: false
      })
  })
}