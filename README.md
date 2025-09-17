# 🎮 Cloak Queue - Next-Gen Gaming Matchmaking

> **Revolutionary encrypted matchmaking platform powered by FHE technology**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ugo5Dev/cloak-queue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🚀 What Makes Us Different?

Cloak Queue isn't just another matchmaking service—it's a **paradigm shift** in competitive gaming. We've eliminated the core problems that plague traditional matchmaking systems:

- 🔒 **Zero Rating Visibility**: Your MMR is encrypted until match start
- ⚡ **Instant Fair Matches**: No more queue dodging or stat manipulation  
- 🛡️ **FHE-Powered Security**: Military-grade encryption for all player data
- 🌐 **Web3 Native**: Built for the decentralized gaming future

## 🎯 Core Features

### 🔐 Fully Homomorphic Encryption (FHE)
- Player ratings encrypted on-chain using Zama's FHE technology
- Matchmaking algorithms work on encrypted data
- Zero-knowledge proof of fair matching

### 🎮 Smart Contract Integration
- Ethereum Sepolia testnet deployment
- Gas-efficient matchmaking operations
- Transparent and verifiable match results

### 💼 Multi-Wallet Support
- RainbowKit integration for seamless wallet connection
- Support for MetaMask, WalletConnect, and more
- One-click registration and queue joining

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **UI/UX** | shadcn/ui, Radix UI, Tailwind CSS |
| **Web3** | RainbowKit 2.2.8, Wagmi 2.9.0, Viem 2.33.0 |
| **Blockchain** | Ethereum Sepolia Testnet |
| **Encryption** | Zama FHE (Fully Homomorphic Encryption) |
| **Smart Contracts** | Solidity with FHE integration |

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Ugo5Dev/cloak-queue.git
cd cloak-queue

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
# Blockchain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 🎮 How It Works

### 1. **Player Registration**
```typescript
// Register on-chain with encrypted initial MMR
await registerPlayer();
```

### 2. **Queue Joining**
```typescript
// Join matchmaking queue with encrypted rating
await joinQueue(encryptedMMR, proof);
```

### 3. **Match Creation**
```typescript
// Smart contract creates fair matches
// without revealing player ratings
const match = await createMatch(players);
```

### 4. **Result Processing**
```typescript
// Update ratings with encrypted calculations
await completeMatch(matchId, results, newMMRs);
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Smart         │    │   FHE           │
│   (React)       │◄──►│   Contract      │◄──►│   Network       │
│                 │    │   (Solidity)    │    │   (Zama)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Wallet        │    │   Ethereum      │    │   Encrypted     │
│   Integration   │    │   Sepolia       │    │   Computations  │
│   (RainbowKit)  │    │   Testnet       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
cloak-queue/
├── 📁 contracts/           # Smart contracts
│   └── CloakQueue.sol     # Main FHE-enabled contract
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── WalletConnect.tsx
│   │   ├── MatchLobby.tsx
│   │   └── 📁 ui/         # shadcn/ui components
│   ├── 📁 lib/            # Utilities and configs
│   │   ├── wallet.ts      # Wallet configuration
│   │   └── contract.ts    # Contract ABI and config
│   └── 📁 pages/          # Page components
├── 📄 vercel.json         # Deployment configuration
└── 📄 README.md           # This file
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Deploy on Vercel**
   - Import repository from GitHub
   - Set environment variables
   - Deploy automatically

3. **Configure Environment**
   ```env
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=your_rpc_url
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting service
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Smart Contract Development

```bash
# Deploy contract to Sepolia
npx hardhat deploy --network sepolia

# Update contract address in src/lib/contract.ts
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push and create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed

## 📊 Roadmap

- [ ] **Multi-chain Support** - Expand to Polygon, Arbitrum
- [ ] **Advanced FHE Features** - More complex encrypted computations
- [ ] **Mobile App** - React Native implementation
- [ ] **Tournament System** - Encrypted tournament brackets
- [ ] **Cross-game Compatibility** - Support multiple game types

## 🐛 Troubleshooting

### Common Issues

**Wallet Connection Failed**
```bash
# Check network configuration
# Ensure you're on Sepolia testnet
# Verify WalletConnect project ID
```

**Contract Interaction Errors**
```bash
# Check contract address
# Verify ABI compatibility
# Ensure sufficient gas fees
```

**Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** for FHE technology
- **RainbowKit** for wallet integration
- **shadcn/ui** for beautiful components
- **Vercel** for deployment platform

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/Ugo5Dev/cloak-queue/issues)
- **Documentation**: Check our [deployment guide](DEPLOYMENT.md)
- **Community**: Join our Discord for discussions

---

<div align="center">

**Built with ❤️ by the Cloak Queue team**

[⭐ Star us on GitHub](https://github.com/Ugo5Dev/cloak-queue) • [🐛 Report Issues](https://github.com/Ugo5Dev/cloak-queue/issues) • [💬 Join Discussion](https://github.com/Ugo5Dev/cloak-queue/discussions)

</div>