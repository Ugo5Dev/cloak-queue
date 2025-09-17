import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Get environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID';
const rpcUrl = import.meta.env.VITE_RPC_URL || 'YOUR_RPC_URL';

export const config = getDefaultConfig({
  appName: 'Cloak Queue',
  projectId,
  chains: [sepolia],
  ssr: false,
});

export const chains = [sepolia];
