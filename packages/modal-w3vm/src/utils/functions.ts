import { connectW3, disconnectW3, getW3 } from "@w3vm/core"
import { isMobile } from "./mobile"
import { WALLETCONNECT_ID } from "../w3vm/constants"
import { set } from "../store"
import { ConnectorID } from "../types"

export function openModal() {
  if (getW3.address()) return disconnectW3()
  if (isMobile()) {
    const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID)
    if(connector) connectW3({ connector })
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
  const address = getW3.address()
  if(!address) return
  loadENS()
  if(address) return address.slice(0, 6) + '...' + address.slice(-6)
}

async function loadENS(){
  try{
    const data: unknown = await fetch(`https://rns.rest/lookup/${getW3.address()}`)
    if((data as { name: string })?.name) return (data as { name: string }).name
  }catch(e){console.log(e)}
}

export async function connectModal(CONNECTOR_ID: ConnectorID){
  const connector = getW3.connectors().find(({ id }) => id === CONNECTOR_ID)
  if(connector) connectW3({ connector })
}