import { useReducer } from 'react'
import '../styles/TaskList.css'
import { TaskForm } from './TaskForm'
import { addTask, completeTask, deleteTask } from '../functions/taskActions'
import { taskReducer } from '../functions/taskReducer'
import { Task } from './Task'

// The tasks stored in the LocalStorage are loaded when the page is reloaded
const getStoredTasks = () => {
  // If there are no tasks in the LocalStorage, a default task is loaded
  return JSON.parse(localStorage.getItem('tasks')) || [{
    id: 1,
    task: 'Tarea inicial',
    completed: false,
    description: 'Tarea de prueba',
    date: new Date()
  }]
}

export const TaskList = () => {

  // The useReducer hook is used to manage the state that tasks can take
  const [taskState, dispatch] = useReducer(taskReducer, getStoredTasks())

  // Add new task
  const handleAddTask = (task, description, date) => {
    const newTask = {
      id: new Date().getTime(), // To guarantee unique id's
      task: task,
      completed: false,
      description,
      date
    }

    dispatch(addTask(newTask))

    // Updating the localStorage after adding a task
    const tasksStored = getStoredTasks()
    localStorage.setItem('tasks', JSON.stringify([...tasksStored, newTask]))
  }

  // Marking or unmarking a task as completed
  const handleCompleteTask = (id) => {
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
  const handleDeleteTask = (id) => {
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
            <Task
              key={item.id}
              id={item.id}
              completed={item.completed}
              handleCompleteTask={handleCompleteTask}
              task={item.task}
              handleDeleteTask={handleDeleteTask}
              description={item.description}
              date={item.date}
            />
          )
        })}
      </ul>
    </div>
  )
}
