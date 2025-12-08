"use client";

import React, { useEffect, useState } from "react";
import { CITIES } from "@/lib/cities";

type SearchBarProps = {
  onSearch?: (params: { city?: string }) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // client-side autocomplete from CITIES
  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(() => {
      const q = input.toLowerCase();
      const matches = CITIES.filter((c) =>
        c.toLowerCase().includes(q)
      ).slice(0, 5);

      setSuggestions(matches);
    }, 150); // small debounce

    return () => clearTimeout(timeout);
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = input.trim() || undefined;
    onSearch?.({ city });
  };

  const handleSelect = (city: string) => {
    setInput(city);
    setSuggestions([]);
    onSearch?.({ city }); // optional: search immediately on click
  };

  return (
    <form onSubmit={handleSubmit} className="paws-search-form">
      <div className="paws-search-wrapper">
        <input
          type="text"
          placeholder="Search by city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="paws-search"
        />

        <button
          type="submit"
          className="paws-search-button"
          aria-label="Search"
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="paws-search-suggestions">
            {suggestions.map((city) => (
              <li
                key={city}
                onClick={() => handleSelect(city)}
                className="paws-search-suggestion-item"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
