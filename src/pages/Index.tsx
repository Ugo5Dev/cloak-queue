import { WalletConnect } from "@/components/WalletConnect";
import { MatchLobby } from "@/components/MatchLobby";
import { Gamepad2, Lock, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 border-b border-gaming-primary/20 bg-gaming-darker/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PvP Matchmaker</h1>
                <p className="text-sm text-muted-foreground">Fair Competition Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gaming-primary">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Encrypted Ratings</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Match Fairly, Keep Ratings Hidden
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience true competitive gaming where skill matters more than stats. 
              Join encrypted matchmaking queues and compete on equal ground.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-gaming-success">
                <Gamepad2 className="h-5 w-5" />
                <span>Encrypted MMR</span>
              </div>
              <div className="flex items-center gap-2 text-gaming-primary">
                <Lock className="h-5 w-5" />
                <span>Fair Matchmaking</span>
              </div>
              <div className="flex items-center gap-2 text-gaming-secondary">
                <Zap className="h-5 w-5" />
                <span>Instant Queue</span>
              </div>
            </div>
          </section>

          {/* Wallet Connection */}
          <section>
            <WalletConnect />
          </section>

          {/* Match Lobby */}
          <section>
            <MatchLobby />
          </section>

          {/* Features */}
          <section className="text-center space-y-8 pt-16">
            <h2 className="text-3xl font-bold">Why Choose Encrypted Matchmaking?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Gamepad2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Anti-Exploit Protection</h3>
                <p className="text-muted-foreground">
                  Ratings hidden until match start prevents queue dodging and stat manipulation
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                  <Lock className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">True Skill Matching</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms ensure balanced matches without revealing player strengths
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gaming-success rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Fast Queue Times</h3>
                <p className="text-muted-foreground">
                  Optimized matchmaking reduces wait times while maintaining competitive integrity
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;