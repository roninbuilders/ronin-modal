import { isMobile } from "./mobile"
import { get, set } from "../store"
import { ConnectorID } from "../types"
import { Connector, connect, disconnect, getAccount, getConnectors } from '@wagmi/core'
import { INJECTED_ID, RONIN_RDNS, WALLETCONNECT_ID } from "./constants"

export function openModal() {
  const config = get.config()
  if(!config) throw Error("Config not found")

  if (getAccount(config).isConnected) return disconnect(config)

  const connector = getConnectors(config).find(({id})=> id === WALLETCONNECT_ID)
  if (isMobile()){
    if(!connector) throw('WalletConnect connector not found')
    connect(config, { connector })
  }
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
  try{
    // ens
  }catch(e){console.log(e)}
  if(address) return address.slice(0, 6) + '...' + address.slice(-6)
}

export async function connectModal(CONNECTOR_ID: ConnectorID){
  const config = get.config()
  if(!config) throw Error("Config not found")

  let connector: Connector | undefined;
  
  if(CONNECTOR_ID === INJECTED_ID)
    connector = getConnectors(config).find(({id})=> id === RONIN_RDNS)
  else if(CONNECTOR_ID === WALLETCONNECT_ID)
    connector = getConnectors(config).find(({id})=> id === WALLETCONNECT_ID)

  if(!connector) throw Error('Connector not found')
  await connect(config, { connector })
}