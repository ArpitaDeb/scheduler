export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerID = interview.interviewer;
  const interviewerData = state.interviewers[interviewerID];
  return { ...interview, interviewer: interviewerData };
}
export function getInterviewersForDay(state, day) {
  let aptmnt = [];
  let intrvwrDay = [];
  for (const aptmntday of state.days) {
    if (aptmntday.name === day) {
      aptmnt = aptmntday.interviewers;
    }
  }
  if (aptmnt.length > 0) {
    for (const aptsid of Object.values(state.interviewers)) {
      if (aptmnt.includes(aptsid.id)) {
        intrvwrDay.push(aptsid);
      }
    }
  }

  return intrvwrDay;
};

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

