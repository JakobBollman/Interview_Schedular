import React from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  let liClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected === true
  });

  let pName = '';
  if(props.selected === true){
    pName = props.name;
  }
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