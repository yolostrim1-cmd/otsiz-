<<<<<<< HEAD
const roles = [
  { id: 'ofitsiant', label: 'Ofitsiant' },
  { id: 'kasser', label: 'Kasser' },
  { id: 'oshpaz', label: 'Oshpaz' },
]

function Admin({
  managedRole,
  setManagedRole,
  orderCount,
  setOrderCount,
  averageSale,
  setAverageSale,
  expensePerOrder,
  setExpensePerOrder,
  paymentMethod,
  income,
  expense,
  netBalance,
}) {
  const selectedRole = roles.find((role) => role.id === managedRole)?.label || 'Hech qanday rol tanlanmagan'
  const selectedPayment = paymentMethod === 'naqd' ? 'Naqd' : paymentMethod === 'plastik' ? 'Plastik' : paymentMethod === 'qr' ? 'QR' : 'Terminal'
=======
import { useMemo, useState } from 'react'
import './admin.css'
import Kasser from '../Kasser/Kasser.jsx'
import Afitsant from '../afitsant/Afitsant.jsx'
import Oshpaz from '../oshpaz/Oshpaz.jsx'

const roles = [
  { key: 'admin', label: 'Admin' },
  { key: 'kassir', label: 'Kassir' },
  { key: 'afitsant', label: 'Ofitsiant' },
  { key: 'oshpaz', label: 'Oshpaz' },
]

const initialOrders = [
  { id: 101, table: '1', customer: 'Aziz', total: 425000, status: 'Yangi', items: ['Shashlik', 'Salat'], time: '11:30' },
  { id: 102, table: '3', customer: 'Nodir', total: 780000, status: 'Tayyor', items: ['Osh', 'Choy'], time: '12:05' },
  { id: 103, table: '5', customer: 'Gulbahor', total: 250000, status: 'Yetkazilgan', items: ['Burger', 'Gazak'], time: '12:24' },
  { id: 104, table: '2', customer: 'Shahlo', total: 550000, status: 'Yangi', items: ['Somsa', 'Kokteyl'], time: '12:40' },
]

const initialMenu = [
  { id: 'm1', name: 'Osh', category: 'Asosiy taom', price: 185000, available: true },
  { id: 'm2', name: 'Manti', category: 'Asosiy taom', price: 160000, available: true },
  { id: 'm3', name: 'Salat', category: 'Salat', price: 100000, available: true },
  { id: 'm4', name: 'Choy', category: 'Ichimlik', price: 40000, available: true },
  { id: 'm5', name: 'Somsa', category: 'Gazak', price: 80000, available: false },
]

const initialStaff = [
  { id: 's1', name: 'Ali', role: 'Oshpaz', phone: '+998 90 123 45 67', shift: '09:00-17:00' },
  { id: 's2', name: 'Mirim', role: 'Ofitsiant', phone: '+998 91 234 56 78', shift: '10:00-18:00' },
  { id: 's3', name: 'Madina', role: 'Kassir', phone: '+998 93 345 67 89', shift: '11:00-19:00' },
]

const statusClasses = {
  Yangi: 'status-new',
  Tayyor: 'status-prepared',
  Yetkazilgan: 'status-delivered',
}

const defaultCurrency = "so'm"

function DashboardView({ orders, menuCount, roleMetrics, currencyLabel }) {
  const todaySales = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const activeOrders = orders.filter((order) => order.status !== 'Yetkazilgan').length

  return (
    <>
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h3>Bugungi daromad</h3>
          <p className="dashboard-value">{todaySales.toLocaleString('uz-UZ')} {currencyLabel}</p>
          <span>Hammasi bo‘lib {orders.length} buyurtma</span>
        </article>
        <article className="dashboard-card">
          <h3>Faol buyurtmalar</h3>
          <p className="dashboard-value">{activeOrders}</p>
          <span>Yangi va tayyor jarayonda</span>
        </article>
        <article className="dashboard-card">
          <h3>Menyu elementlari</h3>
          <p className="dashboard-value">{menuCount}</p>
          <span>Oshxona menyusida</span>
        </article>
        <article className="dashboard-card">
          <h3>Xodimlar</h3>
          <p className="dashboard-value">{roleMetrics.Kassir ? 3 : 3}</p>
          <span>Joriy smenada</span>
        </article>
      </div>

      <div className="role-summary-grid">
        {Object.entries(roleMetrics).map(([key, metric]) => (
          <article className="dashboard-card" key={key}>
            <h3>{metric.title}</h3>
            <p className="dashboard-value">{metric.value.toLocaleString('uz-UZ')}</p>
            <span>{metric.description}</span>
          </article>
        ))}
      </div>

      <section className="table-card">
        <div className="section-header">
          <h2>So‘nggi buyurtmalar</h2>
          <span>Eng yangi buyurtmalar</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mijoz</th>
              <th>Jadval</th>
              <th>Umumiy</th>
              <th>Status</th>
              <th>Vaqt</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.table}</td>
                <td>{order.total?.toLocaleString('uz-UZ')} {currencyLabel}</td>
                <td><span className={`status-chip ${statusClasses[order.status] || ''}`}>{order.status}</span></td>
                <td>{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

function OrdersView({ orders, onUpdateStatus, currencyLabel }) {
  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Buyurtmalar boshqaruvi</h2>
        <span>Kuzatish va holatni yangilash</span>
      </div>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card-top">
              <div>
                <h3>#{order.id} — {order.customer}</h3>
                <p>Jadval: {order.table} · {order.total?.toLocaleString('uz-UZ')} {currencyLabel}</p>
              </div>
              <span className={`status-chip ${statusClasses[order.status] || ''}`}>{order.status}</span>
            </div>
            <div className="order-items">{order.items?.join(', ') || order.taom}</div>
            <div className="order-actions">
              {order.status === 'Yangi' && (
                <button type="button" onClick={() => onUpdateStatus(order.id, 'Tayyor')}>
                  Tayyor bo‘ldi
                </button>
              )}
              {order.status !== 'Yetkazilgan' && (
                <button type="button" onClick={() => onUpdateStatus(order.id, 'Yetkazilgan')}>
                  Yetkazildi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MenuView({ menuItems, onToggleAvailable, onAddMenuItem, currencyLabel }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem.name && newItem.category && newItem.price) {
      onAddMenuItem({
        id: `m${Date.now()}`,
        name: newItem.name,
        category: newItem.category,
        price: Number(newItem.price),
        available: true
      })
      setNewItem({ name: '', category: '', price: '' })
      setShowAddForm(false)
    }
  }
>>>>>>> 7e7f1b44d9c38e3e5ea50954404a97de159a8fdd

  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Menyu boshqaruvi</h2>
        <button type="button" className="button-green" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Bekor qilish' : '+ Yangi taom qo‘shish'}
        </button>
      </div>
      
      {showAddForm && (
        <form className="add-form" onSubmit={handleSubmit}>
          <label>
            Taom nomi
            <input type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
          </label>
          <label>
            Kategoriya
            <input type="text" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} required />
          </label>
          <label>
            Narx (so'm)
            <input type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required />
          </label>
          <button type="submit" className="button-green">Qo‘shish</button>
        </form>
      )}
      
      <div className="menu-grid">
        {menuItems.map((item) => (
          <article className="menu-card" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>
            <div className="menu-card-bottom">
              <strong>{item.price.toLocaleString('uz-UZ')} {currencyLabel}</strong>
              <button type="button" className={item.available ? 'button-green' : 'button-gray'} onClick={() => onToggleAvailable(item.id)}>
                {item.available ? 'Mavjud' : 'O‘chirilgan'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function StaffView({ staff, onAddStaff }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: '', phone: '', shift: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newStaff.name && newStaff.role && newStaff.phone && newStaff.shift) {
      onAddStaff({
        id: `s${Date.now()}`,
        name: newStaff.name,
        role: newStaff.role,
        phone: newStaff.phone,
        shift: newStaff.shift
      })
      setNewStaff({ name: '', role: '', phone: '', shift: '' })
      setShowAddForm(false)
    }
  }

  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Xodimlar ro‘yxati</h2>
        <button type="button" className="button-green" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Bekor qilish' : '+ Xodim qo‘shish'}
        </button>
      </div>
      
      {showAddForm && (
        <form className="add-form" onSubmit={handleSubmit}>
          <label>
            Ism
            <input type="text" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} required />
          </label>
          <label>
            Lavozim
            <input type="text" value={newStaff.role} onChange={(e) => setNewStaff({...newStaff, role: e.target.value})} required />
          </label>
          <label>
            Telefon
            <input type="text" value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} required />
          </label>
          <label>
            Smena vaqti
            <input type="text" value={newStaff.shift} onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})} required />
          </label>
          <button type="submit" className="button-green">Qo‘shish</button>
        </form>
      )}
      
      <div className="staff-grid">
        {staff.map((member) => (
          <article className="staff-card" key={member.id}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.phone}</p>
            <span>{member.shift}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

function ReportsView({ currencyLabel }) {
  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Hisobotlar</h2>
        <span>Qisqacha savdo va resurs</span>
      </div>
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h3>Oylik savdo</h3>
          <p className="dashboard-value">15 200 000 {currencyLabel}</p>
          <span>O‘tgan oyga nisbatan +18%</span>
        </article>
        <article className="dashboard-card">
          <h3>Yangi mijozlar</h3>
          <p className="dashboard-value">32</p>
          <span>Bugun 8 ta yangi</span>
        </article>
        <article className="dashboard-card">
          <h3>Resurs</h3>
          <p className="dashboard-value">73%</p>
          <span>Oshxona quvvati</span>
        </article>
      </div>
      <div className="report-graph">
        <div className="report-graph-bar">
          <span>Osh payti</span>
          <div className="report-progress"><div style={{ width: '85%' }} /></div>
        </div>
        <div className="report-graph-bar">
          <span>Kecha</span>
          <div className="report-progress"><div style={{ width: '60%' }} /></div>
        </div>
        <div className="report-graph-bar">
          <span>Bugun</span>
          <div className="report-progress"><div style={{ width: '92%' }} /></div>
        </div>
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Sozlamalar</h2>
        <span>Restoran ma’lumotlari</span>
      </div>
      <form className="settings-form">
        <label>
          Restoran nomi
          <input type="text" defaultValue="KAFE RESTARAN" />
        </label>
        <label>
          Ish vaqti
          <input type="text" defaultValue="09:00 - 23:00" />
        </label>
        <label>
          Aloqa raqami
          <input type="text" defaultValue="+998 90 000 00 00" />
        </label>
        <button type="button">Saqlash</button>
      </form>
    </div>
  )
}

export default function AdminPanel() {
  const [activeRole, setActiveRole] = useState('admin')
  const [adminSection, setAdminSection] = useState('Dashboard')
  const [orders, setOrders] = useState(initialOrders)
  const [menuItems, setMenuItems] = useState(initialMenu)
  const [staff, setStaff] = useState(initialStaff)
  const [darkMode, setDarkMode] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('naqd')
  const [orderCount, setOrderCount] = useState(4)
  const [averageSale, setAverageSale] = useState(45000)
  const [expensePerOrder, setExpensePerOrder] = useState(10000)

  const roleMetrics = {
    Admin: {
      title: 'Barcha buyurtmalar',
      value: orders.length,
      description: 'Umumiy buyurtma soni',
    },
    Ofitsiant: {
      title: 'Yangi buyurtmalar',
      value: orders.filter((order) => order.status === 'Yangi').length,
      description: 'Ofitsiant qabul qilishi kerak',
    },
    Oshpaz: {
      title: 'Tayyorlanayotganlar',
      value: orders.filter((order) => order.status === 'Tayyor').length,
      description: 'Oshpaz nazoratida',
    },
    Kassir: {
      title: 'Tugallangan',
      value: orders.filter((order) => order.status === 'Yetkazilgan').length,
      description: 'Kassir to‘lovni yakunlaydi',
    },
  }

  const summary = useMemo(() => ({
    totalSales: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    activeOrders: orders.filter((order) => order.status !== 'Yetkazilgan').length,
    finishedOrders: orders.filter((order) => order.status === 'Yetkazilgan').length,
  }), [orders])

  const handleStatusUpdate = (orderId, status) => {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status } : order))
  }

  const handleToggleAvailable = (itemId) => {
    setMenuItems((prev) => prev.map((item) => item.id === itemId ? { ...item, available: !item.available } : item))
  }

  const handleAddMenuItem = (item) => {
    setMenuItems((prev) => [...prev, item])
  }

  const handleAddStaff = (member) => {
    setStaff((prev) => [...prev, member])
  }

  const acceptOrder = (orderId) => {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: 'Tayyor' } : order))
  }

  const prepareOrder = (orderId) => {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: 'Yetkazilgan' } : order))
  }

  const renderPanel = () => {
    if (activeRole === 'admin') {
      return (
        <div className="admin-layout">
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-icon">K</div>
              <div>
                <strong>KAFE RESTARAN</strong>
                <small>Admin panel</small>
              </div>
            </div>

            <nav>
              {['Dashboard', 'Orders', 'Menu', 'Staff', 'Reports', 'Settings'].map((section) => (
                <button
                  key={section}
                  type="button"
                  className={section === adminSection ? 'active' : ''}
                  onClick={() => setAdminSection(section)}
                >
                  {section}
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <button type="button" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <span>Sozlamalar va hisobot</span>
              <p>Yagona boshqaruv paneli</p>
            </div>
          </aside>

          <main className="admin-main">
            <header className="topbar">
              <div>
                  <h1>{adminSection}</h1>
                  <p>Restoran admin bo‘limi. Tezkor buyurtma va menyu nazorati.</p>
                </div>
                <div className="topbar-summary">
                  <span>Jami: {summary.totalSales.toLocaleString('uz-UZ')} so'm</span>
                  <span>Faol: {summary.activeOrders}</span>
                  <span>Tugallangan: {summary.finishedOrders}</span>
                </div>
              </header>

              <section className="content-panel">
                {adminSection === 'Dashboard' && (
                  <DashboardView
                    orders={orders}
                    menuCount={menuItems.length}
                    roleMetrics={roleMetrics}
                    currencyLabel={defaultCurrency}
                  />
                )}
                {adminSection === 'Orders' && <OrdersView orders={orders} onUpdateStatus={handleStatusUpdate} currencyLabel={defaultCurrency} />}
                {adminSection === 'Menu' && <MenuView menuItems={menuItems} onToggleAvailable={handleToggleAvailable} onAddMenuItem={handleAddMenuItem} currencyLabel={defaultCurrency} />}
                {adminSection === 'Staff' && <StaffView staff={staff} onAddStaff={handleAddStaff} />}
                {adminSection === 'Reports' && <ReportsView currencyLabel={defaultCurrency} />}
                {adminSection === 'Settings' && <SettingsView />}
              </section>
            </main>
          </div>
        )
      }

    if (activeRole === 'kassir') {
      return (
        <Kasser
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          orderCount={orderCount}
          setOrderCount={setOrderCount}
          averageSale={averageSale}
          setAverageSale={setAverageSale}
          expensePerOrder={expensePerOrder}
          setExpensePerOrder={setExpensePerOrder}
        />
      )
    }

    if (activeRole === 'afitsant') {
      return <Afitsant buyurtmalar={orders} setBuyurtmalar={setOrders} />
    }

    if (activeRole === 'oshpaz') {
      return <Oshpaz buyurtmalar={orders} qabulQilish={acceptOrder} tayorQilish={prepareOrder} />
    }

    return null
  }

  return (
    <div className={`admin-shell ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <div>
          <h1>KAFE RESTARAN</h1>
          <p>Admin va barcha rollar birlashtirildi</p>
        </div>
        <div className="role-nav">
          <button type="button" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              className={role.key === activeRole ? 'role-button active' : 'role-button'}
              onClick={() => setActiveRole(role.key)}
            >
              {role.label}
            </button>
          ))}
        </div>
      </header>

      <main className="app-content">{renderPanel()}</main>
    </div>
  )
}
