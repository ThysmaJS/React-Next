import { Link, Outlet, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Task } from '../services/taskService'
import { fetchTasks, createTask, deleteTask as deleteTaskApi, fetchTask } from '../services/taskService'
import { useAuth } from '../context/AuthContext'
import { useErrorHandler } from '../hooks/useErrorHandler'

export function TasksLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <section>
      <div>
        <h2>Tâches</h2>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
      <Outlet />
    </section>
  )
}

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth()
  const { handleAsyncError, showSuccess } = useErrorHandler()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    
    const loadTasks = async () => {
      const fetchedTasks = await handleAsyncError(
        () => fetchTasks(token),
        'Erreur lors du chargement des tâches'
      )
      if (fetchedTasks) {
        setTasks(fetchedTasks)
      }
    }
    
    loadTasks()
  }, [token, navigate]) // Suppression de handleAsyncError des dépendances

  const addTask = async () => {
    if (newTaskTitle.trim() && token) {
      const newTask = await handleAsyncError(
        () => createTask({ title: newTaskTitle.trim() }, token),
        'Erreur lors de la création de la tâche'
      )
      if (newTask) {
        setTasks([...tasks, newTask])
        setNewTaskTitle('')
        showSuccess('Tâche créée avec succès!')
      }
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!token) return
    
    const success = await handleAsyncError(
      () => deleteTaskApi(taskId, token),
      'Erreur lors de la suppression de la tâche'
    )
    
    if (success !== null) {
      setTasks(tasks.filter(t => String(t.id) !== String(taskId)))
      showSuccess('Tâche supprimée avec succès!')
    }
  }

  return (
    <div>
      <div>
        <input 
          placeholder="Nouvelle tâche" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <Link to={t.id}>{t.title}</Link>
            <button onClick={() => deleteTask(t.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const { token } = useAuth()
  const { handleAsyncError } = useErrorHandler()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    
    const loadTask = async () => {
      if (!id || !token) return
      
      const fetchedTask = await handleAsyncError(
        () => fetchTask(id, token),
        'Erreur lors du chargement de la tâche'
      )
      if (fetchedTask) {
        setTask(fetchedTask)
      }
    }
    
    loadTask()
  }, [id, token, navigate]) // Suppression de handleAsyncError des dépendances

  if (!task) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <h3>{task.title}</h3>
      <p>Statut: {task.completed ? 'Terminée' : 'En cours'}</p>
      <button onClick={() => navigate('..')}>Retour</button>
    </div>
  )
}
