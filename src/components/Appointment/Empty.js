import React from "react";
import "./styles.scss";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
/*
Timed out retrying: cy.click() failed because this element is not visible:

<img class="appointment__add-button" src="images/add.png" alt="Add">

This element <img.appointment__add-button> is not visible because its parent <main.appointment__add> has CSS property: display: none
*/