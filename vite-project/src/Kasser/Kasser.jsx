/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import './style.css'
 
const menuItems = [
  { key: 'lagmon', name: 'Lagmon', price: 36000 },
  { key: 'osh', name: 'Osh', price: 35000 },
  { key: 'shashlik', name: 'Shashlik', price: 10000 },
  { key: 'manti', name: 'Manti', price: 6000 },
  { key: 'somsa', name: 'Somsa', price: 8000 },
  { key: 'mastava', name: 'Mastava', price: 22000 },
]
 
const PAYMENT_METHODS = [
  { key: 'naqd', label: 'Naqd', icon: '💵' },
  { key: 'karta', label: 'Karta', icon: '💳' },
  { key: 'payme', label: 'Payme', icon: '📱' },
  { key: 'click', label: 'Click', icon: '🔵' },
]
 
const initialTables = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  orders: {},
  paymentMethod: null,
}))
 
function formatPrice(value) {
  return `${value.toLocaleString('ru-RU')} so'm`
}
 
const keyMap = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.', '+': '+', '-': '-', '*': '✕', '/': '÷',
  'Enter': '=', 'Escape': 'C', 'Backspace': 'C',
}
 
function PaymentModal({ table, onClose, onConfirm }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
 
  const total = Object.entries(table.orders).reduce((sum, [key, qty]) => {
    const item = menuItems.find((m) => m.key === key)
    return item ? sum + item.price * qty : sum
  }, 0)
 
  const handleConfirm = () => {
    if (!selectedMethod) return
    setConfirmed(true)
  }
 
  const handleFinish = () => {
    onConfirm(table.id)
  }
 
  if (confirmed) {
    const payMethod = PAYMENT_METHODS.find((m) => m.key === selectedMethod)
    return (
      <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="modal-box">
          <div className="modal-confirmed">
            <div className="modal-check">✓</div>
            <h2>To'lov qabul qilindi!</h2>
            <p>
              Stol {table.id} — <strong>{formatPrice(total)}</strong>
              <br />
              {payMethod?.icon} {payMethod?.label} orqali
            </p>
          </div>
          <button className="modal-confirm-btn" onClick={handleFinish}>
            Yopish va stolni tozalash
          </button>
        </div>
      </div>
    )
  }
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">🧾 Stol {table.id} — Chek</p>
 
        <div className="modal-orders">
          {Object.entries(table.orders).map(([key, qty]) => {
            const item = menuItems.find((m) => m.key === key)
            if (!item) return null
            return (
              <div key={key} className="modal-row">
                <span>{item.name} ✕ {qty}</span>
                <span>{formatPrice(item.price * qty)}</span>
              </div>
            )
          })}
        </div>
 
        <div className="modal-total">
          <span>Jami:</span>
          <strong>{formatPrice(total)}</strong>
        </div>
 
        <p className="modal-pay-label">To'lov turini tanlang:</p>
        <div className="modal-pay-methods">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.key}
              type="button"
              className={`modal-pay-btn ${selectedMethod === method.key ? 'modal-pay-btn--active' : ''}`}
              onClick={() => setSelectedMethod((prev) => prev === method.key ? null : method.key)}
            >
              <span>{method.icon}</span>
              <span>{method.label}</span>
            </button>
          ))}
        </div>
 
        <button
          type="button"
          className="modal-confirm-btn"
          disabled={!selectedMethod}
          onClick={handleConfirm} >✓ To'lash</button>

        <button type="button" className="modal-close-btn" onClick={onClose}>
          Bekor qilish
        </button>
      </div>
    </div>
  )
}
 
