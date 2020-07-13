import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));
  
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
        appointments,
        days: getSpotsRemaining(state.days, appointments)
      })
      
    })
    //.catch(error => console.log(error));
    //setState({...state, appointments});
  }
  const spotsRemaining = (day, appointments) => {
    console.log("spot", day);
    console.log("spots", appointments);
    let freeSpots = 0;
    let spots = day.appointments;
    console.log("sp", spots);
    for (const spot of spots) {
      if (appointments[spot].interview === null) {
        freeSpots++;
      }
    }
    console.log(freeSpots);
    return freeSpots;
  };
  const getSpotsRemaining = (days, appointments) => {
    const updatedSpotsDays = days.map(day => ({
      ...day, spots: spotsRemaining(day, appointments)
    }));
    return updatedSpotsDays;
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
        appointments,
        days: getSpotsRemaining(state.days, appointments)
      })
      })
      //.catch(error => console.log(error));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}