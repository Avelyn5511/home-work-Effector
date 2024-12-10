import { createEffect } from "effector";

const fetchItems = createEffect(async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "test1", completed: false },
        { id: 2, text: "test2", completed: true },
        { id: 3, text: "test3", completed: false },
      ]);
    }, 2000);
  });
});

export default fetchItems;
