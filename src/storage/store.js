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
    tasks: [],
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
 * @return void
 */
const setTaskState = (description, time = null) => {
    state.tasks.push( new Task(description, time) );
}

//* Default exports (Functions and variables)
export default {
    todayDate,
    initStore,
    getState,
    setTaskState,
};
