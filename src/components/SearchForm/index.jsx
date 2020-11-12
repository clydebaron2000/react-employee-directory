import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
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
         <label htmlFor="age">Age:</label>
        <input
          value={props.criteria.age}
          onChange={props.handleInputChange}
          name="age"
          type="number"
          className="form-control"
          placeholder="select an age"
          id="age"
        />
  
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
