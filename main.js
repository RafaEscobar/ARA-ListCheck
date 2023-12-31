//* Imports
import './style.css';
import { app } from './src/main/app';
import {Dropdown, Ripple, initTE, Modal, Input, Timepicker} from 'tw-elements';

//* Call main function
app();

//* Call the initTE function for the Filters dropdown button
initTE({ Dropdown, Ripple, Modal, Input, Timepicker });

//* Variables for the TimePiker Input
const pickerInline2 = document.querySelector("#timepicker-inline-24");
const timepickerMaxMin2 = new Timepicker(pickerInline2, { format24:true, inline: true, });