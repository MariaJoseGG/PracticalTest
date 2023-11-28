import { useForm } from '../../hooks/useForm'
import '../styles/TaskForm.css'

export const TaskForm = () => {

  const { formState, onInputChange } = useForm({ task: '' })

  // Add new task
  const addTask = (event) => {
    event.preventDefault() // Prevents page reloading

    
  }

  return (
    <form onSubmit={addTask}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name='task'
                value={formState.task}
                onChange={onInputChange}
                placeholder="Ingresa una tarea" />
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">Agregar Tarea</button>
          </div>
        </div>
      </div>
    </form>
  )
}
