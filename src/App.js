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
      <div className="container my-5 ">
        <h1 className="text-center mb-5">Todo List</h1>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="form-group">
            <label htmlFor="title"> <h3>Title</h3> </label>
            <input
              type="text"
              id="title"
              title="title"
              required
              className="form-control mb-3"
              value={todo.title}
              onChange={(event) =>
                setTodo({ ...todo, title: event.target.value })
              }
            />
          </div>
          <button className="btn btn-primary mr-2 me-2" type="submit">
            {todo.id ? "Update" : "Add"}
          </button>
          <button
            className="btn btn-secondary"
            type="reset"
            onClick={() => setTodo({ id: "", title: "" })}
          >
            Reset
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped w-70 ">
          <thead>
            <tr>
              <th>Todo</th>
              <th className="text-end" >Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>

                <td className="text-end" >
                  <button
                    className="btn btn-sm btn-outline-primary mr-2 me-2 "
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
