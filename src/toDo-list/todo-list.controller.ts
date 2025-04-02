import { Request, Response, NextFunction } from 'express';
import { TypedRequest } from '../utils/typed-request.interface';
import { QueryPostDTO, QueryToDosDTO } from "./todo-list.DTO";
import { addToDo, check, getList, uncheck } from "./todo-list.service";
import { ToDo } from "./todo-list.entity";
import { ToDoModel } from "./todo-list.model";
import { NotFoundError } from '../errors/not-found.error';
import { isValidObjectId } from 'mongoose';

export const getListController = async (req: TypedRequest<QueryToDosDTO>, res: Response, next: NextFunction) => {
    try {

        const { showCompleted } = req.query;

        const list = await getList(showCompleted as string);

        res.status(200)
        res.json(list);

    } catch (err: any) {
        next(err);
    }
};

export const addToDoController = async (req: TypedRequest<QueryPostDTO>, res: Response, next: NextFunction) => {
    try {
        const { title, dueDate } = req.body;

        // Converte la dueDate in formato Date se è fornita
        const dueDateObj = dueDate ? new Date(dueDate) : undefined;

        const newToDo = await addToDo(title, dueDateObj); // Passa anche completed

        res.status(201).json(newToDo); // Risponde con il nuovo ToDo creato

    } catch (err: any) {
        next(err);
    }
};

export const updateCheck = async (req: Request, res: Response, next: NextFunction) => {
    try{

    const { id } = req.params

    if(!isValidObjectId(id)){
        throw new NotFoundError();
    }

    const updated = await check(id);

    if(!updated){
        throw new NotFoundError();
    }
    res.status(200);
    res.json(updated);

    }catch(err: any){
    next(err);
}

}

export const updateUncheck = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { id } = req.params;

    if(!isValidObjectId(id)){
        throw new NotFoundError();
    }

    const updated = await uncheck(id);
    
    if(!updated){
        throw new NotFoundError();
    }
        res.status(200);
        res.json(updated);

    }catch(err: any){
        next(err);
    }
}