import { useState } from "react"

export default function ToDo() {
    const [todos, setTodos] = useState<string[]>([]);
    const [value, setValue] = useState('');

    const addTodo = () => {
        // todos.map(todo) => {
        //     console.log(todo);
        // }
        setTodos([...todos, value]);
        setValue('');
    }

    const deleteTodo = (index:number) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    return <div>
        <h4>My ToDo </h4>
    <ul>
        {/* buat nampilin listnya */}
        {/* {todos.map((todo, index) => <li key={index} > {todo} </li>)} */}
        {todos.map((todo, index) => <li key={`todo-${index}`} > 
            {todo} <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>)} 
    </ul>
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}></input>
            
            <button onClick={addTodo}>Add</button>
        </div>
    </div>
}