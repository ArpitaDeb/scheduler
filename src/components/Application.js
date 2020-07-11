import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  //console.log(props);
  //console.log(props.children) setDay= {setDay(day)};
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
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
    //.catch(error => console.log(error));
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  //q logical step is to ensure that the child can call the action with the correct data
  function bookInterview(id, interview) {
    //console.log("1st",id, interview);
    //q values copied from the existing appointment then what does id mean
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //console.log("2nd", appointment);
    //q update pattern to replace the existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log("3rd", appointments);
    
    const updateAptData = axios.put(`/api/appointments/${id}`, {interview});
    return Promise.resolve(updateAptData)
    .then(response => {
      console.log(response);
      //debugger;
      setState({
        ...state,
        appointments
      })
      
    })
    .catch(error => console.log(error));
    //setState({...state, appointments});
  }
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log("delete", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("deleteD?", appointments);
    const updateApt = axios.delete(`/api/appointments/${id}`);
    return Promise.resolve(updateApt)
    .then(response => {
      console.log(response);
      //debugger;
      setState({
        ...state,
        appointments
      })
      })
      .catch(error => console.log(error));
  }
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
        cancelInterview={cancelInterview}
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
