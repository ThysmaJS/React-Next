import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/AppLayout'
import { Home } from './pages/Home.tsx'
import { TasksLayout, TasksList, TaskDetail } from './pages/Tasks.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Login } from './pages/Login.tsx'
import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorDisplay } from './components/ErrorDisplay'

export default function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ErrorBoundary>
          <ErrorDisplay />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="tasks" element={<TasksLayout />}>
                <Route index element={<TasksList />} />
                <Route path=":id" element={<TaskDetail />} />
              </Route>
              <Route path="" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </ErrorProvider>
  )
}