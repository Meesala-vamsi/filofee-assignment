import React, { useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const TodoList = ({ data, onClickEdit, onClickDelete }) => {
  const colorOfStatus = (value) => {
    switch (value) {
      case "Pending":
        return "orange";
      case "In Progress":
        return "blue";
      case "Completed":
        return "green";
      default:
        return "black";
    }
  };
  return (
    <ul className="list-none">
      {data.map((eachTodo) => (
        <li className="bg-white px-3 py-3 mb-5 rounded-xl" key={eachTodo?.id}>
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">{eachTodo.title}</h2>
            <div className="flex gap-3">
              <CiEdit
                className="text-2xl font-extrabold cursor-pointer"
                onClick={() => onClickEdit(eachTodo)}
              />
              <MdDeleteOutline className="text-2xl font-extrabold cursor-pointer" onClick={()=>{onClickDelete(eachTodo?.id)}} />
            </div>
          </div>
          <p>{eachTodo.description}</p>
          <div className="mt-3 flex justify-between">
            <p className="font-bold">{eachTodo.dueDate}</p>
            <p
              className="py-1 px-2 text-white rounded-lg"
              style={{ backgroundColor: colorOfStatus(eachTodo.status) }}
            >
              {eachTodo.status}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList