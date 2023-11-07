import { useEffect, useState } from "react";

const baseURL = "http://localhost/mysite2";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    getTodos();
  }, []);

  async function getTodos() {
    const todos = await fetch(`${baseURL}/getTodos.php`);
    const response = await todos.json();
    setTodos(response.data);
  }

  async function addTodo() {
    const formData = new FormData();
    formData.append("todo", todo);

    const todos = await fetch(`${baseURL}/addTodo.php`, {
      method: "POST",
      body: formData,
    });

    const response = await todos.json();

    if (response.success) {
      getTodos();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
    // const newTodo = todos;
    // // newTodo.splice(0, 0, todo);
    // newTodo.push(todo);

    // setTodos([...newTodo]);
    setTodo("");
  }

  async function deleteTodo(id) {
    const formData = new FormData();
    formData.append("id", id);
    const res = await fetch(`${baseURL}/delete.php`, {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    if (response.success) {
      getTodos();
    }
  }

  async function editTodo(id, todo) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("todo", todo);

    const res = await fetch(`${baseURL}/editTodo.php`, {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    if (response.success) {
      getTodos();
    }
  }

  return (
    <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div className="shadow rounded p-3 w-50">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              className="form-control gap-2"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>

        <div className="mt-3" style={{ maxHeight: "50vh", overflow: "auto" }}>
          {todos.map((item, index) => (
            <Todo
              index={index}
              item={item.todo}
              deleteTodo={() => deleteTodo(item.id)}
              editTodo={(todo) => editTodo(item.id, todo)}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Todo({ index, item, deleteTodo, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(item);

  function handleSubmit(e) {
    e.preventDefault();
    editTodo(todo);

    setEdit(false);
  }

  return (
    <div className="shadow rounded p-3 mb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <p className="mb-0">{index + 1 + ".   "} </p>
          {edit ? (
            <form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
                <button className="btn btn-success ml-2" type="submit">
                  Edit
                </button>
              </div>
            </form>
          ) : (
            <p className="mb-0">{item}</p>
          )}
        </div>
        <div className="d-flex gap-3 ">
          <button
            className="btn btn-warning"
            onClick={() => setEdit((cur) => !cur)}
          >
            {edit ? "Cancel" : "Edit"}
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => deleteTodo(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
