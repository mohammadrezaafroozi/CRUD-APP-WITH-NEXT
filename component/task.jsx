"use client"
import { useEffect, useState } from "react"

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks', { cache: 'no-store' });
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const handleUpdate = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    });
    setEditId(null);
    setEditTitle('');
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="bg-amber-500 w-[1000px] h-[70px] text-black text-3xl p-[10px] mt-4 rounded-2xl flex items-center">
          {editId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="p-2 rounded"
              />
              <button onClick={() => handleUpdate(task.id)} className="ml-2 bg-green-500 p-2 rounded">Save</button>
              <button onClick={() => setEditId(null)} className="ml-2 bg-gray-400 p-2 rounded">Cancel</button>
            </>
          ) : (
            <>
              <span className="flex-1">{task.title}</span>
              <button onClick={() => handleEdit(task)} className="ml-2 bg-blue-500 p-2 rounded">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="ml-2 bg-red-500 p-2 rounded">Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tasks;