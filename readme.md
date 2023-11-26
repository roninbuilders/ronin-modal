# Ronin Modal

Ronin Modal is a framework agnostic UI library that simplifies the integration of the Ronin Wallet connection with websites.

Ronin Modal supports W3Vm and Wagmi v2.

## Installation

```npm2yarn
npm install @roninbuilders/modal
```

## Implementation

1. Import the chain you want to use, you can select Ronin mainnet or Saigon testnet.

2. Get a free project ID from WalletConnect Cloud. This is used for mobile connection.

3. Call the `createRoninModal` function on top of your application.

```ts
import { ronin, saigon, createRoninModal } from "@roninbuilders/modal"

createRoninModal({
	chain: saigon,
	projectId: "WALLETCONNECT_PROJECT_ID",
})
```

Now you can call the web component button anywhere in your application. This web component doesn't require importing
and its CSS style can be overwritten.

```ts
<ronin-button/>
```

if you are **NOT** using React.js, you can use the W3Vm Core functions to get the user address and the provider.

## React

Install W3Vm React to use hooks that are connected to the Ronin Modal.

```npm2yarn
npm install @w3vm/react
```

Use react hooks to get the wallet provider and address. These values are reactive and depend on the Ronin Modal state.

```tsx
import './App.css'
import { ronin, saigon, createRoninModal } from "@roninbuilders/modal"
import { getW3Address, getW3Provider } from '@w3vm/react'

createRoninModal({
	chain: saigon,
	projectId: "WALLETCONNECT_PROJECT_ID",
})

export default function App() {
	const address = getW3Address()
	const provider = getW3Provider()

	console.log(address, provider)

  return <ronin-button/>
}
```

You can wrap the provider with any ethereum library such as Ethers, Viem or Web3js.

### Server Side Rendering

If you are using a Meta-frameworks like Next.js with SSR, you can use the SSR flag to avoid hydration mismatch errors.

1. Add the SSR param when calling `createRoninModal`
2. This function will now return an object, we can call it `w3props` (or any name).
3. Import the `W3` component from W3Vm React and place it on top of your application.

```tsx
import { saigon, createRoninModal } from "@roninbuilders/modal"
import { W3 } from '@w3vm/react'

const w3props = createRoninModal({
	chain: saigon,
	projectId: "WALLETCONNECT_PROJECT_ID",
	SSR: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <W3 {...w3props} /> { /* Required when SSR: true */ }
      <Component {...pageProps} />
    </>
  )
}
```