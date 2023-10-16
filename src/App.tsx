import "./App.css";
import TimerPicker from "./components/TimePicker";

function App() {
  return (
    <>
      <div className="flex gap-x-2">
        <TimerPicker />
        <TimerPicker />
      </div>
    </>
  );
}

export default App;
