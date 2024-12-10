import { createStore } from "effector";
import fetchItems from "./effect.js";
import { addItem, removeItem, toggleItem } from "./event";

export const store = createStore([])
  .on(addItem, (state, item) => [...state, item])
  .on(removeItem, (state, id) => state.filter((item) => item.id !== id))
  .on(toggleItem, (state, id) =>
    state.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    ),
  )
  .on(fetchItems.doneData, (state, items) => items);
