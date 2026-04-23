import InteractionForm from "./interaction/InteractionForm";
import InteractionList from "./interaction/InteractionList";
import ChatAssistant from "./interaction/ChatAssistant";
import "./App.css";

function App() {
  return (
      <div className="dashboard">
        <InteractionForm />
        <ChatAssistant />
      </div>
  );
}

export default App;

