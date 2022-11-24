import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const EDIT = "EDIT";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//Appointment component that creates all the component changing logic 
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  

  function ondelete() {

    transition(DELETE, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

   }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={(student, interviewer) => save(student, interviewer)}
          onCancel={back}
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
      />)}
      {mode === EDIT && 
        (<Form
          onSave={(student, interviewer) => save(student, interviewer)}
          onCancel={back}
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
      />)}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETE && <Status message="Deleting..."/>}

      {mode === ERROR_DELETE && (
        <Error 
          message="Could Not Delete Appointment."
          onClose={back}  
      />)}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could Not Save Appointment."
          onClose={back}  
      />)}
      {mode === CONFIRM && (
      <Confirm 
        message="Delete the Appointment?"
        interviewer={props.interview && props.interview.interviewer.id}
        onConfirm={ondelete} 
        onCancel={back}
      />)}
    </article>
  );
}