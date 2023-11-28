// Action types
export const ADD_TASK = '[TASKS] Add task'
export const COMPLETE_TASK = '[TASKS] Complete task'
export const DELETE_TASK = '[TASKS] Delete task'

// Reducer actions
export const taskReducer = (state = [], action = {}) => {
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
      // An array with all tasks is returned, except the one that was deleted
      return state.filter(task => task.id !== action.payload)

    default:
      return state
  }
}