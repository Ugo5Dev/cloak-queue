# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on the dashboard
3. Import your GitHub repository `Ugo5Dev/cloak-queue`
4. Select the repository and click "Import"

### Step 2: Configure Project Settings

1. **Project Name**: `cloak-queue` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to your project settings and add these environment variables:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

**Important**: 
- Replace `YOUR_INFURA_KEY` with your actual Infura API key
- Replace `YOUR_PROJECT_ID` with your WalletConnect project ID
- Get these from [Infura](https://infura.io) and [WalletConnect](https://cloud.walletconnect.com)

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to your project settings
2. Navigate to "Domains" section
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Smart Contract Deployment

1. **Deploy Contract**: Deploy the `CloakQueue.sol` contract to Sepolia testnet
2. **Update Contract Address**: Update `CONTRACT_ADDRESS` in `src/lib/contract.ts`
3. **Redeploy**: Push changes to trigger automatic redeployment

### Environment Variables for Production

For production deployment, consider using these secure practices:

1. **Use Vercel Environment Variables**: Store sensitive data in Vercel dashboard
2. **Separate Testnet/Mainnet**: Use different environment variables for different networks
3. **API Keys**: Rotate API keys regularly

## Troubleshooting

### Common Issues

1. **Build Failures**: Check if all dependencies are properly installed
2. **Environment Variables**: Ensure all required variables are set
3. **Contract Address**: Verify the contract address is correct and deployed
4. **Network Issues**: Ensure the RPC URL is accessible

### Build Logs

Check build logs in Vercel dashboard:
1. Go to your project
2. Click on the deployment
3. View build logs for any errors

### Local Testing

Test locally before deploying:
```bash
npm install
npm run build
npm run preview
```

## Security Considerations

1. **API Keys**: Never commit API keys to the repository
2. **Environment Variables**: Use Vercel's environment variable system
3. **HTTPS**: Vercel automatically provides HTTPS
4. **CORS**: Configure CORS settings if needed

## Performance Optimization

1. **Build Optimization**: Vite automatically optimizes builds
2. **CDN**: Vercel provides global CDN
3. **Caching**: Configure appropriate caching headers
4. **Image Optimization**: Use Vercel's image optimization features

## Monitoring

1. **Analytics**: Enable Vercel Analytics for performance monitoring
2. **Error Tracking**: Consider adding error tracking services
3. **Uptime Monitoring**: Monitor your application's uptime

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Report issues in the repository
- **Community**: Join Vercel community for support

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings correct
- [ ] Smart contract deployed
- [ ] Contract address updated
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Documentation updated