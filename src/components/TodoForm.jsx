import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoForm({ onAdd, input, setInput, date, setDate, repeat, setRepeat }) {
    return (
        <div className="flex flex-col gap-3 mb-6">
            {/* Task Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onAdd()}
                    placeholder="Add a new task..."
                    className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={onAdd}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-xl transition-all duration-200 cursor-pointer">
                    Add
                </button>
            </div>

            {/* Date & Time Picker */}
            <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">📅 Date & Time:</span>
                <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    placeholderText="Select date & time (optional)"
                    className="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    isClearable
                />
            </div>

            {/* Repeat Option */}
            <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">🔁 Repeat:</span>
                <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500">
                    <option value="none">No Repeat</option>
                    <option value="daily">Every Day</option>
                    <option value="monthly">Every Month</option>
                </select>
            </div>
        </div>
    );
}

export default TodoForm