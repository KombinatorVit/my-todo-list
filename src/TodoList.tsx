import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';

export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistID:string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus:(id:string, isDone:boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string| null>(null);

    function onAddTaskHandler() {
        if(title.trim() !== ''){
            props.addTask(title.trim(),props.id);
            setTitle('');
        }else {
            setError('Title is required!')
        }

    }

    function removeTodolistHandler (){
        props.removeTodolist(props.id)
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
        props.changeFilter('all', props.id);
    }

    function onActiveClickHandler() {
        props.changeFilter('active', props.id);
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id);
    }


    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolistHandler}>X</button> </h3>
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
                        props.removeTask(t.id, props.id);
                    }

                    const onChangeStatusHandler =(e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id )
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