// Imports
import myStore from '../../storage/store';

/**
 * Function to set today date in the corresponding html element
 * @param id {elementId} - Id from html date element
 * @return void
 */
export const setTodayDate = (elementId) => {
    const elementDate = document.querySelector(elementId);
    elementDate.innerText = myStore.todayDate.toLocaleDateString();
};