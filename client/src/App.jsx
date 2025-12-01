import NavBar from "./components/NavBar";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import InfoSidebar from "./components/InfoSidebar";

import { useState } from "react";

const testNotes = [
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6e7",
    workspaceId: "5f8d0d55b54764421b7156c1",
    title: "Project kickoff notes",
    content:
      "Initial meeting summary:\n- Goals\n- Milestones\n- Owners\n\nAction items assigned.",
    tags: ["meeting", "planning"],
    createdAt: "2025-11-01T10:00:00.000Z",
    updatedAt: "2025-11-02T09:30:00.000Z",
  },
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6e8",
    workspaceId: "5f8d0d55b54764421b7156c1",
    title: "API design decisions",
    content:
      "Decided to use REST for public API and GraphQL for internal consumption.\nEndpoints:\n- /v1/users\n- /v1/notes",
    tags: ["api", "design"],
    createdAt: "2025-11-05T14:20:00.000Z",
    updatedAt: "2025-11-10T08:15:00.000Z",
  },
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6e9",
    workspaceId: "5f8d0d55b54764421b7156c2",
    title: "Draft: marketing copy",
    content:
      "Headline ideas:\n1) Ship faster\n2) Build confidently\n\nChoose tone: friendly and professional.",
    tags: ["marketing", "draft"],
    createdAt: "2025-10-20T12:00:00.000Z",
    updatedAt: "2025-10-21T12:00:00.000Z",
  },
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6ea",
    workspaceId: "5f8d0d55b54764421b7156c2",
    title: "Bug triage 2025-11-15",
    content:
      "Prioritized list:\n- Critical: auth token expiry\n- High: data race in caching\n- Medium: UI flicker on settings page",
    tags: ["bugs", "triage"],
    createdAt: "2025-11-15T09:00:00.000Z",
    updatedAt: "2025-11-15T11:45:00.000Z",
  },
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6eb",
    workspaceId: "5f8d0d55b54764421b7156c3",
    title: "Personal note - ideas",
    content:
      "Brainstorm:\n- Offline sync\n- Incremental backups\n\nKeep short-term backlog.",
    tags: [],
    createdAt: "2025-09-30T07:30:00.000Z",
    updatedAt: "2025-10-01T08:00:00.000Z",
  },
  {
    _id: "64a7b3f1e4d1c2a3b4c5d6ec",
    workspaceId: "5f8d0d55b54764421b7156c1",
    title: "Release notes v1.2.0",
    content:
      "Highlights:\n- Performance improvements\n- Fixed memory leak in worker\n- Updated dependencies",
    tags: ["release", "changelog"],
    createdAt: "2025-11-29T16:45:00.000Z",
    updatedAt: "2025-11-30T09:00:00.000Z",
  },
];

function App() {
  const [currentNote, setCurrentNote] = useState(testNotes[0]);

  function selectNote(noteId) {
    const note = testNotes.find((n) => n._id === noteId);
    if (note) {
      setCurrentNote(note);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-stone-100">
      <NavBar />
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-1/6 h-full pt-4 justify-between border-r-3 border-gray-700">
          <NoteList
            notes={testNotes}
            onSelectNote={selectNote}
            className="w-full h-full"
          />
          <button className="flex flex-row items-center justify-center mx-2 my-2 py-2 px-4 gap-2 bg-blue-800 rounded-lg border-blue-700 hover:brightness-110 active:brightness-90 cursor-pointer">
            <img src="icons/plus-circle.svg" className="w-5 h-5" />
            <p className="text-xl text-center text-gray-100 font-semibold">
              New Note
            </p>
          </button>
        </div>
        <NoteEditor
          className="w-2/3 h-full pt-2"
          note={currentNote}
          onChangeNote={(note) => setCurrentNote(note)}
        />
        <InfoSidebar note={currentNote} className="w-1/6 h-full pt-4" />
      </div>
    </div>
  );
}

export default App;
