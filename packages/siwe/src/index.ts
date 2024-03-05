import { setSIWE } from "./store"
import { SIWEConfig } from "./types"
import { SiweMessage } from 'siwe'

export async function initSIWE({ getNonce, getChainId, getAddress, signMessage, verifyMessage, getSession, message, onSignIn, signOut }: SIWEConfig){
  if(typeof window === 'undefined') return

  const domain = window.location.host
  const origin = window.location.origin

  async function createSiweMessage() {
    const address = await getAddress()
    if(!address) throw new Error("Error creating a SIWE message - wallet disconnected")

    const nonce = await getNonce()
    if(typeof nonce !== 'string') throw new Error("Error creating a SIWE message - nonce doesn't satisfies type string")

    const chainId = await getChainId()
    if(chainId !== 2020 && chainId !== 2021) throw new Error("Error creating a SIWE message - invalid Chain ID: Please switch to the Ronin Network")

    const _message = new SiweMessage({
      domain,
      address,
      statement: 'Sign in With Ronin.',
      uri: origin,
      version: '1',
      chainId,
      nonce,
      ...message
    })
    return _message.prepareMessage()
  }

  async function signIn(){
    const message = await createSiweMessage()
    const signature = await signMessage(message)

    const isValid = await verifyMessage({ message, signature })
    if (!isValid) throw new Error('Error verifying SIWE signature')

    const session = await getSession()
    if (!session) throw new Error('Error verifying SIWE signature - session is undefined')

    if (onSignIn) onSignIn(session)
  }

  setSIWE.signIn(()=>signIn)
  setSIWE.signOut(()=>signOut)
  setSIWE.getSession(()=>getSession)
}

export { getSIWE } from './store'
export type { SIWEConfig }