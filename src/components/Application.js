import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import axios from 'axios';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  }
];
export default function Application(props) {
  //console.log(props.children) setDay= {setDay(day)};
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  console.log(day);
  useEffect(() => {
    axios
    .get(`http://localhost:8001/api/days`)
    .then((response) => setDays(response.data))
  }, [])
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
            days={days}
            day={day}
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
          console.log(appointment);
        return(
          <Appointment key={appointment.id} {...appointment} />
        );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
