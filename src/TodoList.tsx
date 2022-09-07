import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: TodoListPropsType) {

    function onAddTaskHandler(title: string) {
        props.addTask(title, props.id);

    }

    function removeTodolistHandler() {
        props.removeTodolist(props.id);
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

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle);

    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>X</button>

            </h3>
            <AddItemForm addItem={onAddTaskHandler}/>
            <ul>

                {props.tasks.map((t) => {
                    function removeTaskHandler() {
                        props.removeTask(t.id, props.id);
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id,);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}
                            />
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitleHandler}
                            />
                            <button
                                onClick={removeTaskHandler}>
                                x
                            </button>
                        </li>


                    );
                })}


            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}