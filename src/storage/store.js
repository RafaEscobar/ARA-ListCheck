//! Imports
import { Task } from "../main/models";

//* Object filters
const filters = {
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed',
}

//* Global state, includes: tasks and filter
const state = {
    tasks: [
        new Task("Aprender inglés"),
    ],
    filter: filters.All
}

//* Variable to get todat date
const todayDate = new Date();

/**
 * Initialization function
 * 
 * @return void
 */
const initStore = () => {
    console.log('Store inicializado...');
};

/**
 * Pass Tasks from LocalStorage to State
 * 
 * @return void
 */
const initLocalStorage = () => {
    if ( !localStorage.getItem('state') ) return;
    const { tasks, filter } = JSON.parse(localStorage.getItem('state'));
    state.tasks = tasks;
    state.filter = filter;
}

/**
 * Set LocalStorage based to variable "state"
 * 
 * @return void
 */
const setLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Function to get all state
 * 
 * @return state
 */
const getState = () => {
    return state;
}

/**
 * Function to create a new Task and push in state.tasks
 * 
 * @param {string} description - Task description
 * @param {string|null} time - Time to task
 * 
 * @return void
 */
const createTask = (description, time = null) => {
    state.tasks.push( new Task(description, time) );
    setLocalStorage();
}

const deleteTask = (taskId) => {
    state.tasks = state.tasks.filter( task => task.id != taskId );
    setLocalStorage();
}

/**
 * Function to get task based on current filter
 * 
 * @param {filters} filter - Current filter (State)
 * 
 * @return void
 */
const getAllTask = (filter = filters.All) => {
    return state.tasks;
}

//* Default exports (Functions and variables)
export default {
    todayDate,
    initStore,
    getState,
    createTask,
    deleteTask,
    getAllTask,
    initLocalStorage,
};
