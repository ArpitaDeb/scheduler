import React from "react";

import "components/Button.scss";
let classnames = require('classnames');

export default function Button(props) {
  console.log(props);
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
  <button
    className={buttonClass}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
  );
}
