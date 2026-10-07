import React, { useState } from 'react'
import { PlusCircle, AlertCircle, FileText, DollarSign, Tag } from 'lucide-react'
import { validateExpense } from '../utils/expenseUtils'

const CATEGORIES = ['Food', 'Travel', 'Supplies', 'Other']

export default function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const numericAmount = parseFloat(amount)
    const expenseData = {
      description: description.trim(),
      amount: numericAmount,
      category,
    }

    if (!validateExpense(expenseData)) {
      setError('Please provide a valid description and a positive amount (> 0).')
      return
    }

    onAddExpense(expenseData)
    setDescription('')
    setAmount('')
    setCategory('Food')
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md mb-8">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-2.5 h-6 bg-indigo-500 rounded-full"></div>
        <h2 className="text-lg sm:text-xl font-bold text-white">Add New Expense</h2>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form id="expense-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="e.g. Team lunch, Train ticket"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-violet-400" />
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 hover:from-indigo-500 to-violet-600 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </form>
    </div>
  )
}
