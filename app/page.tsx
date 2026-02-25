"use client"

import { useState, useMemo } from "react"
import { rentalItems, type RentalItem } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ItemCard } from "@/components/item-card"
import { CategoryFilter } from "@/components/category-filter"
import { ItemQuickView } from "@/components/item-quick-view"
import { HelpPanel } from "@/components/help-panel"
import { SupportChat } from "@/components/support-chat"
import { TrendingUp, Users, Shield } from "lucide-react"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return rentalItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleItemClick = (item: RentalItem) => {
    setSelectedItem(item)
    setQuickViewOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar
        onHelpOpen={() => setHelpOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Rent Anything on Campus
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                The trusted marketplace for college students to rent and share electronics, books, equipment, and more. Save money, reduce waste.
              </p>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold text-foreground">2,400+</span>
                <span className="text-xs text-muted-foreground">Items Listed</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold text-foreground">8,500+</span>
                <span className="text-xs text-muted-foreground">Students</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold text-foreground">50+</span>
                <span className="text-xs text-muted-foreground">Colleges</span>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Browse Items
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} onClick={handleItemClick} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  No items found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different category or search term.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer onHelpOpen={() => setHelpOpen(true)} />

      {/* Item Quick View Side Panel */}
      <ItemQuickView
        item={selectedItem}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />

      {/* Help & Support Panel */}
      <HelpPanel
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onChatOpen={() => setChatOpen(true)}
      />

      {/* Support Chat Bot */}
      <SupportChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
