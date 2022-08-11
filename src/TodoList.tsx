import React from 'react';
import {FilterValuesType, TasksType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number)=> void
    changeFilter: (value: FilterValuesType)=> void
}

export function TodoList(props: TodoListPropsType) {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {props.tasks.map((t) => {
                    function removeTaskHandler() {
                        props.removeTask(t.id)
                    }

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>

                        <button onClick={removeTaskHandler}>x</button>
                        </li>


                    );
                })}


            </ul>
            <div>
                <button onClick={()=> {props.changeFilter('all')}}>All</button>
                <button onClick={()=> {props.changeFilter('active')}}>Active</button>
                <button onClick={()=> {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
}