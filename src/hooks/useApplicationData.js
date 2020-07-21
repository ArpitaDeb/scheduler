import { useReducer, useEffect } from "react";
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, day: action.day
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      console.log(appointment, getSpotsRemaining(state.days, appointments));
      return {
        ...state,
        appointments,
        days: getSpotsRemaining(state.days, appointments)
      }
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
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

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // updates selected day 
  const setDay = day => dispatch(({ type: SET_DAY, day }));

  // axios data request
  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const aptmntAPI = axios.get("/api/appointments");
    const aptIntrvwr = axios.get("/api/interviewers");
    Promise.all([daysAPI, aptmntAPI, aptIntrvwr])
      .then(([daysRes, aptmntAPIRes, aptIntrvwrRes]) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: daysRes.data,
          appointments: aptmntAPIRes.data,
          interviewers: aptIntrvwrRes.data
        });
      });
  }, []);

  // Book the interview appointment to the database  
  function bookInterview(id, interview) {
    const updateAptData = axios.put(`/api/appointments/${id}`, { interview });
    return Promise.resolve(updateAptData)
      .then(response => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      });
  }

  //Remove the interview appointment from the database
  const cancelInterview = (id) => {
    const updateApt = axios.delete(`/api/appointments/${id}`);
    return Promise.resolve(updateApt)
      .then(response => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        });
      });
  };

  // returns these functions to be used to manage the state in other components
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
