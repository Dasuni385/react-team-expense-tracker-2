import React from 'react'
import { Inbox, Trash } from 'lucide-react'
import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ expenses, onDeleteExpense, onClearAll }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-500">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">No expenses found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Add an item using the form above or change your filter category.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Transactions ({expenses.length})
        </span>
        {expenses.length > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash className="w-3.5 h-3.5" />
            Clear list
          </button>
        )}
      </div>

      <div id="expense-list" className="space-y-2.5">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  )
}
