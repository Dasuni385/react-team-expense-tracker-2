import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import ExpenseForm from './components/ExpenseForm'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseList from './components/ExpenseList'
import { removeExpense } from './utils/expenseUtils'

const INITIAL_EXPENSES = [
  {
    id: 1,
    description: 'Team Dinner & Celebrations',
    amount: 145.50,
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    description: 'Office Whiteboard & Markers',
    amount: 38.20,
    category: 'Supplies',
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 3,
    description: 'Client Meeting Taxi Fare',
    amount: 24.00,
    category: 'Travel',
    date: new Date().toISOString(),
  },
]

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('team_expenses_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.error('Failed to parse localStorage expenses:', e)
    }
    return INITIAL_EXPENSES
  })

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Persist to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem('team_expenses_data', JSON.stringify(expenses))
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  }, [expenses])

  const handleAddExpense = (newExpense) => {
    const item = {
      id: Date.now(),
      ...newExpense,
      date: new Date().toISOString(),
    }
    setExpenses((prev) => [item, ...prev])
  }

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => removeExpense(prev, id))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all expenses?')) {
      setExpenses([])
    }
  }

  // Filtered expenses based on Category & Search
  const filteredExpenses = expenses.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background glow decorations */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header />

        {/* Financial Overview Cards */}
        <SummaryCards expenses={expenses} />

        {/* Add Expense Form */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        {/* Filter & Search Toolbar */}
        <ExpenseFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={expenses.length}
          filteredCount={filteredExpenses.length}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
          onClearAll={expenses.length > 0 ? handleClearAll : null}
        />

        {/* Footer info */}
        <footer className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Team Expense Tracker • Built with React & Tailwind CSS</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Local Storage Active</span>
            <span>•</span>
            <span>Client-side Only</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
