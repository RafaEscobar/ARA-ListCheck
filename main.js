// Imports
import './style.css';
import { app } from './src/main/app';
import {Dropdown, Ripple, initTE, Modal, Input, Timepicker} from 'tw-elements';

// Call main function
app();


// Call the initTE function for the Filters dropdown button
initTE({ Dropdown, Ripple, Modal, Input, Timepicker });

//* Variables for the TimePiker Input
const picker = document.querySelector("#timepicker-format");
const tpFormat24 = new Timepicker(picker, { format24: true, });