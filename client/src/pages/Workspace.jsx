import { useState, useEffect, useCallback, useRef } from "react";

import NavBar from "../components/NavBar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import InfoSidebar from "../components/InfoSidebar";
import WorkspaceCreatorModal from "../components/WorkspaceCreatorModal";

import { createNote, getNotes, changeNote, deleteNote } from "../api/note";
import {
  connectToWorkspace,
  disconnectSocket,
  socket,
  isSocketConnected,
} from "../api/sockets";

import useDebounce from "../hooks/useDebounce";

const DEBOUNCE_DELAY = 250; // milliseconds

function Workspace({
  name,
  currentWorkspace,
  onJoinWorkspace,
  onCreateWorkspace,
}) {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [openWorkspaceCreator, setOpenWorkspaceCreator] = useState(false);

  const currentNoteRef = useRef(currentNote);

  useEffect(() => {
    currentNoteRef.current = currentNote;
  }, [currentNote]);

  const updateNotes = useCallback((updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
    if (
      currentNoteRef.current &&
      currentNoteRef.current._id === updatedNote._id
    ) {
      setCurrentNote(updatedNote);
    }
  }, []);

  const createNewNote = useCallback((newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNote(newNote);
  }, []);

  const removeNote = useCallback((noteId) => {
    if (currentNoteRef && currentNoteRef.current._id === noteId) {
      setCurrentNote(null);
    }
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  }, []);

  // Debounced function for saving to backend
  const debouncedSaveNote = useDebounce((updatedNote) => {
    changeNote(updatedNote._id, {
      title: updatedNote.title,
      content: updatedNote.content,
    });

    // Emit socket event
    if (!isSocketConnected()) return;
    socket.emit("note-updated", {
      workspaceId: currentWorkspace._id,
      note: updatedNote,
    });
  }, DEBOUNCE_DELAY);

  // Socket connection setup and teardown
  useEffect(() => {
    if (currentWorkspace) {
      // Fetch notes for the current workspace
      getNotes(currentWorkspace._id).then((notes) => {
        setNotes(notes);
      });

      // Connect to the workspace's socket room
      connectToWorkspace(currentWorkspace._id);

      // Set up socket listeners for real-time updates
      socket.on("note-updated", updateNotes);
      socket.on("note-created", createNewNote);
      socket.on("note-deleted", removeNote);

      // Clean up on unmount or workspace change
      return () => {
        disconnectSocket();
        socket.off("note-updated");
        socket.off("note-created");
        socket.off("note-deleted");
      };
    }
  }, [currentWorkspace, updateNotes, createNewNote, removeNote]);

  function handleSelectNote(noteId) {
    const note = notes.find((n) => n._id === noteId);
    if (note) {
      setCurrentNote(note);
    }
  }

  function handleChangeNote(updatedNote) {
    // Update local state immediately
    updateNotes(updatedNote);

    // Debounce the API call and socket emission
    debouncedSaveNote(updatedNote);
  }

  async function handleCreateNewNote() {
    const newNote = await createNote({
      workspaceId: currentWorkspace._id,
    });
    createNewNote(newNote);
    if (!isSocketConnected()) return;
    socket.emit("note-created", {
      workspaceId: currentWorkspace._id,
      note: newNote,
    });
  }

  function handleDeleteNote(noteId) {
    removeNote(noteId);
    deleteNote(noteId);
    if (!isSocketConnected()) return;
    socket.emit("note-deleted", {
      workspaceId: currentWorkspace._id,
      noteId: noteId,
    });
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
            onSelectNote={handleSelectNote}
            blockOpen={openWorkspaceCreator}
            className="w-full flex-1 min-h-0 overflow-y-auto pt-4 pb-15"
          />
          <button
            onClick={handleCreateNewNote}
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
          onChangeNote={handleChangeNote}
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