function Kasser() {
  const [tables, setTables] = useState(initialTables)
  const [calcValue, setCalcValue] = useState('0')
  const [modalTableId, setModalTableId] = useState(null)
 
  const addItem = (tableId, itemKey) => {
    setTables((prev) =>
      prev.map((table) => {
        if (table.id !== tableId) return table
        const currentQty = table.orders[itemKey] || 0
        return {
          ...table,
          orders: { ...table.orders, [itemKey]: currentQty + 1 },
        }
      }),
    )
  }
 
  const clearTable = (tableId) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId ? { ...table, orders: {}, paymentMethod: null } : table,
      ),
    )
  }
 
  const getTableTotal = (table) =>
    Object.entries(table.orders).reduce((sum, [key, qty]) => {
      const item = menuItems.find((menu) => menu.key === key)
      return item ? sum + item.price * qty : sum
    }, 0)
 
  const totalAll = tables.reduce((sum, table) => sum + getTableTotal(table), 0)
 
  const handleCalc = useCallback(
    (button) => {
      if (button === 'C') { setCalcValue('0'); return }
      if (button === '=') {
        try {
          const expression = calcValue.replace(/✕/g, '*').replace(/÷/g, '/')
          const result = Function(`return ${expression}`)()
          setCalcValue(String(result))
        } catch {
          setCalcValue('hatolik')
        }
        return
      }
      if (calcValue === '0' && button !== '.') { setCalcValue(button); return }
      if (calcValue === 'hatolik') { setCalcValue(button); return }
      setCalcValue((value) => value + button)
    },
    [calcValue],
  )
 
  useEffect(() => {
    const handleKeyDown = (e) => {
      const mapped = keyMap[e.key]
      if (!mapped) return
      e.preventDefault()
      handleCalc(mapped)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleCalc])
 
  const handlePaymentConfirm = (tableId) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, orders: {}, paymentMethod: null } : t,
      ),
    )
    setModalTableId(null)
  }
 
  const modalTable = tables.find((t) => t.id === modalTableId)
 
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="badge">Kassir paneli</p>
        </div>
      </header>
 
      <main>
        <section className="tables-grid">
          {tables.map((table) => {
            const entries = Object.entries(table.orders)
            const total = getTableTotal(table)
            const hasOrders = entries.length > 0
 
            return (
              <article key={table.id} className="table-card">
                <div className="table-top">
                  <h2>Stol {table.id}</h2>
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => clearTable(table.id)}>
                    Tozalash
                  </button>
                </div>
 
                <div className="menu-buttons">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className="menu-button"
                      onClick={() => addItem(table.id, item.key)}>
                      + {item.name}
                    </button>
                  ))}
                </div>
 
                <div className="orders-list">
                  {entries.length === 0 ? (
                    <p className="empty-order">Buyurtma yo'q</p>
                  ) : (
                    entries.map(([key, qty]) => {
                      const item = menuItems.find((menu) => menu.key === key)
                      if (!item) return null
                      return (
                        <div key={key} className="order-row">
                          <span>{item.name} x{qty}</span>
                          <strong>{formatPrice(item.price * qty)}</strong>
                        </div>
                      )
                    })
                  )}
                </div>
 
                <div className="table-total">
                  <span>Jami:</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
 
                {hasOrders && (
                  <button
                    type="button"
                    className="pay-action-button"
                    onClick={() => setModalTableId(table.id)}>
                    💳 To'lovga o'tish
                  </button>
                )}
              </article>
            )
          })}
        </section>
 
        <section className="summary-card">
          <h3>Umumiy summa ({tables.length} stol):</h3>
          <p className="summary-value">{formatPrice(totalAll)}</p>
        </section>
 
        <section className="calculator-card">
          <div className="calculator-header">
            <h2>Kalkulyator</h2>
          </div>
          <div className="calculator">
            <div className="calc-screen" role="status">
              {calcValue}
            </div>
            <div className="calc-grid">
              {['7', '8', '9', '✕', '4', '5', '6', '÷', '1', '2', '3', '-', '0', '.', '=', '+'].map(
                (button) => (
                  <button
                    key={button}
                    type="button"
                    className={`calc-button ${button === '=' ? 'equals' : ''}`}
                    onClick={() => handleCalc(button)}>
                    {button}
                  </button>
                ),
              )}
            </div>
            <button type="button" className="calc-clear" onClick={() => handleCalc('C')}>
              Tozalash (C)
            </button>
          </div>
        </section>
      </main>
 
      {modalTable && (
        <PaymentModal
          table={modalTable}
          onClose={() => setModalTableId(null)}
          onConfirm={handlePaymentConfirm}
        />
      )}
    </div>
  )
}
 
export default Kasser;