// Imports
import myStore from '../storage/store';

import { setTodayDate } from './useCases/';

// Collection of html elements id's 
export const idCollection = {
    dateElement: '#dateToday'
};

/**
 * Main function
 * @param void
 * @return void
 */
export const app = () => {

    // Self invoked function
    (()=>{
        setTodayDate(idCollection.dateElement);
    })();


    // References to elements


    // Functions


};