import { TodoContextProvider } from "./context/todo/TodoContextProvider";
import { TodoList } from "./components/ui/todo/TodoList";

function App() {
  return (
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  );
}

export default App;
