import React, {useCallback} from 'react';
import {FilterValuesType, TasksType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    removeTask: (id: string, todolistId: string) => void

    filter: FilterValuesType
    removeTodolist: (id: string) => void

    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {

    const onAddTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    function removeTodolistHandler() {
        props.removeTodolist(props.id);
    }

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all');
    }, [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active');
    }, [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed');
    }, [props.changeFilter, props.id]);

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);

    }, [props.id, props.changeTodolistTitle]);

    let taskForTodolist = props.tasks;
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(t => t.isDone);
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}> <Delete/> </IconButton>

            </h3>

            <AddItemForm addItem={onAddTaskHandler}/>
            <div>

                {taskForTodolist.map((t) => <Task key={t.id}
                                                  changeTaskStatus={props.changeTaskStatus}
                                                  changeTaskTitle={props.changeTaskTitle}
                                                  removeTask={props.removeTask}
                                                  task={t}
                                                  todolistId={props.id}
                />)

                }


            </div>

            <div>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});

