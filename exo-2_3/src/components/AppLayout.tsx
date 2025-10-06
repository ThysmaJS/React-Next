// src/components/AppLayout.tsx
import { Link, NavLink, Outlet } from 'react-router-dom'

export function AppLayout() {
  const active = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? 'underline' : 'none',
  })
  return (
    <div>
      <header>
        <Link to="/">React Cours</Link>
        <nav>
          <NavLink to="/" style={active} end>Accueil</NavLink>
          <NavLink to="/tasks" style={active}>Tâches</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
