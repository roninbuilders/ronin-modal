import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from 'wagmi'
import { createRoninModal } from '@roninbuilders/modal-wagmi'
import { ronin, saigon } from 'viem/chains'

const queryClient = new QueryClient()

export const config = createRoninModal({
  projectId:"cdbd18f9f96172be74c3e351ce99b908",
  chain: saigon,
  metadata: { 
    name: 'Example', 
    description: 'Example website', 
    url: 'https://example.com',
    icons: []
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider> 
    </WagmiProvider>
  </React.StrictMode>,
)
