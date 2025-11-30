export default function NavBar() {
  return (
    <div className="w-full py-2 px-4 l flex flex-row justify-between border-b-2 border-gray-700">
      <h1 className="text-2xl font-bold">Workspaces</h1>
      <button className="flex flex-row items-center gap-2 bg-blue-800 rounded-lg border-blue-700 py-2 px-4 text-gray-100 font-semibold hover:brightness-110 active:brightness-90 cursor-pointer">
        New Note <img src="icons/plus-circle.svg" className="w-5 h-5" />
      </button>
    </div>
  );
}
