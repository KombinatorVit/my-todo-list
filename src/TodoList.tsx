import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(id:string, isDone:boolean) => void
    filter: FilterValuesType
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string| null>(null);

    function onAddTaskHandler() {
        if(title.trim() !== ''){
            props.addTask(title.trim());
            setTitle('');
        }else {
            setError('Title is required!')
        }

    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
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
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                className={error ? 'error': ''}
                />
                <button onClick={onAddTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
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
                        <li key={t.id} className={t.isDone ? 'is-done': ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>

                            <button onClick={removeTaskHandler}>x</button>
                        </li>


                    );
                })}


            </ul>
            <div>
                <button className={props.filter ==='all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter ==='active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter ==='completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}