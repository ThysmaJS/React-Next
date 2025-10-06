const API_URL = 'http://localhost:3001'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function apiFetch<T>(path: string, opts: { method?: HttpMethod; body?: unknown; token?: string } = {}): Promise<T> {
  const { method = 'GET', body, token } = opts
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`)
  }
  return (await res.json()) as T
}
export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface NewTask {
  title: string
  completed?: boolean
}

export async function fetchTasks(token: string): Promise<Task[]> {
  return apiFetch<Task[]>('/tasks', { token })
}

export async function fetchTask(id: string, token: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, { token })
}

export async function createTask(task: NewTask, token: string): Promise<Task> {
  return apiFetch<Task>('/tasks', { method: 'POST', body: task, token })
}

export async function updateTask(id: string, updates: Partial<NewTask>, token: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, { method: 'PATCH', body: updates, token })
}

export async function deleteTask(id: string, token: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, { method: 'DELETE', token })
}