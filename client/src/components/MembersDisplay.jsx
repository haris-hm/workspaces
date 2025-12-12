import NameIcon from "./NameIcon";

function MembersDisplay({ members, className = "" }) {
  return (
    <div className={`flex flex-row gap-1 ${className}`}>
      {members && members.length > 0 && (
        <>
          {members.slice(0, 3).map((member, idx) => (
            <NameIcon key={idx} name={member.name} size={40} />
          ))}
          {members.length > 3 && (
            <NameIcon name={`+ ${members.length - 3}`} size={40} />
          )}
        </>
      )}
    </div>
  );
}

export default MembersDisplay;
