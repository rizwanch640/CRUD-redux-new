import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, addItem, updateItem, deleteItem } from "../src/Redux/Crud";

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [todo, setTodo] = useState({
    title: "",
  });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.id) {
      dispatch(updateItem(todo));
    } else {
      dispatch(addItem(todo));
    }
    setTodo({ id: "", title: "" });
  };

  const handleEdit = (item) => {
    setTodo(item);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <>
      <div className="container my-5 bg-light">
        <h1 className="text-center mb-5">Todo List</h1>
        <div className="card mb-5">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  <h3>Title</h3>
                </label>
                <input
                  type="text"
                  id="title"
                  title="title"
                  required
                  className="form-control"
                  value={todo.title}
                  onChange={(event) =>
                    setTodo({ ...todo, title: event.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">
                  {todo.id ? "Update" : "Add"}
                </button>
                <button
                  className="btn btn-secondary"
                  type="reset"
                  onClick={() => setTodo({ id: "", title: "" })}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th>Todo</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemList;
