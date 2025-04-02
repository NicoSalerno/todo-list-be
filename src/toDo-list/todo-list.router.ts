import { Router } from "express";
import { addToDoController, getListController, updateCheck, updateUncheck } from "./todo-list.controller";
import { validate } from "../lib/validation-middleware"
import { QueryPostDTO, QueryToDosDTO } from "./todo-list.DTO";
import { validationHandler } from "../errors/validation";

const router = Router();
//@ts-ignore
router.get('/', validate(QueryToDosDTO, 'query'), getListController);
router.post('/', validate(QueryPostDTO, 'body'), addToDoController);
router.patch('/:id/check', updateCheck);
router.patch('/:id/uncheck', updateUncheck);

export default router;