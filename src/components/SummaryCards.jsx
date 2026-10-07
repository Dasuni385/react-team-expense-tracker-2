import React from 'react'
import { DollarSign, Receipt, TrendingUp, Sparkles } from 'lucide-react'
import { formatCurrency } from '../utils/expenseUtils'

export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)
  const count = expenses.length
  const avg = count > 0 ? total / count : 0
  const maxExpense = count > 0 ? Math.max(...expenses.map(e => Number(e.amount) || 0)) : 0

  const stats = [
    {
      title: 'Total Expenses',
      value: formatCurrency(total),
      subtext: `${count} total recorded entries`,
      icon: DollarSign,
      iconColor: 'text-indigo-400',
      bgGradient: 'from-indigo-500/10 to-indigo-500/5',
      borderColor: 'border-indigo-500/20',
      id: 'expense-total'
    },
    {
      title: 'Average Expense',
      value: formatCurrency(avg),
      subtext: 'Per item average',
      icon: Receipt,
      iconColor: 'text-emerald-400',
      bgGradient: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'Highest Expense',
      value: formatCurrency(maxExpense),
      subtext: count > 0 ? 'Single largest bill' : 'No items yet',
      icon: TrendingUp,
      iconColor: 'text-amber-400',
      bgGradient: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-b ${stat.bgGradient} bg-slate-900/60 border ${stat.borderColor} backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div className={`p-2 rounded-xl bg-slate-800/80 ${stat.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div id={stat.id || undefined} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400/80" />
              {stat.subtext}
            </p>
          </div>
        )
      })}
    </div>
  )
}
