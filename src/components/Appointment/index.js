import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  console.log("index", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((res) => res ? transition(ERROR_SAVE, true) : transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
    //transition(SHOW)
  }
  function destroy(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure?" onCancel={back} onConfirm={() => destroy(props.id)} />}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message="unable to save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="could not cancel to appointment" onClose={back} />}
    </article>
  );
}