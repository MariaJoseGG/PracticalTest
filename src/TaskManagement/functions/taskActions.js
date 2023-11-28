import { ADD_TASK, COMPLETE_TASK, DELETE_TASK } from './taskReducer'

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
});

export const completeTask = (taskId) => ({
    type: COMPLETE_TASK,
    payload: taskId
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId
});