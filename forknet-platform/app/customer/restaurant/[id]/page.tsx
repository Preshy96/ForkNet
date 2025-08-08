"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Clock, MapPin, Phone, Heart, Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from "next/link"
import { useParams } from "next/navigation"
import { demoRestaurants } from "@/lib/demo-data"

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState(demoRestaurants.find(r => r.id === restaurantId))
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    if (restaurant) {
      const total = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
        const item = restaurant.menu.find(i => i.id === itemId)
        return sum + (item ? item.price * quantity : 0)
      }, 0)
      setCartTotal(total)
    }
  }, [cart, restaurant])

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const categories = ["All", ...Array.from(new Set(restaurant.menu.map(item => item.category)))]
  const filteredMenu = selectedCategory === "All" 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory)

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/customer/restaurants" className="text-[#4A5568] hover:text-[#1A1D29]">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#1A1D29]">{restaurant.name}</h1>
                <p className="text-[#4A5568] text-sm">{restaurant.cuisine} • {restaurant.deliveryTime}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-[#4A5568]">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1D29]">{restaurant.name}</h2>
                <p className="text-[#4A5568]">{restaurant.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="h-5 w-5 text-[#FFA726] fill-current" />
                  <span className="text-[#1A1D29] font-bold ml-1">{restaurant.rating}</span>
                </div>
                <p className="text-[#4A5568] text-sm">1000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-[#822DFF] mx-auto mb-2" />
              <p className="font-medium text-[#1A1D29]">{restaurant.deliveryTime}</p>
              <p className="text-[#4A5568] text-sm">Delivery time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-[#00D2FF] mx-auto mb-2" />
              <p className="font-medium text-[#1A1D29]">${restaurant.deliveryFee}</p>
              <p className="text-[#4A5568] text-sm">Delivery fee</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 text-[#FF6B35] mx-auto mb-2" />
              <p className="font-medium text-[#1A1D29]">${restaurant.minimumOrder}</p>
              <p className="text-[#4A5568] text-sm">Minimum order</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-[#822DFF] hover:bg-[#6B21A8] text-white whitespace-nowrap"
                      : "border-gray-200 text-[#4A5568] hover:border-[#822DFF] whitespace-nowrap"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredMenu.map((item) => (
                <Card key={item.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-[#1A1D29] text-lg">{item.name}</h3>
                          {item.popular && (
                            <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-[#4A5568] text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-[#1A1D29]">
                            ${item.price.toFixed(2)}
                          </span>
                          {cart[item.id] ? (
                            <div className="flex items-center space-x-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 p-0 border-[#822DFF] text-[#822DFF]"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium text-[#1A1D29] min-w-[20px] text-center">
                                {cart[item.id]}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => addToCart(item.id)}
                                className="h-8 w-8 p-0 bg-[#822DFF] hover:bg-[#6B21A8]"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => addToCart(item.id)}
                              className="bg-[#822DFF] hover:bg-[#6B21A8] text-white"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="w-24 h-24 m-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Your Order ({cartItemCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItemCount === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-[#718096] mx-auto mb-4" />
                    <p className="text-[#4A5568]">Your cart is empty</p>
                    <p className="text-[#718096] text-sm">Add items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cart).map(([itemId, quantity]) => {
                      const item = restaurant.menu.find(i => i.id === itemId)
                      if (!item) return null
                      
                      return (
                        <div key={itemId} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-[#1A1D29] text-sm">{item.name}</p>
                            <p className="text-[#4A5568] text-xs">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(itemId)}
                              className="h-6 w-6 p-0 border-[#822DFF] text-[#822DFF]"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-[#1A1D29] text-sm min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(itemId)}
                              className="h-6 w-6 p-0 bg-[#822DFF] hover:bg-[#6B21A8]"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#4A5568]">Subtotal</span>
                        <span className="text-[#1A1D29]">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#4A5568]">Delivery fee</span>
                        <span className="text-[#1A1D29]">${restaurant.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                        <span className="text-[#1A1D29]">Total</span>
                        <span className="text-[#1A1D29]">${(cartTotal + restaurant.deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Link href="/customer/checkout">
                      <Button 
                        className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white"
                        disabled={cartTotal < restaurant.minimumOrder}
                      >
                        {cartTotal < restaurant.minimumOrder 
                          ? `Min. order $${restaurant.minimumOrder}` 
                          : "Proceed to Checkout"
                        }
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
