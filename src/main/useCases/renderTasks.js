import generateTask from '../htmlRenders/task.html?raw';
import myStore from '../../storage/store'

export const renderTasks = (contentTaskId) => {
    
    const contentTask = document.createElement('div');

    contentTask.innerHTML = generateTask;

    let tasks = myStore.getState();
    tasks.for

}