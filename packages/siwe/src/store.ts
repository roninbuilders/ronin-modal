import { createStore } from 'vanilla-cafe'

interface SIWEStore {
	signIn: (()=>Promise<boolean>) | undefined
	signOut: (()=>Promise<void>) | undefined
  getSession: (()=>Promise<boolean>) | undefined
}

export const {
	set: setSIWE,
	sub: subSIWE,
	get: getSIWE,
} = createStore<SIWEStore>({
	signIn: undefined,
	signOut: undefined,
  getSession: undefined
})