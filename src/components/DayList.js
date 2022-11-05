import React from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  let daysProp = props.days;
  const listItems = daysProp.map(DLI => {
    return (
      <DayListItem
        key={DLI.id}
        name={DLI.name} 
        spots={DLI.spots}
        selected={DLI.name === props.value}
        setDay={props.onChange}  
      />)
  });

  return (
    <ul>{listItems}</ul>
  );
}
