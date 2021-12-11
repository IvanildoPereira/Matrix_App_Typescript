import { v4 as uuid } from 'uuid';

export class Task{
    id: string;
    weekId: number;
    priorityId: number;
    categoryId: number;
    title: string;
    description: string;
    due: Date | null;
    isCompleted: boolean;
    isArchived: boolean

    constructor(weekId: number, priorityId: number, categoryId: number, title: string, description: string, due: Date | null){
        this.id = uuid();
        this.weekId = weekId;
        this.categoryId = categoryId;
        this.priorityId = priorityId;
        this.title = title;
        this.description = description;
        this.due = due;
        this.isCompleted = false;
        this.isArchived = false;
    }
}