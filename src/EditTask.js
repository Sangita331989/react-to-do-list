import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);

    const taskToEdit = savedTasks.find((t) => t.id === Number(taskId));

    if (taskToEdit) {
      setTaskText(taskToEdit.text);
      setDueDate(taskToEdit.dueDate);
      setCategory(taskToEdit.category);
    }
  }, [taskId]);

  const updateTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === Number(taskId) ? { ...t, text: taskText, dueDate, category } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">Edit Task</h1>
        <label className="block font-semibold">Task</label>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} className="border p-2 w-full rounded-md mb-2"/>
        <label className="block font-semibold">Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 w-full rounded-md mb-2"/>
        <label className="block font-semibold">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full rounded-md mb-2">
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={updateTask} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Save</button>
      </div>
    </div>
  );
}

export default EditTask;
