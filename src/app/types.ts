export type Todo = {
    id: number;
    task: string;
    assignedTo: string;
    dueAt: string;
}

export const mockTodos: Todo[] = [
    {id: 1, task: 'Call back customers', assignedTo: 'David', dueAt: 'Monday'},
    {id: 2, task: 'Prepare presentation with QA2 results for investors', assignedTo: 'Dror', dueAt: 'Sunday'},
    {id: 3, task: 'Read litecoin whitepaper', assignedTo: 'Jonathan', dueAt: 'Wednesday'},
    {id: 4, task: 'Implement OCR with Tessaract.js', assignedTo: 'Jonathan', dueAt: 'Monday'},
]