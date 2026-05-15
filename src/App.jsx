import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [date, setDate] = useState(null);
  const [repeat, setRepeat] = useState("none");
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false); // ← new

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd() {
    if (input.trim() === "") return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false,
      date: date,
      repeat: repeat
    }]);
    setInput("");
    setDate(null);
    setRepeat("none");
  }

  function handleDeletePrompt(id) {
    setDeleteId(id);
    setShowDeletePrompt(true);
  }

  function handleConfirmDelete() {
    setTodos(todos.filter(todo => todo.id !== deleteId));
    setShowDeletePrompt(false);
    setDeleteId(null);
    // Show success popup then auto-hide after 2 seconds
    setShowDeleted(true);
    setTimeout(() => setShowDeleted(false), 2000);
  }

  function handleCancelDelete() {
    setShowDeletePrompt(false);
    setDeleteId(null);
  }

  function handleToggle(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function handleEdit(id, newText, newDate, newRepeat) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, date: newDate, repeat: newRepeat } : todo
    ));
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
            My Daily Planner 📝
          </h1>
          <TodoForm
            onAdd={handleAdd}
            input={input}
            setInput={setInput}
            date={date}
            setDate={setDate}
            repeat={repeat}
            setRepeat={setRepeat}
          />

          {/* Active Tasks */}
          <h2 className="text-lg font-bold text-gray-600 mb-3">Tasks</h2>
          <TodoList
            todos={activeTodos}
            onDelete={handleDeletePrompt}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        </div>

        {/* Completed Section */}
        {completedTodos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-lg font-bold text-green-500 mb-3">
              ✅ Completed ({completedTodos.length})
            </h2>
            <TodoList
              todos={completedTodos}
              onDelete={handleDeletePrompt}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          </div>
        )}

        {/* Delete Confirmation Prompt */}
        {showDeletePrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Task?</h2>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this task? This cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-xl transition-all duration-200">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-xl transition-all duration-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETED SUCCESS POPUP ── */}
        {showDeleted && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-72 text-center animate-bounce-once">
              <div className="text-5xl mb-3">🗑️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Deleted!</h2>
              <p className="text-gray-400 text-sm">The task has been removed successfully.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
