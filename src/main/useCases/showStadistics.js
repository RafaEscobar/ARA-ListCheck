import myStore from '../../storage/store'

export const showStadistics = (completed, pending) => {
    let completedTasks = myStore.getTasks('Completed').length;
    let pendingTasks = myStore.getTasks('Pending').length;

    document.querySelector(completed).innerText =  completedTasks;
    document.querySelector(pending).innerText = pendingTasks;
}