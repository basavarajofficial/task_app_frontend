import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { completeTodo, createTodo, deletTodo, getAllTodos, updateTodo } from "./apiHandler";
import { HiPencilAlt } from "react-icons/hi";

function NewMain() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [upId, setId] = useState("");

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const data = { title: title };
      const newTodo = await createTodo(data);

      setTodos((currTodo) => {
        return [...currTodo, newTodo];
      });

      setTitle("");
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
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleTask = async (todo) => {
    setEditMode(true);
    setId(todo._id);
    setTitle(todo.title);

  };

  const updata = async(e) => {
    try {
      e.preventDefault();
      const res = await updateTodo(upId, {title : title});

      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === res._id) {
            return { ...todo, title : title };
          }
          return todo;
        })
      );      
    } catch (error) {
      console.log(error);
    }
    setTitle("")
    setId("");
    setEditMode(false);
  }



  let tasks = 0;

  todos?.map((todo) => {
    if (todo?.completed) {
      tasks += 1;
    }
  });

  return (
    <div>
      <form onSubmit={editMode ? updata : handleCreate}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="sub-btn">{editMode ? "Update" : "Add"}</button>
      </form>

      <div >
        {todos?.length > 0 && (
          <div className="task-count">
            <p>tasks : {todos?.length}</p>
            <p> completed tasks :{tasks}</p>
          </div>
        )}
        
      </div>

      <div className="container">
        {todos?.length > 0 ? 
        
        
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
              <div className="actions">
                <RiDeleteBin6Fill
                  onClick={() => delHandler(todo._id)}
                  className="del-btn"
                />
               
                  <HiPencilAlt onClick={() => getSingleTask(todo)} className="ed-btn"  />
              </div>
            </div>
          </div>
        ))

        : 
        <h1>No Tasks</h1>
}

      </div>
    </div>
  );
}

export default NewMain;
