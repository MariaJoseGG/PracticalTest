import { useReducer } from 'react'
import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'
import { addTask, completeTask, deleteTask } from '../functions/taskActions'
import { taskReducer } from '../functions/taskReducer'
import { AiOutlineCloseCircle } from 'react-icons/ai';

// The tasks stored in the LocalStorage are loaded when the page is reloaded
const getStoredTasks = () => {
  return JSON.parse(localStorage.getItem('tasks')) || [{
    id: 1,
    task: 'Tarea inicial',
    completed: false
  }]
  // If there are no tasks in the LocalStorage, a default task is loaded
}

export const TaskList = () => {

  // The useReducer hook is used to manage the state that tasks can take
  const [taskState, dispatch] = useReducer(taskReducer, getStoredTasks())

  // Add new task
  const handleAddTask = (task) => {
    const newTask = {
      id: new Date().getTime(), // To guarantee unique id's
      task: task,
      completed: false
    }

    dispatch(addTask(newTask))

    // Updating the localStorage after adding a task
    const tasksStored = getStoredTasks()
    localStorage.setItem('tasks', JSON.stringify([...tasksStored, newTask]))
  }

  // Marking or unmarking a task as completed
  const handleCompleteTask = ({ id }) => {
    dispatch(completeTask(id))

    // Updating the localStorage
    const tasksStored = getStoredTasks();
    const tasksUpdated = tasksStored.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
  }

  // Delete task
  const handleDeleteTask = ({ id }) => {
    dispatch(deleteTask(id))

    // Updating the localStorage
    const tasksStored = getStoredTasks();
    const tasksUpdated = tasksStored.filter(task => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
  }

  return (
    <div className='container w-75'>
      <h1 className='text-center'>Lista de Tareas</h1>

      {/* Component where new tasks are added */}
      <TaskForm
        addTask={handleAddTask}
      />

      <hr />

      {/* Task list mapping */}
      <ul className="list-group">
        {taskState.map(item => {
          return (
            <li className="d-flex align-content-center mb-1" key={item.id}>

              {/* Checkbox */}
              <div className='round p-2'>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  checked={item.completed}
                  onChange={() => handleCompleteTask(item)}
                />
                <label htmlFor={`checkbox-${item.id}`}></label>
              </div>

              {/* Título de la tarea */}
              <span
                className={item.completed ? 'ml-2 p-2 flex-grow-1 task-completed' : 'ml-2 p-2 flex-grow-1'}>
                {item.task}
              </span>

              {/* Ícono para borrar la tarea */}
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
