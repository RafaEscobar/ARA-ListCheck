import generateTask from '../htmlRenders/task.html?raw';

const generateContentTask = (task) => {
    const contentTask = document.createElement('div');
    contentTask.innerHTML = generateTask;
    contentTask.setAttribute('data-id', task.id);
    return contentTask;
}

export const renderTasks = (contentTaskId, tasks = []) => {
    
    if (!contentTaskId)
        throw new Error('No hay un Id para el contenedor de las tareas');
    if (tasks.length == 0) 
        throw new Error('No hay tareas que mostrar...');
    
    let content = document.querySelector(contentTaskId);

    tasks.forEach( task => {
        content.append( generateContentTask(task.id) );
    });

}

