import moment from "moment";
import myStore from "../../storage/store"
import { renderTasks } from "./renderTasks";

export const completeTimeTasks = () => {
    let tasksTimes = myStore.getAllTimeTasks();
    if ( tasksTimes.length == 0 ) return;

    let btnCompleteTime = document.querySelector("#btnCompleteTime");
    let titleTask = document.querySelector("#titleTask");

    let timeNow = moment().format("hh:mm a");

    tasksTimes.forEach( task => {
        if ( task.time == timeNow ) {
            titleTask.innerText = task.description;
            btnCompleteTime.click();
            myStore.setCompleteForTime(task.id);
            renderTasks("#contentTask", myStore.getTasks());
        }
    });
}