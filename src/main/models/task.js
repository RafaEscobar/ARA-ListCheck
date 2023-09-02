
//! Model class for Tasks
export class Task {
    /**
     * Constructor class
     * @param {string} description 
     * @param {string|null} time 
     */
    constructor(description, time = null){
        this.id = 1;
        this.description = description;
        this.done = false;
        this.time = time;
        this.createAt = new Date()
    }
}