import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
// axios data request
  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const aptmntAPI = axios.get("/api/appointments");
    const aptIntrvwr = axios.get("/api/interviewers");
    Promise.all([daysAPI, aptmntAPI, aptIntrvwr]).then(([daysRes, aptmntAPIRes, aptIntrvwrRes]) => {
      setState(function (prev) {
        return ({ ...prev, days: daysRes.data, appointments: aptmntAPIRes.data, interviewers: aptIntrvwrRes.data });
      })
    },
    )
  }, []);
 // updates selected day 
  const setDay = day => setState(prev => ({ ...prev, day }));
  
 // Book the interview appointment to the database
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updateAptData = axios.put(`/api/appointments/${id}`, { interview });
    return Promise.resolve(updateAptData)
      .then(response => {
        setState({
          ...state,
          appointments,
          days: getSpotsRemaining(state.days, appointments)
        })
      })
  }
  const spotsRemaining = (day, appointments) => {
    let freeSpots = 0;
    const spots = day.appointments;
    for (const spot of spots) {
      if (appointments[spot].interview === null) {
        freeSpots++;
      }
    }
    return freeSpots;
  };
  
//depending on booking or deleting an interview appointment spots remaining gets updated
  const getSpotsRemaining = (days, appointments) => {
    const updatedSpotsDays = days.map(day => ({
      ...day, spots: spotsRemaining(day, appointments)
    }));
    return updatedSpotsDays;
  }
  
//Remove the interview appointment from the database
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updateApt = axios.delete(`/api/appointments/${id}`);
    return Promise.resolve(updateApt)
      .then(response => {
        setState({
          ...state,
          appointments,
          days: getSpotsRemaining(state.days, appointments)
        })
      })
  };
  
// returns these functions to be used to manage the state in other components
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
