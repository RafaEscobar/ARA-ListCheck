// Imports
import { setTodayDate, renderTasks } from './useCases/';
import myStore from '../storage/store';

//* Collection of html elements id's 
export const idCollection = {
    dateElement: '#dateToday',
    inputTask: '#inputTask',
    contentId: '#content',
    contentTaskId: '#contentTask',
    addBtn: '#addBtn',
    deleteBtn: '#deleteBtn',
    btnClock: '#btnClock',
};

/**
 * Main function
 * 
 * @return void
 */
export const app = () => {

    //* Self invoked function
    (()=>{
        //* Set the date today
        setTodayDate(idCollection.dateElement);
        //* Pass the tasks in the LocalStorage to state
        myStore.initLocalStorage();
        //* Rendering the tasks in the state which in turn come from LocalStorage
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
    })();

    //! References to elements
    let inputDescriptionTask = document.querySelector(idCollection.inputTask);
    inputDescriptionTask.value = null;
    let addBtn = document.querySelector(idCollection.addBtn);
    let contentTask = document.querySelector(idCollection.contentTaskId);
    let elementTask;
    let clockFlag = false;
    let btnClock = document.querySelector(idCollection.btnClock);
    btnClock.setAttribute('disabled', 'true');


    //! Functions
    /**
     * Function to execute the create Task flow
     * 
     * @param void
     * 
     * @return void
     */
    const flowToCreateTask = () => {
        myStore.createTask(inputDescriptionTask.value);
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
        inputDescriptionTask.value = null;
        btnClock.setAttribute('disabled', 'true');
    }


    //! Event Listener
    //* Keydown event for inputTask - Create a new task in state.tasks
    inputTask.addEventListener('keyup', (event) => {
        if ( inputDescriptionTask.value.trim().length == 0 ) return;
        if ( inputDescriptionTask.value.trim().length > 4 ) {
            btnClock.removeAttribute('disabled');
        } else if (inputDescriptionTask.value.trim().length <= 4 ) {
            btnClock.setAttribute('disabled', 'true');
        }
        
        if ( event.keyCode != 13) return;
        flowToCreateTask();
    });

    //* Click event for addBtn - Create a new task in state.tasks
    addBtn.addEventListener('click', (event) => {
        if ( inputTask.value.trim().length == 0 ) return;
        flowToCreateTask();
    });

    //* Click event for div container of the task, with this delete and/or check the task
    contentTask.addEventListener('click', (event) => {  
        if ( event.target.id == 'deleteBtn' ) {
            elementTask = event.target.closest('[data-id]');
            myStore.deleteTask(elementTask.getAttribute('data-id'));
            renderTasks(idCollection.contentTaskId, myStore.getAllTask());
        } else if ( event.target.type == 'checkbox' ) {
            elementTask = event.target.closest('[data-id]');
            myStore.checkTask(elementTask.getAttribute('data-id'));
        } else {
            return;
        }
    });

};