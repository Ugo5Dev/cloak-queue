import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Trophy } from "lucide-react";

interface PlayerCardProps {
  player: {
    id: string;
    username: string;
    level: number;
    isReady: boolean;
    avatar?: string;
  };
  showEncrypted?: boolean;
}

export function PlayerCard({ player, showEncrypted = true }: PlayerCardProps) {
  return (
    <Card className="p-4 bg-gradient-dark border-gaming-primary/20 hover:border-gaming-primary/40 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          {player.isReady && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gaming-success rounded-full border-2 border-background" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{player.username}</h4>
            <Badge variant="secondary" className="text-xs">
              LVL {player.level}
            </Badge>
          </div>
          
          {showEncrypted ? (
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <Lock className="h-3 w-3" />
              <span>MMR Encrypted</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gaming-success text-sm mt-1">
              <Shield className="h-3 w-3" />
              <span>Rating: 2,450</span>
            </div>
          )}
        </div>
        
        <div className={`w-2 h-2 rounded-full ${player.isReady ? 'bg-gaming-success' : 'bg-muted'}`} />
      </div>
    </Card>
  );
}