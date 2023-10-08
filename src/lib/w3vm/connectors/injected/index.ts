import { Injected, Provider } from "@w3vm/core";

export const roninInjected = new Injected({
  name: 'Ronin Wallet',
  getProvider: ()=>{
    if(typeof window === 'undefined') return
    return window.ronin?.provider
  }
})

declare global{
  interface Window {
    ronin?: {
      provider: Provider,
      roninEvent: EventTarget
    }
  }
}