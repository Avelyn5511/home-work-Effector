import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import fetchItems from "../state/effect";
import { addItem, removeItem, toggleItem } from "../state/event";
import { store } from "../state/store";

const TodoList = () => {
  const [newItem, setNewItem] = useState("");
  const todoList = useUnit(store);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      await fetchItems();
      setIsLoading(false);
    };
    loadItems().then((r) => r);
  }, []);

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    addItem({ id: Date.now(), text: newItem.trim(), completed: false });
    setNewItem("");
  };

  const handleToggleItem = (id) => {
    toggleItem(id);
  };

  const handleRemoveItem = (id) => {
    removeItem(id); // Вызов события удаления
  };

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={handleAddItem} style={styles.addButton}>
          Add
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {todoList.map((item) => (
            <li key={item.id} style={styles.itemContainer}>
              <span
                style={{
                  ...styles.item,
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleItem(item.id)}
              >
                {item.text}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  item: {
    cursor: "pointer",
    flex: 1,
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#F44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
