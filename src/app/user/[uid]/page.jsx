"use client";

import { MyContext } from "@/app/context-provider";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "/firebase";
import Task from "@/components/Task";

const page = () => {
  const { darkMode, auth } = useContext(MyContext);
  const router = useRouter();

  const [newTask, setNewTask] = useState({
    uid: "",
    title: "",
    description: "",
  });
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = () => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "tasks"),
          where("uid", "==", auth.currentUser ? auth.currentUser.uid : "")
        ),
        (querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
          });
          setAllTasks(tasks);
        }
      );
      return () => {
        unsubscribe();
      };
    };
    getAllTasks();
  }, [auth.currentUser]);

  const logOut = () => {
    signOut(auth);
    router.push("/");
  };

  const handleChangeTask = (e) => {
    setNewTask({
      ...newTask,
      uid: auth.currentUser.uid,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setNewTask({
        uid: "",
        title: "",
        description: "",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "tasks", newTask.id), {
        ...newTask,
        title: newTask.title,
        description: newTask.description,
      });
      setNewTask({
        uid: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (auth.currentUser) {
    return (
      <div className={`${darkMode && "dark"} h-full`}>
        <div className="dark:bg-gray-800 dark:text-slate-200 text-center h-full flex flex-col justify-center items-center">
          <div>
            <h3>{auth.currentUser.displayName}</h3>
            <p>{auth.currentUser.email}</p>
            <button
              onClick={logOut}
              className="rounded-full px-3 py-1 bg-red-300 text-gray-700 w-fit mt-2"
            >
              Log out
            </button>
          </div>
          <form
            onSubmit={newTask?.id ? handleUpdateTask : handleSubmitTask}
            className="flex flex-col gap-4 items-center py-8 px-4 my-10 rounded-lg bg-slate-200 dark:bg-slate-700"
          >
            <input
              required
              name="title"
              type="text"
              placeholder="title..."
              value={newTask.title}
              onChange={handleChangeTask}
            />
            <textarea
              required
              name="description"
              placeholder="description..."
              value={newTask.description}
              onChange={handleChangeTask}
            />
            <button className="rounded-full px-3 py-1 bg-gray-400 text-white w-fit">
              {newTask?.id ? "Update" : "Submit"}
            </button>
          </form>
          <div className="flex flex-wrap gap-4">
            {allTasks.map((task) => (
              <Task
                task={task}
                key={task.id}
                newTask={newTask}
                setNewTask={setNewTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default page;
