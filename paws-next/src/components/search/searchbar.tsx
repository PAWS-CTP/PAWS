"use client"

import React, { useEffect, useRef, useState } from "react"
import { CITIES } from "@/lib/cities"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

type SearchBarProps = {
  onSearch?: (params: { city?: string }) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!input) {
      setSuggestions([])
      setOpen(false)
      return
    }

    const timeout = setTimeout(() => {
      const q = input.toLowerCase()
      const matches = CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 6)
      setSuggestions(matches)
      setOpen(matches.length > 0)
    }, 150)

    return () => clearTimeout(timeout)
  }, [input])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapperRef.current) return
      if (!(e.target instanceof Node)) return
      if (!wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("click", onDoc)
    return () => document.removeEventListener("click", onDoc)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const city = input.trim() || undefined
    onSearch?.({ city })
    setOpen(false)
  }

  const handleSelect = (city: string) => {
    setInput(city)
    setSuggestions([])
    setOpen(false)
    onSearch?.({ city })
  }

  return (
    <form onSubmit={handleSubmit} className="relative" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <div className={cn("flex items-center rounded-md border bg-white px-2 py-1 shadow-sm", "md:w-72")}> 
          <Search className="mr-2 text-gray-400" size={16} />
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search by city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setOpen(suggestions.length > 0)}
            aria-label="Search by city"
          />
        </div>

        <button type="submit" className="hidden md:inline-flex items-center px-3 py-1 rounded-md bg-teal-600 text-white text-sm hover:bg-teal-700">Search</button>
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full max-w-xs bg-white border rounded-md shadow z-40 overflow-hidden">
          {suggestions.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default SearchBar
