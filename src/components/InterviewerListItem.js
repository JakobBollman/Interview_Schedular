import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

//Display Interviewer Icon / name
export default function InterviewerListItem(props) {
  let liClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected === true
  });

  return (
    <li className={liClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}