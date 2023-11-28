import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../styles/Task.css'

export const Task = ({ id, completed, handleCompleteTask, task, handleDeleteTask, description, date }) => {
  return (
    <li className="d-flex align-content-center mb-1">

      {/* Checkbox */}
      <div className='round p-2'>
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          checked={completed}
          onChange={() => handleCompleteTask(id)}
        />
        <label htmlFor={`checkbox-${id}`}></label>
      </div>

      <div className='p-2 flex-grow-1'>
        {/* Task title */}
        <span
          className={completed ? 'task-completed' : ''}>
          {task}
        </span>

        {/* Task description */}
        <p
          className={completed ? 'task-completed' : ''}
        >
          {description}
        </p>

        {/* Task expiration date */}
        <p
          className={completed ? 'task-completed' : ''}
        >
          {date ? 'Fecha de vencimiento: ' : ''}
          {date}
        </p>
      </div>

      {/* Icon for deleting the task */}
      <div
        className='p-2 justify-content-end'
        onClick={() => handleDeleteTask(id)}
      >
        <AiOutlineCloseCircle className='delete-icon' />
      </div>
    </li>
  )
}
