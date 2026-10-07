import React from 'react'
import { Trash2, Utensils, Plane, Package, Tag, Calendar } from 'lucide-react'
import { formatCurrency } from '../utils/expenseUtils'

const categoryStyles = {
  Food: {
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: Utensils,
  },
  Travel: {
    bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    icon: Plane,
  },
  Supplies: {
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: Package,
  },
  Other: {
    bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: Tag,
  },
}

export default function ExpenseItem({ expense, onDelete }) {
  const meta = categoryStyles[expense.category] || categoryStyles.Other
  const CategoryIcon = meta.icon
  const formattedDate = expense.date
    ? new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Recent'

  return (
    <div className="group flex items-center justify-between p-4 sm:p-5 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl transition-all duration-200">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Category Icon */}
        <div className={`p-2.5 rounded-xl border flex-shrink-0 ${meta.bg}`}>
          <CategoryIcon className="w-5 h-5" />
        </div>

        {/* Details */}
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
            {expense.description}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium ${meta.bg}`}>
              {expense.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Amount & Delete */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        <span className="text-base sm:text-lg font-bold text-white tracking-tight">
          {formatCurrency(expense.amount)}
        </span>

        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          title="Delete expense"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 active:scale-90 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
