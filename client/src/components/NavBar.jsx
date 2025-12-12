import MembersDisplay from "./MembersDisplay";

function NavBar({ workspace, members, onOpenModal }) {
  return (
    <div className="w-full py-2 px-4 l flex flex-row justify-between items-center bg-slate-200 shadow-md rounded-b-xl shadow-gray-500">
      <h1 className="text-2xl font-bold select-none">Workspaces</h1>
      <h1 className="text-2xl font-bold select-none max-md:hidden">
        {workspace?.name}
      </h1>
      <div className="flex flex-row items-center gap-2">
        <MembersDisplay members={members} className="max-md:hidden" />
        <button
          className="flex flex-row items-center justify-center py-2 px-4 gap-2 bg-amber-600 rounded-lg hover:brightness-110 active:brightness-90 cursor-pointer"
          onClick={() => {
            onOpenModal();
          }}
        >
          <p className="max-md:hidden text-xl text-center text-gray-100 font-semibold">
            New Workspace
          </p>
          <img
            src="/icons/folder-plus.svg"
            alt="New Workspace"
            className="md:hidden size-6"
          />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
