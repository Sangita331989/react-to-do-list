import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EditTask from './EditTask';

function Home() {
  const getCurrentDate = () => new Date().toISOString().split('T')[0];

  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState(getCurrentDate());
  const [category, setCategory] = useState('Work');
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false, dueDate, category }]);
      setTask('');
      setDueDate(getCurrentDate());
      setCategory('Work');
    }
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-3xl mx-auto shadow-md rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-4 py-2 rounded-md bg-blue-500 text-white mb-4"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Input Fields */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <label className="block font-semibold">Task</label>
            <input 
              type="text" 
              placeholder="Enter a task" 
              value={task} 
              onChange={(e) => setTask(e.target.value)}
              className={`border p-2 rounded-md w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block font-semibold">Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)}
              className={`border p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block font-semibold">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className={`border p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button 
            onClick={addTask} 
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="mt-4 space-y-2">
          {sortedTasks.map((t) => (
            <li key={t.id} className={`flex justify-between items-center p-3 rounded-md ${t.completed ? 'bg-gray-600 dark:bg-gray-700 line-through text-gray-300' : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={t.completed} 
                  onChange={() => toggleComplete(t.id)}
                  className="w-5 h-5 cursor-pointer"
                  title="Check to mark as Completed"
                />
                <span>{t.text} (Due: {t.dueDate}) - <strong>{t.category}</strong></span>
              </div>
              <div>
                <Link 
                  to={`/edit/${t.id}`} 
                  className={`bg-blue-500 text-white px-3 py-1 rounded-md mr-2 ${t.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ pointerEvents: t.completed ? 'none' : 'auto' }}
                >
                  ✏️ Edit
                </Link>
                <button 
                  onClick={() => setTasks(tasks.filter(task => task.id !== t.id))}
                  className="bg-red-900 text-white px-3 py-1 rounded-md"
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
