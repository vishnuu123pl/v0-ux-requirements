"use client"

import { MapPin, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { RentalItem } from "@/lib/data"

interface ItemCardProps {
  item: RentalItem
  onClick: (item: RentalItem) => void
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const conditionColor =
    item.condition === "New"
      ? "bg-primary/10 text-primary border-primary/20"
      : item.condition === "Like New"
        ? "bg-secondary text-secondary-foreground border-secondary"
        : "bg-muted text-muted-foreground border-border"

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.availability !== "Available" && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <span className="rounded-md bg-card px-3 py-1 text-sm font-medium text-card-foreground">
              {item.availability}
            </span>
          </div>
        )}
        <Badge
          className={`absolute top-2.5 right-2.5 text-[11px] ${conditionColor}`}
          variant="outline"
        >
          {item.condition}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug text-card-foreground line-clamp-2">
            {item.name}
          </h3>
        </div>

        <p className="text-lg font-bold text-primary">
          {"₹"}{item.pricePerDay}
          <span className="text-xs font-normal text-muted-foreground">/day</span>
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2 border-t border-border">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
            {item.seller.avatar}
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {item.seller.name}
          </span>
          {item.seller.verified && (
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>
      </div>
    </button>
  )
}
