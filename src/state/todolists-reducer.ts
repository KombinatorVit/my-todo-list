import {TodolistsType} from '../App';
import {v1} from 'uuid';

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
         return   [
                ...state, {
            id: v1(), title: action.title, filter: 'all'
            }
            ]

        }
        // function addTodolist(title: string) {
        //     let newTodolistId = v1();
        //     let newTodolist: TodolistsType = {id: newTodolistId, title, filter: 'all'};
        //     setTodolists([newTodolist, ...todolists]);
        //     setTasks({
        //         ...tasks,
        //         [newTodolistId]: []
        //     });
        // }

        default:
            throw new Error('I don\'t understand this type');
    }
};

