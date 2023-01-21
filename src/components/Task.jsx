import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "/firebase";

const Task = ({ task: { id, uid, title, description }, setNewTask }) => {
  const editTask = () => {
    setNewTask({
      id: id,
      uid: uid,
      title: title,
      description: description,
    });
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div className="p-4 rounded-lg shadow flex flex-col items-center bg-gray-200 dark:bg-gray-700 dark:text-slate-200">
      <label className="uppercase">{title}</label>
      <p className="font-light">{description}</p>
      <div className="w-full flex justify-between">
        <button onClick={editTask}>
          <FiEdit />
        </button>
        <button onClick={deleteTask}>
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default Task;
