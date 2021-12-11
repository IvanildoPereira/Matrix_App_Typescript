import { StagedDay, Priority, Task, Category } from '../models/index'

// weeks
export const weeks: StagedDay[] = [
    new StagedDay(1, "monday"),
    new StagedDay(2, "Tuesday"),
    new StagedDay(3, "Wednesday"),
    new StagedDay(4, "thursday"),
    new StagedDay(5, "Friday"),
    new StagedDay(6, "Saturday"),
    new StagedDay(7, "Sunday"),
    new StagedDay(8, "Backlog"),
];

// Priorities
export const priorities: Priority[] = [
    new Priority(1, "Do", "#89CF00"),
    new Priority(2, "Schedule", "#2E87F6"),
    new Priority(3, "Delegate", "#FFA700"),
    new Priority(4, "Delete", "#DE0000")
];

// Categories
export const categories: Category[] = [
    new Category(1, "College", "ant-design:book-outlined"),
    new Category(2, "Other", "carbon:warning-other"),
    new Category(3, "Personal", "icon-park-outline:personal-collection"),
    new Category(4, "Study", "clarity:computer-line"),
    new Category(5, "Work", "bytesize:work"),

]

// Dummy tasks
export const dummyTasks: Task[] = [ 
    new Task(1, 1, 1, "Fazer Lição de Casa", "", null ),
    new Task(1, 2, 2, "Lavar a louça", "", null),
    new Task(2, 4, 3, "Correr", "", null),
    new Task(2, 4, 4, "Palmeiras", "", null),
    new Task(3, 1, 5,  "Correr", "", null)
]