import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import { v1 } from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';


function App() {


    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'REST API', isDone: true},
        {id: v1(), title: 'GraphQL ', isDone: false},
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

    function removeTask(id: string) {
        let newTask = tasks.filter(el => el.id !== id);
        setTasks(newTask);
    }

    function addTask (title:string){
        let task ={id: v1(), title: title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(id:string, isDone:boolean){
        let task = tasks.find(t=>t.id==id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
