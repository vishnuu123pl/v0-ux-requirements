"use client"

import { cn } from "@/lib/utils"
import { categories } from "@/lib/data"
import {
  Laptop,
  BookOpen,
  Dumbbell,
  Music,
  FlaskConical,
  Camera,
  Armchair,
  LayoutGrid,
} from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  All: <LayoutGrid className="h-4 w-4" />,
  Electronics: <Laptop className="h-4 w-4" />,
  Books: <BookOpen className="h-4 w-4" />,
  Sports: <Dumbbell className="h-4 w-4" />,
  "Musical Instruments": <Music className="h-4 w-4" />,
  "Lab Equipment": <FlaskConical className="h-4 w-4" />,
  Photography: <Camera className="h-4 w-4" />,
  Furniture: <Armchair className="h-4 w-4" />,
}

interface CategoryFilterProps {
  selected: string
  onChange: (category: string) => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-150",
            selected === cat
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {categoryIcons[cat]}
          {cat}
        </button>
      ))}
    </div>
  )
}
