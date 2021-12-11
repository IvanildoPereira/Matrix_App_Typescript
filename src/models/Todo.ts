import { v4 as uuid } from 'uuid';

export class Todo{
    id: string;
    taskId: string;
    nameTodo: string;
    isCompleted: boolean;

    constructor(taskId: string, nameTodo: string){
        this.id = uuid();
        this.taskId = taskId;
        this.nameTodo = nameTodo;
        this.isCompleted = false;
    }
}