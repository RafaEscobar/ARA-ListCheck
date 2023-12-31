// Imports
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

/**
 * Function to check a task
 * 
 * @param {taskId} taskId -Identifier task
 * 
 * @return void
 */
const checkTask = (taskId) => {
    state.tasks.forEach( task => {
        if ( task.id == taskId ) 
            task.done = !task.done;
    });
    setLocalStorage();
}

/**
 * Function to delete a task
 * 
 * @param {taskId} taskId -Identifier task
 * 
 * @return void
 */
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
const getTasks = (filter = filters.All) => {
    switch (filter) {
        case 'All':
            return state.tasks;
        case 'Pending':
            return state.tasks.filter( task => !task.done );
        case 'Completed':
            return state.tasks.filter( task => task.done );
        default: 
            console.log("ERROR, El filtro dado es erroneo");
        break;
    }
}

/**
 * Function to get all tasks times
 * 
 * @return void
 */
const getAllTimeTasks = () => {
    return state.tasks.filter( task => task.time != null);
}

/**
 * Function to put on null the task time
 * 
 * @param string {taskId} -Task identifier
 * 
 * @return void
 */
const setCompleteForTime = (taskId) => {
    state.tasks.forEach( task => {
        if ( task.id == taskId ) {
            task.time = null;
            task.done = true;
        }
    });
    setLocalStorage();
}

const setAllCompleted = (value) => {
    state.tasks.forEach( task => {
        task.done = value;
        if (task.time != null) task.time = null;
    });
    setLocalStorage();
}

//* Default exports (Functions and variables)
export default {
    initStore,
    getState,
    createTask,
    checkTask,
    deleteTask,
    getTasks,
    initLocalStorage,
    getAllTimeTasks,
    setCompleteForTime,
    setAllCompleted,
};
