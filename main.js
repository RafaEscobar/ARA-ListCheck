// Imports
import './style.css';
import { app } from './src/main/app';
import {Dropdown,Ripple,initTE,} from 'tw-elements';

// Call main function
app();

// Call the initTE function for the Filters dropdown button
initTE({ Dropdown, Ripple });