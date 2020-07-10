export function getInterview(state, interview) {
  
  console.log(interview);
  console.log(state.interviewers);
  if (!interview) return null;
  const interviewerID = interview.interviewer;
  const interviewerData = state.interviewers[interviewerID];
  return {...interview, interviewer: interviewerData};
}

export function getAppointmentsForDay(state, day) {
  let aptmnt = [];
  let aptmntvalue = [];
  for (const aptmntday of state.days) {
    if (aptmntday.name === day) {
      aptmnt = aptmntday.appointments;
    }
  }
  if (aptmnt.length > 0) {
    for (const aptsid of Object.values(state.appointments)) {
      if (aptmnt.includes(aptsid.id)) {
        aptmntvalue.push(aptsid);
      }
    }
  }

  return aptmntvalue;
};
/*let theState = [];
for (let days of state.days) {
  if (days.name === day) {
    theState = days.appointments;
  }
}
let daysAppointments = [];
if (theState.length > 0) {
  for (let appointment of theState) {
    daysAppointments.push(state.appointments[appointment]);
  }
}
return daysAppointments;
};
*/
//
/*
let aptmnt = [];
let aptmntvalue = [];
for (const aptmntday of state.days) {
  if (aptmntday.name === day) {
    aptmnt = aptmntday.appointments;
  }
}
if (aptmnt.length > 0) {
  for (const aptmntid of aptmnt) {
    aptmntvalue.push(state.appointments[aptmntid]);
  }
}

  return aptmntvalue;
};
*/
