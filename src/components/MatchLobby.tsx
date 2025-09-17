import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerCard } from "./PlayerCard";
import { Search, Users, Clock, Zap } from "lucide-react";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

const mockPlayers = [
  { id: "1", username: "ShadowStrike", level: 45, isReady: true },
  { id: "2", username: "NeonHunter", level: 38, isReady: true },
  { id: "3", username: "CyberWolf", level: 52, isReady: false },
  { id: "4", username: "QuantumRage", level: 41, isReady: true },
];

export function MatchLobby() {
  const { address, isConnected } = useAccount();
  const [isInQueue, setIsInQueue] = useState(false);
  const [queueTime, setQueueTime] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const { writeContract: registerPlayer } = useWriteContract();
  const { writeContract: joinQueue } = useWriteContract();
  const { writeContract: leaveQueue } = useWriteContract();

  // Read contract data
  const { data: playerId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerId',
    args: address ? [address] : undefined,
  });

  const { data: queueSize } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getQueueSize',
  });

  const { data: inQueue } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'isPlayerInQueue',
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    if (playerId && Number(playerId) > 0) {
      setIsRegistered(true);
    }
  }, [playerId]);

  useEffect(() => {
    if (inQueue) {
      setIsInQueue(true);
    } else {
      setIsInQueue(false);
      setMatchFound(false);
    }
  }, [inQueue]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInQueue && !matchFound) {
      interval = setInterval(() => {
        setQueueTime(prev => prev + 1);
        
        // Simulate match found after 15 seconds
        if (queueTime >= 15) {
          setMatchFound(true);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInQueue, matchFound, queueTime]);

  const handleRegister = async () => {
    if (!isConnected) return;
    
    try {
      await registerPlayer({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'registerPlayer',
        // No value parameter - this is a non-payable function
      });
    } catch (error) {
      console.error('Failed to register player:', error);
    }
  };

  const handleJoinQueue = async () => {
    if (!isConnected || !isRegistered) return;
    
    try {
      // Simulate encrypted MMR data (in real implementation, this would be FHE encrypted)
      const mockEncryptedMMR = {
        data: '0x' + '0'.repeat(64), // Mock encrypted data
        signature: '0x' + '0'.repeat(130) // Mock signature
      };
      
      await joinQueue({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'joinQueue',
        args: [mockEncryptedMMR, '0x'], // Mock FHE parameters
        // No value parameter - this is a non-payable function
      });
    } catch (error) {
      console.error('Failed to join queue:', error);
    }
  };

  const handleLeaveQueue = async () => {
    if (!isConnected) return;
    
    try {
      await leaveQueue({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'leaveQueue',
        // No value parameter - this is a non-payable function
      });
    } catch (error) {
      console.error('Failed to leave queue:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Queue Status */}
      <Card className="p-6 border-gaming-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gaming-primary" />
              <span className="font-medium">Competitive Match</span>
            </div>
            {isInQueue && (
              <div className="flex items-center gap-2 text-gaming-success">
                <Clock className="h-4 w-4" />
                <span>{formatTime(queueTime)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant={matchFound ? "default" : isInQueue ? "secondary" : "outline"}>
              {matchFound ? "Match Found!" : isInQueue ? "In Queue" : "Ready"}
            </Badge>
            
            {!isRegistered ? (
              <Button 
                onClick={handleRegister}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={!isConnected}
              >
                <Search className="h-4 w-4 mr-2" />
                Register Player
              </Button>
            ) : !isInQueue ? (
              <Button 
                onClick={handleJoinQueue}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={!isConnected}
              >
                <Search className="h-4 w-4 mr-2" />
                Find Match
              </Button>
            ) : (
              <Button 
                onClick={handleLeaveQueue}
                variant="destructive"
                disabled={!isConnected}
              >
                Leave Queue
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Match Found */}
      {matchFound && (
        <Card className="p-6 bg-gradient-secondary border-gaming-secondary/30 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary-foreground" />
              <div>
                <h3 className="text-xl font-bold text-primary-foreground">Match Found!</h3>
                <p className="text-primary-foreground/80">Launching in 10 seconds...</p>
              </div>
            </div>
            <Button size="lg" className="bg-gaming-success hover:bg-gaming-success/90">
              Accept Match
            </Button>
          </div>
        </Card>
      )}

      {/* Players in Lobby */}
      {(isInQueue || matchFound) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Players in Queue ({queueSize ? Number(queueSize) : 0}/100)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                showEncrypted={!matchFound}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}