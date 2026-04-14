import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle, onEdit }) {
    return (
        <div>
            {todos.length === 0 ? (
                <p className="text-center text-gray-400 mt-6">No tasks yet. Add one above! 📝</p>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
}

export default TodoList