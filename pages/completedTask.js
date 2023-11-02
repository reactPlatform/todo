import React from 'react'
import styles from '../styles/Home.module.css'
const completedTask = (props) => {
  const completedTodos = props.todoList;
  return (
    <div className={styles.todoList}>
      {
            completedTodos.map(item =>
            (
              <div className={styles.todo} key={item.id}>
                <span>{item.todoItem}</span>
              </div>
            )
            )

          }
    
    </div>
  )
}

export default completedTask
export async function getServerSideProps(){
  const response = await fetch('http://localhost:3000/api/todoHandler');
  const dataResponse = await response.json();
  const completedTodos = dataResponse.todoList.filter(item => item.isCompleted)
  return{
    props:{
      todoList: completedTodos,
    }
  }
}