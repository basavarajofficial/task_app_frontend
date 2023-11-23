import axios from "axios";


const BASE_URI=process.env.BASE_URL;

//get todos
export const getAllTodos = async() => {
    try {
        const allTodos = await axios.get(BASE_URI);

        return allTodos.data;
    } catch (error) {
        
    }
}

// create
export const createTodo = async(title) => {
    try {
        const newTodo = await axios.post(BASE_URI, title);

        return newTodo.data;
    } catch (error) {
        
    }
}

//delete 
export const deletTodo = async(id) => {
    try {
        const res = await axios.delete(`${BASE_URI}/${id}`);

        return res;
    } catch (error) {
        console.log(error);
    }
}

// complete
export const completeTodo = async (id) => {
    try {
        const res = await axios.put(`${BASE_URI}/complete/${id}`);

        return res.data;

    } catch (error) {
        console.log(error);
    }
}

// update
export const updateTodo = async(id, title) => {
    try {
        const res = await axios.patch(`${BASE_URI}/${id}`, title);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}