// Imports
import { setTodayDate, renderTasks, completeTimeTasks } from './useCases/';
import myStore from '../storage/store';
import moment from 'moment';

//* Collection of html elements id's 
export const idCollection = {
    dateElement: '#dateToday',
    inputTask: '#inputTask',
    contentId: '#content',
    contentTaskId: '#contentTask',
    addBtn: '#addBtn',
    deleteBtn: '#deleteBtn',
    btnClock: '#btnClock',
    btnSaveTime: '#btnSaveTime',
    inputTimePiker: '#inputTimePiker',
    btnTimeError: '#btnTimeError',
    textTimeError: '#textTimeError',
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
    let btnClock = document.querySelector(idCollection.btnClock);
    let btnSaveTime = document.querySelector(idCollection.btnSaveTime);
    let inputTimePiker = document.querySelector(idCollection.inputTimePiker);
    let btnTimeError = document.querySelector(idCollection.btnTimeError);
    let textTimeError = document.querySelector(idCollection.textTimeError);

    //!Assigments
    inputDescriptionTask.value = null;
    btnClock.setAttribute('disabled', 'true');
    btnSaveTime.setAttribute('disabled', 'true');
    inputTimePiker.value = null;

    //! Variables
    let elementTask;
    let collectionTimes;

    //! Functions
    /**
     * Function to execute the create Task flow
     * 
     * @param {string} time -Time of the task
     * 
     * @return void
     */
    const flowToCreateTask = (time = null) => {
        myStore.createTask(inputDescriptionTask.value, time);
        renderTasks(idCollection.contentTaskId, myStore.getAllTask());
        inputDescriptionTask.value = null;
        btnClock.setAttribute('disabled', 'true');
    }

    btnClock.addEventListener('click', () => {
        btnSaveTime.setAttribute('disabled', true);
        inputTimePiker.value = '';
    });

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

    //* Entry event for the modal timePicker
    inputTimePiker.addEventListener('input', () => {
        if ( inputTimePiker.value == '' ) return;
        let messageError = 'La hora proporcionada ya paso... brinda una hora válida.';
        collectionTimes = {
            'task' : {
                'hours': moment(`${inputTimePiker.value}`, "hh:mm:ss").hour(),
                'minutes': moment(`${inputTimePiker.value}`, "hh:mm:ss").minutes(),
            },
            'now' : {
                'hours': moment().hour(),
                'minutes': moment().minutes(),
            },
        };

        if (collectionTimes.now.hours > collectionTimes.task.hours) {
            textTimeError.innerText = messageError;
            btnTimeError.click();
            return;
        } 
        if (collectionTimes.now.hours == collectionTimes.task.hours) {
            if (collectionTimes.now.minutes >= collectionTimes.task.minutes) {
                textTimeError.innerText = messageError;
                btnTimeError.click();
                return;
            }
        }
        btnSaveTime.removeAttribute('disabled');
    });

    //* Click event for the modal button, with which we save the time of the task
    btnSaveTime.addEventListener('click', () => {
        if ( inputTimePiker.value == '' || inputDescriptionTask.value == null ) return;
        flowToCreateTask(moment(`${inputTimePiker.value}`, "hh:mm").format('hh:mm a'));
        inputTimePiker.value = null;
    });

    setInterval(() => {
        completeTimeTasks();
    }, 6000);

};