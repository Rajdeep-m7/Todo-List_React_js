import './App.css';
import { useEffect, useState } from 'react';
function App() {
    const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('Todo');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
    const [newTasks,setNewTasks]=useState("");
 
    useEffect(()=>{
        localStorage.setItem('Todo',JSON.stringify(tasks));
    },[tasks])

    const handleChange=(event)=>{
        setNewTasks(event.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    if (newTasks.trim() !== "") { 
      setTasks((prev) => [...prev, newTasks]);
      setNewTasks("");
    }
    }

    const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleClick=(e)=>{
    if(e.target.style.textDecoration==="line-through"){
        e.target.style.textDecoration="none"
    }else{
        e.target.style.textDecoration="line-through"
    }
  }
  

    return(
        <form onSubmit={handleSubmit}>
        <div className='container'>
        <h1>Todo-List</h1>
        <div className="input-div">
            <input type="text" name="todoInput" value={newTasks}  onChange={handleChange} placeholder='Enter todos'/>
            <button className="submit-btn" >Add Task</button>
        </div>
        <div>
            <ol>
                {tasks.map((task,index) =>
                <li key={index} onClick={handleClick} >
                    <span>{task}</span>
                    <span>{new Date().toLocaleDateString()}</span>
                    <button className="delete-btn"
                    onClick={handleDelete}
                    >
                        x
                    </button>
                </li>
                )}
            </ol>
        </div>
        </div>
        </form>
    )
}

export default App;
