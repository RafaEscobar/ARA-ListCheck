//! Imports
import { setTodayDate } from './useCases/';
import myStore from '../storage/store';

//* Collection of html elements id's 
export const idCollection = {
    dateElement: '#dateToday',
    inputTask: '#inputTask',
    contentId: '#content'
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
    let inputTask = document.querySelector(idCollection.inputTask);

    //! Functions

    //! Event Listener
    //* Keydown event for inputTask - Create a new task in state.tasks
    inputTask.addEventListener('keydown', (event) => {
        if ( event.keyCode != 13 ) return;
        if ( inputTask.value.trim().length == 0 ) return;
        
        myStore.setTaskState(inputTask.value);
        console.log(myStore.getState());
    });
};