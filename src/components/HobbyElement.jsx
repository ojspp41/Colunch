import React from "react";

function HobbyElement({ index, hobby, className }) {
  return (
    <div key={index} className={className}>
      <img src={hobby.image} alt={hobby.alt} />
      <div>{hobby.label}</div>
    </div>
  );
}

export const MemoizedHobbyElement = React.memo(HobbyElement);
export default MemoizedHobbyElement;
