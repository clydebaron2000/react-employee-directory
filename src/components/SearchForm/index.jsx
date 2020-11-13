import React from "react";
import "./style.css";

function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
      <label htmlFor="name">Name:</label>
        <input
          value={props.criteria.name}
          onChange={props.handleInputChange}
          name="name"
          type="text"
          className="form-control"
          placeholder="type a name"
          id="name"
        />
        <label htmlFor="dateRange">DOB Range:</label>
        <div id="daterange">
        <input value={props.criteria.startDate}
          onChange={props.handleInputChange}id="startDate"name="startDate" type="date"></input>
        -
        <input value={props.criteria.endDate}
          onChange={props.handleInputChange}id="endDate"name="endDate" type="date"></input>
        </div>
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
