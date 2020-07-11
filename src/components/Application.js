import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  //console.log(props.children) setDay= {setDay(day)};
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  function bookInterview(id, interview) {
    console.log(id, interview);
  }
  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const aptmntAPI = axios.get("/api/appointments");
    const aptIntrvwr = axios.get("/api/interviewers");
    Promise.all([daysAPI, aptmntAPI, aptIntrvwr]).then(([daysRes, aptmntAPIRes, aptIntrvwrRes]) => {
      //console.log(daysRes);
      //console.log(aptmntAPIRes);
      //console.log(all);
      //console.log(aptIntrvwr);
      //console.log(state.interviewers);
      setState(function (prev) {
        return ({ ...prev, days: daysRes.data, appointments: aptmntAPIRes.data, interviewers: aptIntrvwrRes.data });
      })
    },
    )
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  //const setDays = days => setState(prev => ({ ...prev, days}));
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
