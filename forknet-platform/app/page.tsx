'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Zap, Globe, Star, ChefHat, Truck, Smartphone, Users, TrendingUp, Award, CheckCircle, Menu, X } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "NFT Delivery Proofs",
      description: "Immutable proof of delivery stored on Hedera Hashgraph for complete transparency and trust."
    },
    {
      icon: Zap,
      title: "Smart Contract Escrow",
      description: "Automated payment release upon successful delivery verification, ensuring fair transactions."
    },
    {
      icon: Globe,
      title: "Decentralized Reputation",
      description: "Blockchain-verified ratings and reviews that can't be manipulated or deleted."
    },
    {
      icon: Star,
      title: "Token Rewards",
      description: "Earn FORK tokens for orders, reviews, and referrals in our gamified ecosystem."
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Partner Restaurants" },
    { number: "50K+", label: "Deliveries Completed" },
    { number: "99.9%", label: "Uptime" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Food Enthusiast",
      content: "ForkNet's NFT delivery proofs give me complete confidence in my orders. I love earning tokens too!",
      rating: 5
    },
    {
      name: "Marco Rodriguez",
      role: "Restaurant Owner",
      content: "The smart contract escrow system has eliminated payment disputes. Game-changing technology!",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Delivery Driver",
      content: "Transparent reputation system and instant payments make this the best platform I've used.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="sm" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="/web3" className="text-foreground/80 hover:text-foreground transition-colors">
                Web3 Features
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-9 w-9"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="#features" className="block px-3 py-2 text-foreground/80 hover:text-foreground">
                  Features
                </Link>
                <Link href="#how-it-works" className="block px-3 py-2 text-foreground/80 hover:text-foreground">
                  How it Works
                </Link>
                <Link href="#testimonials" className="block px-3 py-2 text-foreground/80 hover:text-foreground">
                  Testimonials
                </Link>
                <Link href="/web3" className="block px-3 py-2 text-foreground/80 hover:text-foreground">
                  Web3 Features
                </Link>
                <div className="pt-4 space-y-2">
                  <Link href="/auth/login" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a855f7' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-indigo-50/30 to-blue-50/50 dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-blue-950/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Hedera Hashgraph
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="text-foreground">Food Delivery</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience Web3-powered food delivery with NFT delivery proofs, smart contract escrow, 
              and blockchain-verified reputation systems. Built on Hedera Hashgraph for speed, 
              security, and sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/customer/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                  Start Ordering
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/web3">
                <Button variant="outline" size="lg" className="border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30 px-8 py-4 text-lg">
                  Explore Web3 Features
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Revolutionary Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how blockchain technology transforms the food delivery experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                How ForkNet Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to experience the future of food delivery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Smartphone,
                title: "Order & Pay",
                description: "Browse restaurants, place your order, and pay with crypto or traditional methods. Smart contracts secure your payment."
              },
              {
                step: "02",
                icon: ChefHat,
                title: "Restaurant Prepares",
                description: "Restaurant receives your order and begins preparation. Real-time updates keep you informed throughout the process."
              },
              {
                step: "03",
                icon: Truck,
                title: "Delivery & NFT Proof",
                description: "Driver delivers your order and generates an NFT proof of delivery. Payment is automatically released upon confirmation."
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied customers experiencing the future of food delivery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join the Web3 food delivery revolution today and earn rewards while enjoying your favorite meals.
          </p>
          
          <div className="flex justify-center items-center">
            <Link href="/customer/dashboard">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                Start Ordering Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <Logo size="md" className="mb-4" />
              <p className="text-muted-foreground mb-4">
                The future of food delivery, powered by Web3 technology and built on Hedera Hashgraph.
              </p>
              
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/customer/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Customer App</Link></li>
                <li><Link href="/restaurant/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Restaurant Portal</Link></li>
                <li><Link href="/driver/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Driver App</Link></li>
                <li><Link href="/web3" className="text-muted-foreground hover:text-foreground transition-colors">Web3 Features</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Web3</h3>
              <ul className="space-y-2">
                <li><Link href="/web3/nft-proofs" className="text-muted-foreground hover:text-foreground transition-colors">NFT Proofs</Link></li>
                <li><Link href="/web3/smart-contracts" className="text-muted-foreground hover:text-foreground transition-colors">Smart Contracts</Link></li>
                <li><Link href="/web3/reputation" className="text-muted-foreground hover:text-foreground transition-colors">Reputation System</Link></li>
                <li><Link href="/web3/hedera" className="text-muted-foreground hover:text-foreground transition-colors">Hedera Integration</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © 2024 ForkNet. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Link href="/restaurant/dashboard">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                    Restaurant Portal
                  </Button>
                </Link>
                <Link href="/driver/dashboard">
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                    Drive & Earn
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
