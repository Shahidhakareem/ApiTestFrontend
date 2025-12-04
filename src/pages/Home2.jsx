import { useState, useEffect } from "react";
import "../css/style.css";
import { supabase } from "../supabase-client";

export const Home = ({ session }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [taskImage, setTaskImage] = useState("");

  const fetchdata = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching task", error.message);
      return;
    }
    setTasks(data);
  };

  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription, title: newTitle })
      .eq("id", id);

    if (error) {
      console.error("Error updating task", error.message);
      return;
    }

    fetchdata();
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task", error.message);
      return;
    }

    fetchdata();
  };

  const uploadImage = async (file) => {
    const filePath = `${file.name}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("tasks-images")
      .upload(filePath, file);
    if (error) {
      console.error("Error uploading image", error.message);
      return null;
    }
    const { data } = await supabase.storage
      .from("tasks-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (taskImage) {
      imageUrl = await uploadImage(taskImage);
    }

    const { error } = await supabase
      .from("tasks")
      .insert({ ...newTask, email: session.user.email, image_url: imageUrl })
      .single();

    if (error) {
      console.error("Error adding task", error.message);
    }

    setNewTask({ title: "", description: "" });
    fetchdata();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1>Task Manager Crud</h1>

      <form onSubmit={handleSubmit}>
        <div className="pt-5">
          <input
            placeholder="Task Title"
            className="border-1 mx-2 w-100 p-2"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <br />

          <textarea
            placeholder="Task Description"
            className="border-1 mx-2 w-100 p-2"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <br />
          <input type="file" accept="images/*" onChange={handleFileChange} />
          <button type="submit" className="bg-sky-500 hover:bg-sky-700">
            Add
          </button>
        </div>
      </form>

      <div className="border-1 mt-4 p-4">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="py-4">
                <h2>{task.title}</h2>
                <p className="mt-2">{task.description}</p>
                <img src={task.image_url} width="100px" height="100px"/>
              </div>

              <input
                type="text"
                className="border-1 mx-2 py-2"
                placeholder="New Title"
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <br />

              <textarea
                className="border-1 mx-2 mt-2"
                placeholder="New Description"
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <br />

              <button
                className="border-1 mx-2 mt-2"
                onClick={() => updateTask(task.id)}
              >
                Edit
              </button>

              <button
                className="border-1 mx-2 mt-2"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
