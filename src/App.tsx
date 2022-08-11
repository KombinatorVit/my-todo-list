import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';


function App() {


    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'REST API', isDone: true},
        {id: 5, title: 'GraphQL ', isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');
    let taskForTodolist = tasks;

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function removeTask(id: number) {
        let newTask = tasks.filter(el => el.id !== id);
        setTasks(newTask);
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
