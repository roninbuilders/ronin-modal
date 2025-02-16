import { setSIWE } from './store'
import { SIWEConfig } from './types'
import { createSiweMessage as _createSiweMesage } from 'viem/siwe'

export async function initSIWE({
	getNonce,
	getChainId,
	getAddress,
	signMessage,
	verifyMessage,
	getSession,
	message,
	onSignIn,
	signOut,
}: SIWEConfig) {
	if (typeof window === 'undefined') return

	const domain = window.location.hostname
	const origin = window.location.origin

	async function createSiweMessage() {
		const address = await getAddress() as `0x${string}` | undefined
		if (!address) throw new Error('Error creating a SIWE message - wallet disconnected')

		const nonce = await getNonce()
		if (typeof nonce !== 'string')
			throw new Error("Error creating a SIWE message - nonce doesn't satisfies type string")

		const chainId = await getChainId()
		if (chainId !== 2020 && chainId !== 2021)
			throw new Error('Error creating a SIWE message - invalid Chain ID: Please switch to the Ronin Network')

		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1)
		
		return _createSiweMesage({
			domain,
			address,
			statement: 'Sign In With Ronin.',
			uri: origin,
			version: '1',
			chainId,
			nonce,
			expirationTime: currentDate,
			...message,
		})
	}

	async function signIn() {
		const message = await createSiweMessage()
		
		const signature = await signMessage(message)

		const isValid = await verifyMessage({ message, signature })
		if (!isValid) throw new Error('Error verifying SIWE signature')

		const session = await getSession()
		if (!session) throw new Error('Error verifying SIWE signature - session is undefined')

		if (onSignIn) onSignIn(session)

		return Boolean(signature) && Boolean(isValid) && Boolean(session)
	}

	setSIWE.signIn(() => signIn)
	setSIWE.signOut(() => signOut)
	setSIWE.getSession(() => getSession)
}

export { getSIWE } from './store'
export type { SIWEConfig }
