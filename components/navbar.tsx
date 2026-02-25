"use client"

import { useState } from "react"
import {
  Search,
  HelpCircle,
  Menu,
  X,
  User,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavbarProps {
  onHelpOpen: () => void
  onPaymentOpen: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Navbar({ onHelpOpen, onPaymentOpen, searchQuery, onSearchChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/fluxera-logo.jpg"
            alt="Fluxera logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Fluxera
          </span>
        </a>

        {/* Search - Desktop */}
        <div className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search items, categories..."
              className="w-full pl-9 bg-muted/50 border-border"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" onClick={onPaymentOpen} className="text-muted-foreground hover:text-foreground">
            <Wallet className="mr-1.5 h-4 w-4" />
            Wallet
          </Button>
          <Button variant="ghost" size="sm" onClick={onHelpOpen} className="text-muted-foreground hover:text-foreground">
            <HelpCircle className="mr-1.5 h-4 w-4" />
            Help
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <User className="mr-1.5 h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            List an Item
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search items..."
              className="w-full pl-9 bg-muted/50"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <Button variant="ghost" size="sm" className="justify-start text-muted-foreground" onClick={onPaymentOpen}>
              <Wallet className="mr-2 h-4 w-4" />
              Wallet & Payments
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-muted-foreground" onClick={onHelpOpen}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button size="sm" className="mt-1 bg-primary text-primary-foreground">
              List an Item
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
