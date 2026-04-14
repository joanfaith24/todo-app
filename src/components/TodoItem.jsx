import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDate, setEditDate] = useState(todo.date ? new Date(todo.date) : null);
    const [editRepeat, setEditRepeat] = useState(todo.repeat || "none");

    function handleEdit() {
        if(editText.trim() === "") return;
        onEdit(todo.id, editText, editDate, editRepeat);
        setIsEditing(false);
    }

    return (
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-3 flex flex-col gap-3">
            
            {/* Task text */}
            <div className="flex items-center gap-3">
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                        className="flex-1 border-2 border-blue-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                    />
                ) : (
                    <span className={`text-base flex-1 wrap-break-word ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {todo.text}
                    </span>
                )}
            </div>

            {/* Edit Date and Repeat */}
            {isEditing && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">📅 Date:</span>
                    <DatePicker
                        selected={editDate}
                        onChange={(d) => setEditDate(d)}
                        placeholderText="Select date & time (optional)"
                        className="border-2 border-gray-300 rounded-xl px-3 py-1 text-sm focus:outline-none focus:border-blue-500 w-full"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        isClearable
                    />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">🔁 Repeat:</span>
                        <select
                            value={editRepeat}
                            onChange={(e) => setEditRepeat(e.target.value)}
                            className="border-2 border-gray-300 rounded-xl px-3 py-1 text-sm focus:outline-none focus:border-blue-500">
                            <option value="none">No Repeat</option>
                            <option value="daily">Every Day</option>
                            <option value="monthly">Every Month</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Date and Repeat info (view mode) */}
            {!isEditing && (todo.date || todo.repeat !== "none") && (
                <div className="flex gap-3 text-sm text-gray-400">
            {todo.date && (
                <span>📅 {new Date(todo.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })}</span>
            )}
                </div>
            )}


            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleEdit}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-xl transition-all duration-200 cursor-pointer">
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-1 rounded-xl transition-all duration-200 cursor-pointer">
                            Cancel
                        </button>
                    </>
                ) : (
                    // ✅ Only show Edit button if task is NOT completed
                    !todo.completed && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-1 rounded-xl transition-all duration-200 cursor-pointer">
                            Edit
                        </button>
                    )
                )}
                <button
                    onClick={() => onToggle(todo.id)}
                    style={{cursor: "pointer"}}
                    className={`text-sm px-4 py-1 rounded-xl text-white transition-all duration-200 ${todo.completed ? "bg-gray-400 hover:bg-gray-500" : "bg-green-500 hover:bg-green-600"}`}>
                    {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-xl transition-all duration-200 cursor-pointer">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TodoItem