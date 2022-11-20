import React from "react";

import DayListItem from "components/DayListItem";

//Displays all of the DaylistItems in a row
export default function DayList(props) {
  let daysProp = props.days;
  const listItems = daysProp.map(DLI => {
    return (
      <DayListItem
        key={DLI.id}
        name={DLI.name} 
        spots={DLI.spots}
        selected={DLI.name === props.day}
        setDay={props.setDay}  
      />)
  });

  return (
    <ul>{listItems}</ul>
  );
}
