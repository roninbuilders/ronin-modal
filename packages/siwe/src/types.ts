import { SiweMessage } from "siwe"

export type SIWEConfig = {
  getChainId: ()=>Promise<number | undefined> | number | undefined
  getAddress: ()=>Promise<string | undefined> | string | undefined
  signMessage: (message: string)=> Promise<string> | string
  
  /*----Externals----*/
  
  /**Function that returns a randomized token used to prevent replay attacks, at least 8 alphanumeric
   * characters. */
  getNonce: (args?: unknown)=>Promise<string> | string
  getSession: ()=>Promise<unknown>
  onSignIn?: (session?: unknown)=>unknown
  signOut: (args?: unknown)=>Promise<unknown> | unknown
  verifyMessage: ({ message, signature }: { message: string, signature: string })=>unknown
  message: Omit<ConstructorParameters<typeof SiweMessage>, 'nonce' | 'address' | 'chainId'>
}