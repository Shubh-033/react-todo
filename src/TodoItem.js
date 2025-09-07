import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-section">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleEdit}
              className="edit-input"
              autoFocus
            />
            <div className="edit-buttons">
              <button onClick={handleEdit} className="save-btn">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Edit todo"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="delete-btn"
              title="Delete todo"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
