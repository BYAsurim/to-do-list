import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type filterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type StateTasksType = {
    [key: string]: Array<TasksType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<StateTasksType>({
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
    // const [tasks, setTasks] = useState<Array<TasksType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Redax", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false}
    // ])
    // const [filter, setFilter] = useState<filterType>('all')
    const [error, setError] = useState('')
    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})

    }
    const addTask = (todolistId: string, title: string) => {
        // if (title.trim() !== '') {
        //     setTasks([...tasks, {id: v1(), title, isDone: false}])
        //     setError('')
        // }
        // if (title.trim() === '') {
        //     setError('error')
        // }
        if (title.trim() !== '') {
            setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
            setError('')
        }
        if (title.trim() === '') {
            setError('error')
        }
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})

    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodoList = (newTitle: string) => {
        let newTodoLIstId = v1()
        let newTodo: TodolistsType = {id: newTodoLIstId, title: newTitle, filter: 'all'}
        if (newTitle.trim() !== '') {
            setTodolists([...todolists, newTodo])
            setTasks({...tasks, [newTodoLIstId]: []})
        }
    }

    //
    // let filteredTasks = tasks
    // if (filter === 'active') {
    //     filteredTasks = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     filteredTasks = tasks.filter(t => t.isDone)
    // }
    // const changeFilter = (value: filterType) => {
    //     setFilter(value)
    // }
    return (
        <div className="App">
            <AddItemForm addTaskHandler={addTodoList}/>

            {
                todolists.map(todolist => {
                    let filteredTasks = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = tasks[todolist.id].filter(t => t.isDone)
                    }
                    const changeFilter = (value: filterType, todolistId: string) => {
                        let todolist = todolists.find(todolist => todolist.id === todolistId)
                        if (todolist) {
                            todolist.filter = value
                            setTodolists([...todolists])
                        }
                    }
                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        error={error}
                        setError={setError}
                        filter={todolist.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }

        </div>
    );
}

export default App;

