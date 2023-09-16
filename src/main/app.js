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
};

/**
 * Main function
 * 
 * @return void
 */
export const app = () => {

    //* Self invoked function
    (()=>{
        setTodayDate(idCollection.dateElement);
        
    })();

    //! References to elements
    let inputDescriptionTask = document.querySelector(idCollection.inputTask);
    let addBtn = document.querySelector(idCollection.addBtn);

    //! Functions

    //! Event Listener
    //* Keydown event for inputTask - Create a new task in state.tasks
    inputTask.addEventListener('keydown', (event) => {
        if ( event.keyCode != 13 ) return;
        if ( inputDescriptionTask.value.trim().length == 0 ) return;
        
        myStore.createTask(inputDescriptionTask.value);
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
        inputDescriptionTask.value = null;
    });

    //* Click event for addBtn - Create a new task in state.tasks
    addBtn.addEventListener('click', (event) => {
        if ( inputTask.value.trim().length == 0 ) return;

        myStore.createTask(inputDescriptionTask.value);
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
        inputDescriptionTask.value = null;
    })

};