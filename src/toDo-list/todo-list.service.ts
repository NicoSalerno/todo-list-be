import { QueryToDosDTO } from "./todo-list.DTO"
import { ToDo } from "./todo-list.entity";
import { ToDoModel } from "./todo-list.model";

export async function getList(validationState?: string): Promise<ToDo[]> {
    if (validationState === 'true') {
        return await ToDoModel.find(); // Mostra solo i completati
    }
    
    if (validationState === 'false') {
        return await ToDoModel.find({ completed: false });
    }

    return await ToDoModel.find(); // Se validationState è assente, mostra tutto
}


export async function addToDo(title: string, dueDate?: Date): Promise<ToDo> {

    // Calcola se il task è scaduto grazie al virtuals
    const expired = dueDate ? new Date(dueDate) < new Date() : false;

    const newToDo = await ToDoModel.create({
        title,
        dueDate,
        completed : false,
        expired
    });

    return newToDo;
}

export async function check(id: string): Promise<ToDo | null> {
    return await ToDoModel.findByIdAndUpdate(id, { completed: true }, { new: true }); //{ new: true } serve per restituire il documento aggiornato invece di quello originale.
}

export async function uncheck(id: string): Promise<ToDo | null> {
    return await ToDoModel.findByIdAndUpdate(id, {completed: false}, {new: true});
}