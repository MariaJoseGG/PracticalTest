import { useReducer } from 'react'
import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'
import { addTask, completeTask, deleteTask } from '../functions/taskActions'
import { taskReducer } from '../functions/taskReducer'

export const TaskList = () => {

  const [taskState, dispatch] = useReducer(taskReducer, [])

  // Add new task
  const handleAddTask = (task) => {
    const newTask = {
      id: new Date().getTime(),
      task: task,
      completed: false
    }

    dispatch(addTask(newTask))
  }

  // Marking or unmarking a task as completed
  const handleCompleteTask = ({ id }) => {
    dispatch(completeTask(id))
  }

  // Delete task
  const handleDeleteTask = ({ id }) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Lista de Tareas</h1>

      <TaskForm
        addTask={handleAddTask}
      />

      <hr />

      <ul className="list-group">
        {taskState.map(item => {
          return (
            <li className="list-group-item d-flex justify-content-between" key={item.id}>
              <span>{item.task}</span>

              <div>
                <input
                  type="checkbox"
                  value={item.finalizada}
                  onChange={() => handleCompleteTask(item)}
                />

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(item)}>
                  Borrar
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
