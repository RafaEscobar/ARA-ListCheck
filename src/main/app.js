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
    let addBtn = document.querySelector(idCollection.addBtn);
    let contentTask = document.querySelector(idCollection.contentTaskId);

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
    });

    contentTask.addEventListener('click', (event) => {
        if ( event.target.id != 'deleteBtn' ) return;
        let elementTask = event.target.closest('[data-id]');
        myStore.deleteTask(elementTask.getAttribute('data-id'));
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
    });

};