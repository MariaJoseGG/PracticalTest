import { useReducer } from 'react'
import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'

// Action types
const ADD_TASK = '[TASKS] Add task'
const COMPLETE_TASK = '[TASKS] Complete task'
const DELETE_TASK = '[TASKS] Delete task'

// Reducer actions
const taskReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_TASK:
      // The current task list, plus the new task that has been dispatched
      return [...state, action.payload]

    case COMPLETE_TASK:
      // The status of the task is changed to completed
      return state.map(task => {
        if (task.id === action.payload) {
          return {
            ...task,
            completed: !task.completed
          }
        } else {
          return task
        }
      })

    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload)

    default:
      return state
  }
}

export const TaskList = () => {

  const [taskState, dispatch] = useReducer(taskReducer, [])

  // Add new task
  const addTask = (task) => {
    const newTask = {
      id: new Date().getTime(),
      task: task,
      completed: false
    }

    const action = {
      type: ADD_TASK,
      payload: newTask
    }

    dispatch(action)
  }

  // Marking or unmarking a task as completed
  const checkTask = ({ id }) => {
    // Only the task id is needed to change the task status
    const action = {
      type: COMPLETE_TASK,
      payload: id
    }

    dispatch(action)
  }

  // Delete task
  const deleteTask = ({ id }) => {
    const action = {
      type: DELETE_TASK,
      payload: id
    }

    dispatch(action)
  }

  return (
    <>
      <h1 className='text-center'>Lista de Tareas</h1>

      <TaskForm
        addTask={addTask}
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
                  onChange={() => checkTask(item)}
                />

                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(item)}>
                  Borrar
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
