'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  walletAddress: string | null
  balance: string
  connectWallet: (walletType: string) => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState('0.00')

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedWalletState = localStorage.getItem('forknet-wallet')
    if (savedWalletState) {
      try {
        const { isConnected: saved, walletAddress: savedAddress, balance: savedBalance } = JSON.parse(savedWalletState)
        setIsConnected(saved)
        setWalletAddress(savedAddress)
        setBalance(savedBalance)
      } catch (error) {
        console.error('Error loading wallet state:', error)
      }
    }
  }, [])

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    const walletState = {
      isConnected,
      walletAddress,
      balance
    }
    localStorage.setItem('forknet-wallet', JSON.stringify(walletState))
  }, [isConnected, walletAddress, balance])

  const connectWallet = async (walletType: string) => {
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock wallet data based on type
      const mockWallets = {
        hashpack: {
          address: '0.0.123456',
          balance: '1,234.56'
        },
        blade: {
          address: '0.0.789012',
          balance: '2,567.89'
        },
        kabila: {
          address: '0.0.345678',
          balance: '987.65'
        }
      }

      const walletData = mockWallets[walletType as keyof typeof mockWallets]
      
      if (walletData) {
        setIsConnected(true)
        setWalletAddress(walletData.address)
        setBalance(walletData.balance)
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress(null)
    setBalance('0.00')
    localStorage.removeItem('forknet-wallet')
  }

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      balance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
