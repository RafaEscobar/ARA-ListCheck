import moment from "moment";
import myStore from "../../storage/store"

export const completeTimeTasks = () => {
    let tasksTimes = myStore.getAllTimeTasks();
    if ( tasksTimes.length == 0 ) return;
    let timeNow = moment().format("hh:mm a");

    tasksTimes.forEach( task => {
        if ( task.time == timeNow ) {
            alert("Se acabo el tiempo de la tarea");
            myStore.setNullTImeTask(task.id);
        } else {
            console.log("NO hay tareas con tiempo exedido...");
        }
    });
}