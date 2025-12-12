import NameIcon from "./NameIcon";

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
