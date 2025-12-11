function NameIcon({ name, size = 40 }) {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("")
    .slice(0, 2);

  const backgroundColors = [
    "#FFB6C1",
    "#FFA07A",
    "#FFD700",
    "#90EE90",
    "#87CEFA",
    "#9370DB",
    "#FF69B4",
    "#20B2AA",
    "#FF4500",
    "#2E8B57",
  ];
  const colorIndex = name.charCodeAt(0) % backgroundColors.length;
  const backgroundColor = backgroundColors[colorIndex];

  return (
    <div
      className="rounded-full flex items-center justify-center text-xl text-gray-100 font-semibold border-2 border-gray-300 select-none"
      style={{ width: size, height: size, backgroundColor }}
    >
      <h2>{initials}</h2>
    </div>
  );
}

export default NameIcon;
