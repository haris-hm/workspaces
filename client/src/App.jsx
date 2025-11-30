import NavBar from "./components/NavBar";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <NavBar />
      <div className="flex flex-row w-full h-full">
        <NoteList className="w-1/6 h-full" />
      </div>
    </div>
  );
}

export default App;
