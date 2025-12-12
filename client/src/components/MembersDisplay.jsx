import NameIcon from "./NameIcon";

/**
 * A component constructing a display of member icons with a limit.
 * @param {Object} props - The component props.
 * @param {Array} props.members - The array of member objects to display.
 * @param {number} props.limit - The maximum number of member icons to display.
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The rendered MembersDisplay component.
 */
function MembersDisplay({ members, limit, className = "" }) {
  return (
    <div className={`flex flex-row gap-1 ${className}`}>
      {members && members.length > 0 && (
        <>
          {members.slice(0, limit).map((member, idx) => (
            <NameIcon key={idx} name={member.name} size={40} />
          ))}
          {members.length > limit && (
            <NameIcon name={`+ ${members.length - 3}`} size={40} />
          )}
        </>
      )}
    </div>
  );
}

export default MembersDisplay;
