import { BookmarkCheck, Trash2, Settings } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  interface Task {
    title: string;
    description: string;
  }

  const [todos, setTodos] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.title && task.description) {
      setTodos([...todos, task]);
      setTask({ title: "", description: "" });
      toast.success("New Task Added");
    }
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    toast.error("Task Deleted");
  };

  return (
    <>
      <div className="navbar bg-neutral text-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">Todo App</a>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="rounded-md bg-neutral m-3 p-5 w-full">
          <div className="flex flex-row justify-start items-center">
            <BookmarkCheck className="size-10 text-base-300" />
            <div>
              <h1 className="text-base-300 text-2xl">Todo List Project</h1>
            </div>
          </div>
          <div>
            <form onSubmit={addTodo}>
              <div className="p-5">
                <p className="text-base-300 text-2xl">Add Todo List</p>
              </div>
              <div className="m-5 flex flex-col justify-center gap-2">
                <label className="text-base-300 text-lg">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full max-w-xs"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </div>
              <div className="m-5 flex flex-col justify-center gap-2">
                <label className="text-base-300 text-lg">Description</label>
                <textarea
                  className="textarea textarea-bordered resize-none"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                ></textarea>
                <button className="btn btn-sm btn-warning btn-outline text-base-300 text-lg w-full max-w-xs">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-neutral shadow m-3 rounded-md">
        <div className="grid grid-cols-4">
          {todos && todos.length > 0 ? (
            todos.map((todo, i) => (
              <div key={i} className="m-1 p-2">
                <div className="rounded-md bg-base-100 p-2 relative">
                  <h3 className="text-lg">{todo.title}</h3>
                  <p className="text-xs">{todo.description}</p>
                  <Settings className="cursor-pointer absolute bottom-0 right-6  size-5 m-2" />
                  <Trash2
                    className="cursor-pointer absolute bottom-0 right-0 size-5 m-2"
                    onClick={() => deleteTodo(i)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-base-200 p-2">No todo Added</div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
