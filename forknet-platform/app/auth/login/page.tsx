"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"

const walletOptions = [
  {
    id: "hashpack",
    name: "HashPack",
    description: "The primary Hedera wallet",
    icon: "🔷",
    color: "#822DFF"
  },
  {
    id: "blade",
    name: "Blade Wallet", 
    description: "Hedera-native wallet",
    icon: "⚡",
    color: "#00D2FF"
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "With Hedera network support",
    icon: "🦊",
    color: "#FF6B35"
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect mobile wallets",
    icon: "📱",
    color: "#00F5A0"
  }
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('email')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { connectWallet } = useWallet()

  const handleWalletConnect = async (walletId: string) => {
    setIsLoading(true)
    try {
      await connectWallet(walletId)
      router.push('/customer/dashboard')
    } catch (error) {
      console.error('Wallet connection failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/customer/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#822DFF]/5 to-[#FF6B35]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-[#4A5568] hover:text-[#1A1D29] mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#822DFF] to-[#6B21A8] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-[#1A1D29] font-bold text-3xl">ForkNet</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1D29] mb-3">Welcome Back</h1>
          <p className="text-[#4A5568] text-lg">Sign in to your account</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex rounded-xl bg-[#F8F9FA] p-1.5">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'email'
                    ? 'bg-white text-[#1A1D29] shadow-md'
                    : 'text-[#4A5568] hover:text-[#1A1D29]'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('wallet')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'wallet'
                    ? 'bg-white text-[#1A1D29] shadow-md'
                    : 'text-[#4A5568] hover:text-[#1A1D29]'
                }`}
              >
                <Wallet className="h-4 w-4 inline mr-2" />
                Wallet
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {loginMethod === 'email' ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1A1D29] font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1A1D29] font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF] pr-12 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#4A5568] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button 
                  onClick={handleEmailLogin}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#822DFF] to-[#6B21A8] hover:from-[#6B21A8] hover:to-[#5A1A96] text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-[#4A5568]">Connect your Hedera wallet to continue</p>
                </div>
                {walletOptions.map((wallet) => (
                  <Button
                    key={wallet.id}
                    onClick={() => handleWalletConnect(wallet.id)}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-2 border-gray-200 hover:border-[#822DFF] hover:bg-[#822DFF]/5 transition-all duration-200 group"
                  >
                    <span className="text-2xl mr-4">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-[#1A1D29] group-hover:text-[#822DFF] transition-colors">{wallet.name}</div>
                      <div className="text-sm text-[#4A5568]">{wallet.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            <div className="text-center">
              <p className="text-[#4A5568]">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-[#822DFF] hover:text-[#6B21A8] font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-[#718096] text-sm">
            By signing in, you agree to our{" "}
            <Link href="/legal/terms" className="text-[#822DFF] hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/legal/privacy" className="text-[#822DFF] hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
