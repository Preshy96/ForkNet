'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/contexts/wallet-context"
import { Loader2, Wallet, Shield, Zap } from 'lucide-react'

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
  const { connectWallet } = useWallet()

  const wallets = [
    {
      id: 'hashpack',
      name: 'HashPack',
      description: 'The most popular Hedera wallet',
      icon: '🔷',
      isRecommended: true
    },
    {
      id: 'blade',
      name: 'Blade Wallet',
      description: 'Secure multi-chain wallet',
      icon: '⚔️',
      isRecommended: false
    },
    {
      id: 'kabila',
      name: 'Kabila Wallet',
      description: 'Enterprise-grade security',
      icon: '🛡️',
      isRecommended: false
    }
  ]

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true)
    setConnectingWallet(walletId)
    
    try {
      await connectWallet(walletId)
      onClose()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
      setConnectingWallet(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-purple-600" />
            <span>Connect Your Wallet</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Secure Connection</span>
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              Your wallet connection is encrypted and secure. We never store your private keys.
            </p>
          </div>

          <div className="space-y-3">
            {wallets.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="w-full h-auto p-4 justify-start hover:bg-purple-50 dark:hover:bg-purple-950/30 border-border/50 hover:border-purple-300 dark:hover:border-purple-700"
                onClick={() => handleConnect(wallet.id)}
                disabled={isConnecting}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{wallet.name}</span>
                      {wallet.isRecommended && (
                        <Badge variant="secondary" className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                  {isConnecting && connectingWallet === wallet.id && (
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>Powered by Hedera Hashgraph - Fast, secure, and eco-friendly</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
