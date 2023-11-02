import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  
  useEffect(()=>{
    const fetchTodo = async () => {
      const response =  await fetch('/api/todoHandler');
      const dataResponse = await response.json();
      setTodoItems(dataResponse.todoList)
    }
    
    fetchTodo();
  })

  const handleSubmit = () => {
    const item = {
      id: Math.floor(Math.random() * 100),
      todoItem: todo,
      isCompleted: false
    }
    setTodo('');
    setTodoItems(oldList => [...oldList, item]);
    updateTodoInDB(item);
  }
  async function updateTodoInDB(item){
    const response = await fetch('/api/todoHandler', {
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }
  const handleDelete = (item) => {
    const newItems = todoItems.filter(x => x.id !== item.id);
    setTodoItems(newItems);
  }

  const handleCompletedItems = (item,e) => {
    if(e.target.checked){
      item.isCompleted = true;
      const updatedItems = [...completedItems,item];
      setCompletedItems(updatedItems);
    }
    else{
      item.isCompleted = false;
      const updatedItems = completedItems.filter(x => x.id !== item.id);
      setCompletedItems(updatedItems);
    }
    console.log(completedItems)
  }

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.todoContainer}>
          <input className={styles.inputContainer} onChange={(e) => setTodo(e.target.value)} value={todo} />
          <button className={styles.addTodo} onClick={() => handleSubmit()}>Add Todo</button>
        </div>
        <div className={styles.todoList}>
          {
            todoItems.map(item =>
            (
              <div className={styles.todo} key={item.id}>
                <input type='checkbox' onChange={(e)=>handleCompletedItems(item,e)}/>
                <span>{item.todoItem}</span>
                <button className={styles.deleteButton} onClick={() => handleDelete(item)}>Delete</button>
              </div>
            )
            )

          }
        </div>
        <div style={{color:'white'}}>
          {completedItems.map(item => <li>{item.todoItem}</li>)}
        </div>
      </main>
    </div>
  )
}


