import { Schema, model } from 'mongoose';
import { ToDo } from "./todo-list.entity";

const toDOSchema = new Schema<ToDo>({
    title: {type: String, required: true},
    dueDate: { type: Date },
    completed: Boolean,
});

toDOSchema.virtual('expired').get(function () {
    if (!this.dueDate) return false; // Se non c'è una data, non è scaduto
    if(this.completed == true) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetta l'orario per confrontare solo la data
    return this.dueDate < today;
});

// Configurazione per includere virtuali nella conversione JSON
toDOSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const ToDoModel = model<ToDo>('todoList', toDOSchema);

