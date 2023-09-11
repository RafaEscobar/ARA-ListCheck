// Imports
import { v4 as identifier } from 'uuid';

//! Model class for Tasks
export class Task {
    /**
     * Constructor class
     * 
     * @param {string} description - Task description
     * @param {string|null} time - Task deadline
     */
    constructor(description, time = null){
        this.id = identifier();
        this.description = description;
        this.done = false;
        this.time = time;
        this.createAt = new Date()
    }
}