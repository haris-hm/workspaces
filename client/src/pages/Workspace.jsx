import { useState, useEffect, useCallback, useRef } from "react";

import NavBar from "../components/NavBar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import InfoSidebar from "../components/InfoSidebar";
import WorkspaceCreatorModal from "../components/WorkspaceCreatorModal";

import {
  createWorkspaceNote,
  getWorkspaceNotes,
  updateWorkspaceNote,
  deleteWorkspaceNote,
} from "../api/note";

import {
  connectToWorkspace,
  disconnectSocket,
  socket,
  isSocketConnected,
} from "../api/sockets";

import useDebounce from "../hooks/useDebounce";

const DEBOUNCE_DELAY = 150; // milliseconds

/**
 * A workspace page component that manages notes within a workspace.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the user.
 * @param {Object} props.currentWorkspace - The currently selected workspace.
 * @param {Function} props.onJoinWorkspace - Callback for joining a workspace.
 * @param {Function} props.onCreateWorkspace - Callback for creating a new workspace.
 * @returns {JSX.Element} The rendered Workspace component.
 */
function Workspace({
  name,
  currentWorkspace,
  onJoinWorkspace,
  onCreateWorkspace,
}) {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState([
    { name: name },
  ]);
  const [openWorkspaceCreator, setOpenWorkspaceCreator] = useState(false);

  const currentNoteRef = useRef(currentNote);

  useEffect(() => {
    currentNoteRef.current = currentNote;
  }, [currentNote]);

  /**
   * Updates the current note in local state to reflect changes received
   * @param {Object} updatedNote - The updated note object.
   */
  const updateNotes = useCallback((updatedNote) => {
    console.log("Updating note:", updatedNote);
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

  /**
   * Creates a new note in the local state.
   * @param {Object} newNote - The new note object.
   */
  const createNote = useCallback((newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNote(newNote);
  }, []);

  /**
   * Deletes a note from the local state.
   * @param {string} noteId - The ID of the note to delete.
   */
  const deleteNote = useCallback((noteId) => {
    if (currentNoteRef && currentNoteRef.current._id === noteId) {
      setCurrentNote(null);
    }
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  }, []);

  /**
   * Updates the members of the current workspace in local state.
   * @param {Array} members - The updated list of workspace members.
   */
  const updateMembers = useCallback((members) => {
    console.log("Updating members:", members);
    setCurrentWorkspaceMembers(members);
  }, []);

  /**
   * Debounced function to emit socket event for note updates.
   * @param {Object} updatedNote - The updated note object.
   */
  const debouncedSocketNoteUpdate = useDebounce((updatedNote) => {
    // Emit socket event
    if (!isSocketConnected()) return;
    socket.emit("note-updated", {
      workspaceId: currentWorkspace._id,
      note: updatedNote,
    });
  }, DEBOUNCE_DELAY);

  /**
   * Debounced function to save note updates via API. Delays are tripled to reduce amount of API calls.
   * @param {Object} updatedNote - The updated note object.
   */
  const debouncedSaveNote = useDebounce((updatedNote) => {
    updateWorkspaceNote(updatedNote._id, {
      title: updatedNote.title,
      content: updatedNote.content,
    });
  }, DEBOUNCE_DELAY * 3);

  // Socket connection setup and teardown
  useEffect(() => {
    if (currentWorkspace) {
      // Fetch notes for the current workspace
      getWorkspaceNotes(currentWorkspace._id).then((notes) => {
        setNotes(notes);
      });

      // Connect to the workspace's socket room
      connectToWorkspace(currentWorkspace._id, name);

      // Set up socket listeners for real-time updates
      socket.on("note-updated", updateNotes);
      socket.on("note-created", createNote);
      socket.on("note-deleted", deleteNote);
      socket.on("update-members", updateMembers);

      // Clean up on page close or workspace change
      return () => {
        socket.emit("leave-workspace");
        disconnectSocket();
        socket.off("note-updated");
        socket.off("note-created");
        socket.off("note-deleted");
        socket.off("update-members");
      };
    }
  }, [
    currentWorkspace,
    updateNotes,
    createNote,
    deleteNote,
    updateMembers,
    name,
  ]);

  /**
   * Handles the selection of a note from the note list.
   * @param {string} noteId - The ID of the selected note.
   */
  function handleSelectNote(noteId) {
    const note = notes.find((n) => n._id === noteId);
    if (note) {
      setCurrentNote(note);
    }
  }

  /**
   * Handles changes to a note, updating local state and triggering debounced API and socket updates.
   * @param {Object} updatedNote - The updated note object.
   */
  function handleChangeNote(updatedNote) {
    // Update local state immediately
    updateNotes({
      ...updatedNote,
      updatedAt: new Date().toISOString(),
    });

    // Debounce the API call and socket emission
    debouncedSocketNoteUpdate(updatedNote);
    debouncedSaveNote(updatedNote);
  }

  /**
   * Handles the creation of a new note in the current workspace.
   */
  async function handleCreateNewNote() {
    const newNote = await createWorkspaceNote({
      workspaceId: currentWorkspace._id,
    });

    createNote(newNote);

    if (!isSocketConnected()) return;
    socket.emit("note-created", {
      workspaceId: currentWorkspace._id,
      note: newNote,
    });
  }

  /**
   * Handles the deletion of a note from the current workspace.
   * @param {string} noteId - The ID of the note to delete.
   */
  function handleDeleteNote(noteId) {
    deleteWorkspaceNote(noteId);
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
        workspace={currentWorkspace}
        members={currentWorkspaceMembers}
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
