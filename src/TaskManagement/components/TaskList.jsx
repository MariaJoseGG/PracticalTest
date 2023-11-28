import { useReducer } from 'react'
import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'
import { addTask, completeTask, deleteTask } from '../functions/taskActions'
import { taskReducer } from '../functions/taskReducer'
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
    <div className='container w-75'>
      <h1 className='text-center'>Lista de Tareas</h1>

      <TaskForm
        addTask={handleAddTask}
      />

      <hr />

      <ul className="list-group">
        {taskState.map(item => {
          return (
            <li className="d-flex align-content-center mb-1" key={item.id}>

              <div className='round p-2'>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  checked={item.completed}
                  onChange={() => handleCompleteTask(item)}
                />
                <label htmlFor={`checkbox-${item.id}`}></label>
              </div>

              <span
                // className="ml-2 p-2 flex-grow-1"
                className={item.completed ? 'ml-2 p-2 flex-grow-1 task-completed' : 'ml-2 p-2 flex-grow-1'}>
                {item.task}
              </span>

              <div
                className='p-2'
                onClick={() => handleDeleteTask(item)}
              >
                <AiOutlineCloseCircle className='delete-icon' />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
