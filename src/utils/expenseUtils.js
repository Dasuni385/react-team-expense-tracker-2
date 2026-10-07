/**
 * Validates whether an expense has valid description and positive amount.
 * @param {{ description: string, amount: number }} expense
 * @returns {boolean}
 */
export function validateExpense(expense) {
  if (!expense || typeof expense !== 'object') return false
  const desc = expense.description ? expense.description.trim() : ''
  const amount = Number(expense.amount)
  return desc.length > 0 && !isNaN(amount) && amount > 0
}

/**
 * Calculates total amount of all expenses.
 * @param {Array<{ amount: number }>} expenses
 * @returns {number}
 */
export function calculateTotal(expenses) {
  if (!Array.isArray(expenses)) return 0
  return expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

/**
 * Formats a numeric amount to USD currency string ($xx.xx).
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Filters expenses by category.
 * @param {Array<{ category: string }>} expenses
 * @param {string} category
 * @returns {Array}
 */
export function filterByCategory(expenses, category) {
  if (!Array.isArray(expenses)) return []
  if (!category || category === 'All') return expenses
  return expenses.filter(item => item.category === category)
}

/**
 * Removes an expense by ID without mutating the original array.
 * @param {Array<{ id: string|number }>} expenses
 * @param {string|number} id
 * @returns {Array}
 */
export function removeExpense(expenses, id) {
  if (!Array.isArray(expenses)) return []
  return expenses.filter(item => item.id !== id)
}
