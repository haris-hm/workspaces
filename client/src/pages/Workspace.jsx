import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import InfoSidebar from "../components/InfoSidebar";
import WorkspaceCreatorModal from "../components/WorkspaceCreatorModal";

import { createNote, getNotes, updateNote, deleteNote } from "../api/note";

function Workspace({
  name,
  currentWorkspace,
  onJoinWorkspace,
  onCreateWorkspace,
}) {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [openWorkspaceCreator, setOpenWorkspaceCreator] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      getNotes(currentWorkspace._id).then((notes) => {
        console.log(notes);
        setNotes(notes);
      });
    }
  }, [currentWorkspace]);

  function selectNote(noteId) {
    const note = notes.find((n) => n._id === noteId);
    if (note) {
      setCurrentNote(note);
    }
  }

  function changeNote(updatedNote) {
    updateNote(updatedNote._id, {
      title: updatedNote.title,
      content: updatedNote.content,
    });
    setNotes(
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setCurrentNote(updatedNote);
  }

  async function createNewNote() {
    const newNote = await createNote({
      workspaceId: currentWorkspace._id,
    });
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
  }

  function handleDeleteNote(noteId) {
    if (currentNote && currentNote._id === noteId) {
      setCurrentNote(null);
    }
    deleteNote(noteId);
    setNotes(notes.filter((note) => note._id !== noteId));
  }

  return (
    <div className="w-screen h-screen relative flex flex-col bg-stone-100">
      <NavBar
        name={name}
        workspace={currentWorkspace}
        onOpenModal={() => {
          setOpenWorkspaceCreator(!openWorkspaceCreator);
        }}
      />
      <WorkspaceCreatorModal
        display={openWorkspaceCreator}
        showCloseButton={currentWorkspace !== null}
        onJoinWorkspace={onJoinWorkspace}
        onCreateWorkspace={onCreateWorkspace}
        onCloseModal={() => {
          setOpenWorkspaceCreator(false);
        }}
      />
      <div
        className={`flex flex-row w-full flex-1 min-h-0 ${
          openWorkspaceCreator ? "blur-[3px] select-none" : ""
        }`}
      >
        <div className="relative flex flex-col w-1/6 border-r-3 border-gray-700">
          <NoteList
            notes={notes}
            onSelectNote={selectNote}
            blockOpen={openWorkspaceCreator}
            className="w-full flex-1 min-h-0 overflow-y-auto pt-4 pb-15"
          />
          <button
            onClick={createNewNote}
            className={`absolute inset-x-0 bottom-0 flex flex-row align-middle items-center justify-center mx-2 mb-2 py-2 px-4 gap-2 bg-blue-800 rounded-lg drop-shadow-md drop-shadow-gray-500 border-blue-700 shrink-0 ${
              openWorkspaceCreator
                ? ""
                : "hover:brightness-110 active:brightness-90 cursor-pointer"
            }`}
            disabled={openWorkspaceCreator}
          >
            <img
              src="icons/plus-circle.svg"
              className="size-5 max-md:size-10"
            />
            <p className="max-md:hidden text-xl text-center text-gray-100 font-semibold">
              New Note
            </p>
          </button>
        </div>

        <NoteEditor
          className="w-2/3 h-full pt-2"
          note={currentNote}
          blockEdits={openWorkspaceCreator}
          onChangeNote={changeNote}
        />

        <InfoSidebar
          note={currentNote}
          workspace={currentWorkspace}
          onDeleteNote={handleDeleteNote}
          className="w-1/6 h-full pt-4"
        />
      </div>
    </div>
  );
}

export default Workspace;
