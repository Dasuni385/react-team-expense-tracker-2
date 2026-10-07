import React from 'react'
import { Filter, Search } from 'lucide-react'

const CATEGORIES = ['All', 'Food', 'Travel', 'Supplies', 'Other']

export default function ExpenseFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Category Pills / Dropdown */}
      <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
