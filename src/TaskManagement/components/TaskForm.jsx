import { useForm } from '../../hooks/useForm'
import '../styles/TaskForm.css'

export const TaskForm = ({ addTask }) => {

  // A custom hook is used to store the values entered in the form of a new task.
  const { formState, onInputChange } = useForm({ task: '', description: '' })

  // Add new task
  const handleSubmit = (event) => {
    event.preventDefault() // Prevents page reloading

    // If no task has been written
    if (formState.task === '') return

    addTask(formState.task.trim(), formState.description)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='d-flex'>
        <div className='d-flex flex-column mb-3 flex-grow-1'>
          <div className="p-1 form-floating">
            <input
              type="text"
              className="form-control"
              name='task'
              value={formState.task}
              onChange={onInputChange}
              id='taskTitle'
              placeholder="Ingresar una tarea" />

            <label htmlFor="taskTitle">Título</label>
          </div>

          <div className="form-floating p-1">
            <textarea
              className="form-control"
              placeholder="Descripción de la tarea"
              id="floatingTextarea"
              name='description'
              value={formState.description}
              onChange={onInputChange}
            ></textarea>

            <label htmlFor="floatingTextarea">Descripción</label>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className='p-2'>
            <button type="submit" className="btn add-button">Agregar Tarea</button>
          </div>
        </div>
      </div>
    </form>
  )
}
