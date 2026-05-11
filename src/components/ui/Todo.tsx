import "../../styles/todo.css";

const todos = [
  { id: 1, title: "buy groceries", status: "pending" },
  { id: 2, title: "go to the gym", status: "pending" },
  { id: 3, title: "read a book", status: "pending" },
  { id: 4, title: "watch a movie", status: "pending" },
  { id: 5, title: "go for a walk", status: "pending" },
];

const Todo = (props: { title: string; status: string }) => {
  return (
    <div className="todo-item">
      <h3 className="todo-title">{props.title}</h3>
      <p className="todo-status">{props.status}</p>
      <button className="todo-button" type="button">
        Complete
      </button>
      <button className="todo-button todo-button-danger" type="button">
        Delete
      </button>
    </div>
  );
};

export const TodoList = () => {
  const todoElements = todos.map((todo) => {
    return <Todo key={todo.id} title={todo.title} status={todo.status} />;
  });

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">{todoElements}</div>
    </section>
  );
};
