import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TaskStateType = {
[key: string]: Array<TasksType>
}

function App() {




    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'REST API', isDone: true},
    //     {id: v1(), title: 'GraphQL ', isDone: false},
    // ]);

       let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })



    function changeFilter(value: FilterValuesType, todolistID:string) {

        // let todolist = todolists.find(tl => tl.id === todolistID)
        // if(todolist){
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }

        setTodolists(todolists.map(el => el.id === todolistID ?{...el, filter: value}: el ))


    }

    function removeTask(id: string, todolistId:string) {
        //    let todolistTasks = tasks[todolistId]
        //
        // tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        //
        // setTasks({...tasks});

        setTasks({...tasks, [todolistId] : tasks[todolistId].filter(el => el.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        // let task = {id: v1(), title: title, isDone: true};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        let task = {id: v1(), title: title, isDone: true};

        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]

        setTasks({...tasks})

    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        // let task = tasks.find(t => t.id == id);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks([...tasks]);
        // }

        setTasks({...tasks, [todolistId] :tasks[todolistId].map(el => el.id===id ?{...el,isDone} : el)})
    }


    function removeTodolist(id: string) {
           setTodolists(todolists.filter(t => t.id !==id))
        delete tasks[id]

        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map(t => {

                let taskForTodolist = tasks[t.id]

                if (t.filter === 'active') {
                    taskForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === 'completed') {
                    taskForTodolist = tasks[t.id].filter(t => t.isDone);
                }

                return (
                    <TodoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                              tasks={taskForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>

    );
}

export default App;
