import React from 'react'
import { WalletCards, Users } from 'lucide-react'

export default function Header() {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-lg shadow-indigo-500/20 text-white">
            <WalletCards className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Team Expense Tracker
            </h1>
            <p className="text-sm text-slate-400">
              Track, organize, and manage shared group expenditures
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          <span>Team Workspace</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>
    </header>
  )
}
