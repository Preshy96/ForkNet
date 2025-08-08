"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Store, Truck, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

const userTypes = [
  {
    id: "customer",
    title: "Customer",
    description: "Order food from restaurants",
    icon: User,
    color: "#822DFF"
  },
  {
    id: "restaurant",
    title: "Restaurant",
    description: "List your restaurant and manage orders",
    icon: Store,
    color: "#FF6B35"
  },
  {
    id: "driver",
    title: "Driver",
    description: "Deliver food and earn HBAR",
    icon: Truck,
    color: "#00D2FF"
  }
]

export default function RegisterPage() {
  const [userType, setUserType] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleRegister = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Redirect based on user type
      const redirectPaths = {
        customer: '/customer/dashboard',
        restaurant: '/restaurant/dashboard',
        driver: '/driver/dashboard'
      }
      router.push(redirectPaths[userType as keyof typeof redirectPaths])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-[#4A5568] hover:text-[#1A1D29] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#822DFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-[#1A1D29] font-bold text-2xl">ForkNet</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1D29] mb-2">Join ForkNet</h1>
          <p className="text-[#4A5568]">Create your account and start using Web3 food delivery</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1A1D29]">Create Account</CardTitle>
            <CardDescription className="text-[#4A5568]">
              Choose your account type and fill in your details
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-4">
              <Label className="text-[#1A1D29] font-medium">I want to join as a:</Label>
              <RadioGroup value={userType} onValueChange={setUserType}>
                <div className="grid sm:grid-cols-3 gap-4">
                  {userTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <div key={type.id} className="relative">
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.id}
                          className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-[#822DFF] peer-checked:border-[#822DFF] peer-checked:bg-[#822DFF]/5 ${
                            userType === type.id ? 'border-[#822DFF] bg-[#822DFF]/5' : 'border-gray-200'
                          }`}
                        >
                          <Icon className="h-8 w-8 mb-2" style={{ color: type.color }} />
                          <span className="font-medium text-[#1A1D29]">{type.title}</span>
                          <span className="text-sm text-[#4A5568] text-center">{type.description}</span>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>

            {/* Personal Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#1A1D29]">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#1A1D29]">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1A1D29]">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1A1D29]">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
              />
            </div>

            {/* Password Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1A1D29]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#4A5568]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#1A1D29]">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#4A5568]"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Fields Based on User Type */}
            {userType === "restaurant" && (
              <div className="space-y-4 p-4 bg-[#FF6B35]/5 rounded-lg border border-[#FF6B35]/20">
                <h3 className="font-medium text-[#1A1D29]">Restaurant Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName" className="text-[#1A1D29]">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      placeholder="Enter restaurant name"
                      className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine" className="text-[#1A1D29]">Cuisine Type</Label>
                    <Input
                      id="cuisine"
                      placeholder="e.g., Italian, Asian, American"
                      className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#1A1D29]">Restaurant Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter full restaurant address"
                    className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                  />
                </div>
              </div>
            )}

            {userType === "driver" && (
              <div className="space-y-4 p-4 bg-[#00D2FF]/5 rounded-lg border border-[#00D2FF]/20">
                <h3 className="font-medium text-[#1A1D29]">Driver Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType" className="text-[#1A1D29]">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      placeholder="e.g., Car, Motorcycle, Bicycle"
                      className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate" className="text-[#1A1D29]">License Plate</Label>
                    <Input
                      id="licensePlate"
                      placeholder="Enter license plate number"
                      className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense" className="text-[#1A1D29]">Driver's License Number</Label>
                  <Input
                    id="driverLicense"
                    placeholder="Enter driver's license number"
                    className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                  />
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-[#822DFF] data-[state=checked]:border-[#822DFF]"
              />
              <div className="text-sm">
                <Label htmlFor="terms" className="text-[#4A5568] cursor-pointer">
                  I agree to the{" "}
                  <Link href="#" className="text-[#822DFF] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#822DFF] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            {/* Web3 Notice */}
            <div className="p-4 bg-[#00F5A0]/5 rounded-lg border border-[#00F5A0]/20">
              <div className="flex items-start space-x-3">
                <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20 mt-0.5">
                  Web3
                </Badge>
                <div className="text-sm">
                  <p className="text-[#1A1D29] font-medium mb-1">Blockchain Integration</p>
                  <p className="text-[#4A5568]">
                    You can connect your Hedera wallet after registration to access Web3 features like NFT delivery proofs and HBAR payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleRegister}
              disabled={!agreedToTerms || isLoading}
              className="w-full bg-[#822DFF] hover:bg-[#6B21A8] text-white"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="text-[#4A5568] text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#822DFF] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
