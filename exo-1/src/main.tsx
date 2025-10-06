import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FilteredList } from './components/hello/Hello.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilteredList />
  </StrictMode>,
)
