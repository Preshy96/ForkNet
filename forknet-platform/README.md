# ForkNet - Web3 Food Delivery Platform

**The Future of Food Delivery**

Experience Web3-powered food delivery with NFT delivery proofs, smart contract escrow, and blockchain-verified reputation systems built on Hedera Hashgraph.

## Overview

ForkNet is a next-generation food delivery platform that combines traditional food delivery services with Web3 technologies. Built on Hedera Hashgraph, it offers immutable delivery verification, smart contract escrow systems, and blockchain-based reputation management.

## Features

### Core Platform Features

- **Modern Landing Page** - Responsive design with dark/light mode support
- **Customer Dashboard** - Browse restaurants, place orders, track deliveries
- **Restaurant Portal** - Manage menu, orders, and analytics
- **Driver Application** - Accept deliveries, track earnings, manage routes
- **Admin Panel** - Platform management and analytics

### Web3 Integration Features

- **NFT Delivery Proofs** - Immutable delivery verification on Hedera
- **Smart Contract Escrow** - Automated payment release system
- **Blockchain Reputation** - Tamper-proof rating and review system
- **Multi-Wallet Support** - HashPack, Blade, and Kabila wallet integration
- **HBAR Payments** - Native cryptocurrency payment support

### Design & User Experience

- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Dark/Light Mode** - System preference detection with manual toggle
- **Professional UI** - Modern design with Hedera brand colors
- **Smooth Animations** - Micro-interactions and loading states
- **Accessibility** - WCAG compliant with screen reader support

## Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features with concurrent rendering

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming support

### Web3 & Blockchain
- **Hedera Hashgraph** - Fast, secure, and sustainable DLT
- **Wallet Integration** - HashPack, Blade, Kabila support
- **Smart Contracts** - Automated escrow and payment systems

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality assurance

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd forknet-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Type checking
npm run type-check   # Run TypeScript compiler

# Testing (if implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Project Structure

```
forknet-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── customer/                 # Customer application
│   │   ├── dashboard/
│   │   ├── restaurants/
│   │   ├── orders/
│   │   └── profile/
│   ├── restaurant/               # Restaurant portal
│   │   └── dashboard/
│   ├── driver/                   # Driver application
│   │   └── dashboard/
│   ├── admin/                    # Admin panel
│   │   └── dashboard/
│   ├── web3/                     # Web3 features
│   │   ├── hedera/
│   │   ├── nft-proofs/
│   │   ├── smart-contracts/
│   │   └── reputation/
│   ├── support/                  # Help & support
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── logo.tsx                  # Brand logo component
│   ├── theme-toggle.tsx          # Dark mode toggle
│   └── wallet-connection-modal.tsx
├── contexts/                     # React contexts
│   └── wallet-context.tsx        # Wallet state management
├── lib/                          # Utility functions
│   ├── utils.ts                  # General utilities
│   └── demo-data.ts              # Mock data for development
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   └── icons/                    # Icon files
├── styles/                       # Additional styles
├── types/                        # TypeScript type definitions
├── hooks/                        # Custom React hooks
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ForkNet

# Hedera Network Configuration
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.123456

# Wallet Configuration
NEXT_PUBLIC_HASHPACK_APP_ID=your_hashpack_app_id
NEXT_PUBLIC_BLADE_APP_ID=your_blade_app_id

# API Configuration
NEXT_PUBLIC_API_URL=https://api.forknet.app
API_SECRET_KEY=your_secret_key

# Database (if using)
DATABASE_URL=postgresql://username:password@localhost:5432/forknet

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Theming & Customization

#### Color Palette
The design uses Hedera-inspired colors:

```css
:root {
  --primary: 147 51 234;        /* Purple */
  --secondary: 99 102 241;      /* Indigo */
  --accent: 59 130 246;         /* Blue */
  --success: 34 197 94;         /* Green */
  --warning: 251 191 36;        /* Yellow */
  --error: 239 68 68;           /* Red */
}
```

#### Custom Components
All UI components are built with shadcn/ui and can be customized:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

#### Responsive Design Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## Web3 Integration

### Supported Wallets

The platform supports multiple Hedera wallets:

- **HashPack** - Most popular Hedera wallet
- **Blade** - Multi-chain wallet with Hedera support
- **Kabila** - Native Hedera wallet

### Smart Contracts

- **Escrow Contract** - Holds payments until delivery confirmation
- **NFT Contract** - Mints delivery proof NFTs
- **Reputation Contract** - Manages user ratings and reviews

### Hedera Services

- **Hedera Consensus Service (HCS)** - Order tracking and messaging
- **Hedera Token Service (HTS)** - HBAR payments and custom tokens
- **Hedera File Service (HFS)** - Metadata storage for NFTs

## Development

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Visit vercel.com
   - Import your GitHub repository
   - Configure environment variables

2. **Automatic deployments**
   - Push to main branch triggers production deployment
   - Pull requests create preview deployments

### Alternative Platforms

#### Netlify
```bash
npm run build
# Deploy the 'out' directory
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance & Security

### Performance Metrics

#### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

#### Optimization Features
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Remove unused code
- **Compression** - Gzip/Brotli compression
- **Caching** - Aggressive caching strategies

### Security

#### Best Practices
- **CSP Headers** - Content Security Policy
- **HTTPS Only** - Secure connections required
- **Input Validation** - All user inputs validated
- **XSS Protection** - Cross-site scripting prevention
- **CSRF Protection** - Cross-site request forgery prevention

#### Web3 Security
- **Wallet Validation** - Verify wallet signatures
- **Transaction Verification** - Validate all blockchain transactions
- **Smart Contract Audits** - Regular security audits

### Accessibility

- **WCAG 2.1 AA Compliant**
- **Screen Reader Support**
- **Keyboard Navigation**
- **High Contrast Mode**
- **Focus Management**
- **Semantic HTML**

## Analytics & Monitoring

### Performance Monitoring
- **Vercel Analytics** - Core web vitals tracking
- **Sentry** - Error tracking and performance monitoring
- **Google Analytics** - User behavior analytics

### Business Metrics
- **Order Volume** - Track daily/monthly orders
- **User Retention** - Monitor user engagement
- **Revenue Tracking** - Financial performance
- **Web3 Adoption** - Blockchain feature usage

## Contributing

We welcome contributions to ForkNet! Please read our contributing guidelines and feel free to submit issues, feature requests, or pull requests.

### Getting Help

If you need help with the project, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Join our community discussions

---