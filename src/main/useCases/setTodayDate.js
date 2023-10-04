// Imports
import moment from 'moment'
import 'moment/locale/es';
moment.updateLocale('en', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    weekdays : [
        "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
    ],
});  

/**
 * Function to set today date in the corresponding html element
 * 
 * @param id {elementId} - Id from html date element
 * 
 * @return void
 */
export const setTodayDate = (elementId) => {
    const elementDate = document.querySelector(elementId);
    elementDate.innerText = moment().format('LL');
};