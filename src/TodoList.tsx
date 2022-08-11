import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(id:string, isDone:boolean) => void
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState('');

    function onAddTaskHandler() {
        props.addTask(title);
        setTitle('');
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onAddTaskHandler();
        }
    }

    function onAllClickHandler() {
        props.changeFilter('all');
    }

    function onActiveClickHandler() {
        props.changeFilter('active');
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed');
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onAddTaskHandler}>+</button>
            </div>
            <ul>

                {props.tasks.map((t) => {
                    function removeTaskHandler() {
                        props.removeTask(t.id);
                    }

                    const onChangeStatusHandler =(e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue )
                    }

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>

                            <button onClick={removeTaskHandler}>x</button>
                        </li>


                    );
                })}


            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}