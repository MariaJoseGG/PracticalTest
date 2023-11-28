import { useForm } from '../../hooks/useForm'
import '../styles/TaskForm.css'

export const TaskForm = ({ addTask }) => {

  // A custom hook is used to store the values entered in the form of a new task.
  const { formState, onInputChange } = useForm({ task: '' })

  // Add new task
  const handleSubmit = (event) => {
    event.preventDefault() // Prevents page reloading

    // If no task has been written
    if (formState.task === '') return

    addTask(formState.task)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container d-flex">
        <div className="p-2 flex-grow-1">
          <input
            type="text"
            className="form-control"
            name='task'
            value={formState.task}
            onChange={onInputChange}
            placeholder="Ingresa una tarea" />
        </div>
        <div className='p-2'>
          <button type="submit" className="btn add-button">Agregar Tarea</button>
        </div>
      </div>
    </form>
  )
}
