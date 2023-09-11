// Global variables
let content;

/**
 * Function to generate html task structure for each task
 * 
 * @param {elemetArray} task - Each element of the tasks array
 * 
 * @return contentTask - The html structure of the constructed task
 */
const generateContentTask = (task) => {
    const contentTask = document.createElement('div');
    contentTask.innerHTML = `
        <div class="checkbox-wrapper-15 my-4">
            <input class="inp-cbx" id="${task.id}" type="checkbox" style="display: none;" />
            <label class="cbx" for="${task.id}">
              <span class="inline-block">
                <svg width="23px" height="23px" viewbox="0 0 12 9">
                  <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
              </span>
              <span class="font-mono text-2xl">${task.description}</span>
            </label>
        </div>`
    contentTask.setAttribute('data-id', task.id);

    return contentTask;
}

/**
 * Generating function of the tasks rendering 
 * 
 * @param {htmlId} contentTaskId - Identifier of the html container of the tasks
 * @param {array} tasks - Task array
 * 
 * @return void
 */
export const renderTasks = (contentTaskId, tasks = []) => {
    if (!contentTaskId)
        throw new Error('No hay un Id para el contenedor de las tareas');
    if (tasks.length == 0) 
        throw new Error('No hay tareas que mostrar...');
    
    content = document.querySelector(contentTaskId);
    content.innerHTML = '';
    
    tasks.forEach( task => {
        content.append( generateContentTask(task) );
    });
}