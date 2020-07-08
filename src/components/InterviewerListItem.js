import React from "react";
import "components/InterviewerListItem.scss";
let classnames = require('classnames');

/*
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection
*/

export default function InterviewerListItem(props) {
  const interlistitemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interlistitemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}