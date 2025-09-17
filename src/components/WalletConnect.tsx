import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Wallet, CheckCircle } from "lucide-react";
import { useAccount } from 'wagmi';

export function WalletConnect() {
  const { isConnected, address } = useAccount();

  if (isConnected && address) {
    return (
      <Card className="p-6 bg-gradient-primary border-gaming-primary/30">
        <div className="flex items-center gap-3 text-primary-foreground">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Wallet Connected</span>
          <span className="text-sm opacity-80">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-gaming-primary/20">
      <div className="flex flex-col items-center gap-4">
        <Wallet className="h-12 w-12 text-gaming-primary" />
        <h3 className="text-xl font-semibold">Connect Wallet to Queue</h3>
        <p className="text-muted-foreground text-center">
          Connect your wallet to join the matchmaking queue and compete fairly
        </p>
        <ConnectButton 
          chainStatus="icon"
          accountStatus="address"
          showBalance={false}
        />
      </div>
    </Card>
  );
}