import { TodoList } from "./components/ui/todo/TodoList";
import { TodoContextProvider } from "./components/ui/todo/TodoContextProvider";

function App() {
  return (
    <TodoContextProvider>
      <>
        <TodoList />
      </>
    </TodoContextProvider>
  );
}

export default App;
