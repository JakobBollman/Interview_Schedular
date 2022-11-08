import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import  DayList from "components/DayList";

import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function calcSpots(state, appointments){
    return state.days.map((day) => {
      if(day.name === state.day) {
        return {
          ...day, spots: day.appointments.map((id) => (appointments[id])).filter(({interview}) => { 
            return !interview
          }).length
        };
      }
      return day;
    });
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(setState({...state, appointments, days: calcSpots(state, appointments) 
    }));
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(setState(prev => ({...prev, appointments, days: calcSpots(state, appointments) 
    })))
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[]);

  return (
    <main className="layout">
      <section className="sidebar">
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
      {Object.values(dailyAppointments).map(appData => {
        const dailyInterview = getInterview(state, appData.interview);
          return (
            <Appointment
              key={appData.id}
              id={appData.id}
              time={appData.time}
              interview={dailyInterview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })
      }
      </section>
    </main>
  );
}
