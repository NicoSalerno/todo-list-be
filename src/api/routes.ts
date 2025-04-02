import { Router } from 'express';
import todoRouter from "../toDo-list/todo-list.router"
const router = Router();

router.use('/todos', todoRouter)

export default router;