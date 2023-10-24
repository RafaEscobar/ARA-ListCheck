// Imports
import { setTodayDate, renderTasks, completeTimeTasks, showStadistics } from './useCases/';
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
    allFilter: '#allFilter',
    pendingFilter: '#pendingFilter',
    completedFIlter: '#completedFilter',
    completedTasksLabel: '#completedTasksLabel',
    pendingTasksLabel: '#pendingTasksLabel',
    shitchAll: '#shitchAll',
    btnCompletedAll: '#btnCompletedAll',
    confirmCompletedTask: '#confirmCompletedTask',
    cancelCompletedTask: '#cancelCompletedTask',
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
        renderTasks(idCollection.contentTaskId, myStore.getTasks());
        showStadistics(idCollection.completedTasksLabel, idCollection.pendingTasksLabel);
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
    let filterAll = document.querySelector(idCollection.allFilter);
    let filterPending = document.querySelector(idCollection.pendingFilter);
    let filterCompleted = document.querySelector(idCollection.completedFIlter);
    let switchAll = document.querySelector(idCollection.shitchAll);
    let confirmCompletedTask = document.querySelector(idCollection.confirmCompletedTask);
    let cancelCompletedTask = document.querySelector(idCollection.cancelCompletedTask);

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
        renderTasks(idCollection.contentTaskId, myStore.getTasks());
        inputDescriptionTask.value = null;
        btnClock.setAttribute('disabled', 'true');
        showStadistics(idCollection.completedTasksLabel, idCollection.pendingTasksLabel);
    }

    //! Event Listener

    //* Click event for btnClock - Put btnSaveTime as disabled and inputTimePiker as ''
    btnClock.addEventListener('click', () => {
        btnSaveTime.setAttribute('disabled', true);
        inputTimePiker.value = '';
    });

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
            renderTasks(idCollection.contentTaskId, myStore.getTasks());
        } else if ( event.target.type == 'checkbox' ) {
            elementTask = event.target.closest('[data-id]');
            myStore.checkTask(elementTask.getAttribute('data-id'));
        } else {
            return;
        }
        showStadistics(idCollection.completedTasksLabel, idCollection.pendingTasksLabel);
    });

    //* Input event for the modal inputTimePicker
    inputTimePiker.addEventListener('input', () => {
        if ( inputTimePiker.value == '' ) return;
        let messageError = 'La hora proporcionada ya paso... elije una hora válida.';
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

    //* Click event for filter all tasks
    filterAll.addEventListener('click', () => {
        renderTasks(idCollection.contentTaskId, myStore.getTasks());
    });

    //* Click event for filter pending tasks
    filterPending.addEventListener('click', () => {
        renderTasks(idCollection.contentTaskId, myStore.getTasks('Pending'));
    });

    //* Click event for filter completed tasks
    filterCompleted.addEventListener('click', () => {
        renderTasks(idCollection.contentTaskId, myStore.getTasks('Completed'));
    });

    //* Change event for open modal to checked all task
    switchAll.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.querySelector(idCollection.btnCompletedAll).click();
        } else {
            myStore.setAllCompleted(false);
        }
        renderTasks(idCollection.contentTaskId, myStore.getTasks());
        showStadistics(idCollection.completedTasksLabel, idCollection.pendingTasksLabel);
    });

    //* Click event for checked all tasks 
    confirmCompletedTask.addEventListener('click', () => {
        myStore.setAllCompleted(true);
        renderTasks(idCollection.contentTaskId, myStore.getTasks());
        showStadistics(idCollection.completedTasksLabel, idCollection.pendingTasksLabel);
    });

    //* Click event for cancel checked all tasks
    cancelCompletedTask.addEventListener('click', () => {
        switchAll.checked = false;
    });

    setInterval(() => {
        completeTimeTasks();
    }, 6000);

};