import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'

export const TaskList = () => {
  return (
    <>
      <h1 className='text-center'>Lista de Tareas</h1>

      <hr />

      <TaskForm />
    </>
  )
}
