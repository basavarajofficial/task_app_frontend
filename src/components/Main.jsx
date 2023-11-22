/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  completeTodo,
  createTodo,
  deletTodo,
  getAllTodos,
} from "./apiHandler";

function Main() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  const fetchTodos = async () => {
    try {
      const data = await getAllTodos();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (title) => {
    try {
      const data = { title };
      const newTodo = await createTodo(data);

      setTodos([...todos, newTodo]);
    } catch (error) {
      console.log(error);
    }
  };

  // delete todo
  const delHandler = async (id) => {
    try {
      // const todo = todos.find(todo => todo._id === id)
      // console.log(todo);
      // if(todo.completed){
      await deletTodo(id);
      let remainingTodos = todos.filter((todo) => todo._id !== id);
      setTodos(remainingTodos);
      // }else{
      //     alert("Please complete the task")
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    try {
      let data = await completeTodo(id);

      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === data._id) {
            // todo.completed = !todo.completed;
            return {...todo, completed: !todo.completed};
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };


  let tasks = 0;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.elements.title.value;
          handleCreate(title);
          e.target.reset();
        }}
      >
        <input type="text" name="title"    />
        <button type="submit">add</button>
      </form>

      <div className="task-count">
        <p>tasks : {todos?.length}</p>
        <p>
          completed tasks :{" "}
          {todos.map(todo => {
             if (todo.completed) {
              tasks += 1;
            }
          })}
          {tasks}
        </p>
      </div>

      <div className="container">
        {todos.length > 0 ? (
          todos?.map((todo) => (
            <div
              key={todo._id}
              className={"task " + (todo.completed ? "task-completed" : "")}
            >
              <div className="box">
                <div
                  className="box-content"
                  onClick={() => completeTask(todo._id)}
                >
                  <div className="completed"></div>
                  <h4>{todo.title}</h4>
                </div>
                <div>
                  <RiDeleteBin6Fill
                    onClick={() => delHandler(todo._id)}
                    className="del-btn"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Tasks</h1>
        )}
      </div>
    </div>
  );
}

export default Main;
