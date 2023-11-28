import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { TaskList } from './TaskManagement/components/TaskList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskList />
  </React.StrictMode>,
)
