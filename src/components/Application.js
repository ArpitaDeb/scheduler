import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  //console.log(props.children) setDay= {setDay(day)};
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const aptmntAPI = axios.get("/api/appointments");
    Promise.all([daysAPI, aptmntAPI]).then((all) => {
      //console.log(daysRes);
      //console.log(aptmntAPIRes);
      console.log(all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
    });
  }, [])
  const appointments = getAppointmentsForDay(state, state.day);
  //const setDays = days => setState(prev => ({ ...prev, days}));
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
            setDay= {setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */
        appointments.map(appointment => {
        return(
          <Appointment key={appointment.id} {...appointment} />
        );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
