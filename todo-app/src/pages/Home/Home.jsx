import React, { useEffect, useState } from "react";
import TodoList from "../../components/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [todoData, setTodoData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTodoData(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

  useEffect(() => {
    if (todoData.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoData));
    }
  }, [todoData]);

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmitData = (event) => {
    event.preventDefault();

    if (isEditing) {
      setTodoData((prev) =>
        prev.map((todo) =>
          todo.id === formData.id ? { ...todo, ...formData } : todo
        )
      );
      setIsEditing(false);
    } else {
      const myTodo = { ...formData, id: uuidv4() };
      setTodoData((prev) => [...prev, myTodo]);
    }

    setFormData({
      id: "",
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    });
  };

  const onClickEdit = (todo) => {
    setFormData(todo);
    setIsEditing(true);
  };

  const onClickDelete = (id)=>{
    setTodoData((prev)=>prev.filter((eachTodo)=>eachTodo.id !== id))
  }

  return (
    <div className="md:h-screen flex flex-col md:flex-row px-1 py-2 md:px-4 md:py-5">
      <form
        className="bg-white px-2 py-2 md:px-4 md:py-3 mx-4 rounded-md md:w-2/3"
        onSubmit={onSubmitData}
      >
        <h2 className="tracking-wider font-bold text-3xl">
          {isEditing ? "Edit Todo" : "Create Todo"}
        </h2>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label htmlFor="title" className="font-bold text-lg tracking-wider">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            onChange={onChangeInput}
            value={formData.title}
            className="outline-none px-2 bg-gray-200 h-9 rounded-lg"
            required
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label
            htmlFor="description"
            className="font-bold text-lg tracking-wider"
          >
            Description:
          </label>
          <textarea
            id="description"
            placeholder="Enter Description"
            rows={5}
            className="outline-none p-4 bg-gray-200 rounded-lg w-full resize-y"
            onChange={onChangeInput}
            value={formData.description}
            required
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label htmlFor="dueDate" className="font-bold text-lg tracking-wider">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            className="outline-none px-2 bg-gray-200 h-9 rounded-lg"
            onChange={onChangeInput}
            value={formData.dueDate}
            required
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label htmlFor="status" className="font-bold text-lg tracking-wider">
            Status:
          </label>
          <select
            id="status"
            className="outline-none px-2 bg-gray-200 h-9 rounded-lg"
            onChange={onChangeInput}
            value={formData.status}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button className="bg-violet-200 outline-none border-0" type="submit">
          {isEditing ? "Update Todo" : "Add Todo"}
        </button>
      </form>
      <div className="md:w-1/3 px-4 py-2 md:px-0 md:py-0 h-full overflow-y-scroll scrollbar-hide">
        <h2 className="font-bold tracking-widest text-3xl mx-3 my-5">My Todos</h2>
        <TodoList
          data={todoData}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </div>
    </div>
  );
};

export default Home;
