export default function NavBar() {
  return (
    <div className="w-full py-2 px-4 l flex flex-row justify-between items-center bg-slate-200 shadow-md rounded-b-xl shadow-gray-500">
      <h1 className="text-2xl font-bold">Workspaces</h1>
      <button className="flex flex-row items-center justify-center py-2 px-4 gap-2 bg-amber-600 rounded-lg hover:brightness-110 active:brightness-90 cursor-pointer">
        <p className="text-xl text-center text-gray-100 font-semibold">
          Join Workspace
        </p>
      </button>
    </div>
  );
}
