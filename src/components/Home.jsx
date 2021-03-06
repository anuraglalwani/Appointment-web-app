import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/Home.css";

function Home() {
  const [state, setState] = useState({
    username: "",
    doctor: "",
    description: "",
    date: "",
    time: "",
  });
  const [alert, setAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(state);
    axios
      // .post("http://localhost:5000/appointment", state)
      .post("https://appointment-webapp.herokuapp.com/appointment", state)

      .then(function (response) {
        setAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setState({
      username: "",
      doctor: "",
      description: "",
      date: "",
      time: "",
    });
  }
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  return (
    <div className="Home">
      {alert&& (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
          style={{"padding":"20px"}}
        >
          <strong>Appointment added successfully!</strong>
          <button
            type="button"
            className="btn-close alert-btn"
            data-bs-dismiss="alert"
            
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="home-header">
        <h2>Create Appointment</h2>

        <Link to="/allAppointments" className="btn btn-secondary custom-btn">
          Appointments List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <label htmlFor="doctors">Select Doctor</label>

        <select name="doctor" id="doctors" onChange={handleChange} required>
          <option value="">Choose from below</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Sam">Dr. Sam</option>
          <option value="Dr. Bob">Dr. Bob</option>
        </select>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={state.description}
            onChange={handleChange}
          />
        </div>

        <div className="date-div">
          <label htmlFor="date">Select Date </label>
          <input
            required
            type="date"
            id="date"
            name="date"
            value={state.date}
            onChange={handleChange}
          />
        </div>

        <div className="time-div">
          <label htmlFor="time">Select a time </label>
          <input
            required
            type="time"
            id="time"
            name="time"
            value={state.time}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Add Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
