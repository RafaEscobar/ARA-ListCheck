//!Imports
import { v4 as identifier } from 'uuid';

//! Model class for Tasks
export class Task {
    /**
     * Constructor class
     * @param {string} description 
     * @param {string|null} time 
     */
    constructor(description, time = null){
        this.id = identifier();
        this.description = description;
        this.done = false;
        this.time = time;
        this.createAt = new Date()
    }
}