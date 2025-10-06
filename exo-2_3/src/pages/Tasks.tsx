import { Link, Outlet, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Task } from '../services/taskService'
import { fetchTasks, createTask, deleteTask as deleteTaskApi, fetchTask } from '../services/taskService'
import { useAuth } from '../context/AuthContext'

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

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(token)
        setTasks(fetchedTasks)
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
    
    loadTasks()
  }, [token, navigate])

  const addTask = async () => {
    if (newTaskTitle.trim() && token) {
      try {
        const newTask = await createTask({ title: newTaskTitle.trim() }, token)
        setTasks([...tasks, newTask])
        setNewTaskTitle('')
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!token) return
    
    console.log('Suppression de la tâche:', taskId, 'Type:', typeof taskId)
    
    try {
      await deleteTaskApi(taskId, token)
      console.log('API suppression réussie, mise à jour de l\'état local')
      
      // Conversion pour s'assurer que la comparaison fonctionne
      setTasks(tasks.filter(t => String(t.id) !== String(taskId)))
      console.log('État local mis à jour')
    } catch (err) {
      console.error('Erreur:', err)
      
      // Même en cas d'erreur API, on supprime localement pour que l'interface soit à jour
      console.log('Suppression locale malgré l\'erreur API')
      setTasks(tasks.filter(t => String(t.id) !== String(taskId)))
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

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    
    const loadTask = async () => {
      if (!id || !token) return
      
      try {
        const fetchedTask = await fetchTask(id, token)
        setTask(fetchedTask)
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
    
    loadTask()
  }, [id, token, navigate])

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
