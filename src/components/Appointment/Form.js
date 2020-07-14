import React, { useState } from "react";
import Button from "../../components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  //console.log(props);
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  function reset() {
    setName("");
    setInterviewer(null)
  }
  function cancel() {
    props.onCancel();
    reset()
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          /*
            form component where the buttons are Kevin used:
            {interviewer && name ?
            <Button confirm onClick={save}>Save</Button> :
            <Button confirm disabled onClick={save}>Save</Button>
          }
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
         
        </section>
      </section>
    </main>
  )
}
/* 
         {interviewer && name ?
              <Button confirm disabled onClick={() => props.onSave()}>Save</Button>
          } 
          */