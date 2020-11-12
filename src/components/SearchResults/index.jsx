import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(person => (
        <li key={props.results.indexOf(person)} id={Object.keys(person.name).map(key=>person.name[key]).join('')} className="list-group-item">
          <div className="profile">
            <img alt="face" src={person.picture.medium} className="img-fluid" />
            <div className="details">
              <h4 className="name">{Object.keys(person.name).map(key=>person.name[key]).join(' ')}</h4>
              <p className="dob">DOB: {person.dob.date}</p>
              <p className="age">Age: {person.dob.age}</p>
              <p className="cell">Cell: {person.cell}</p>
              <p className="email">Email:{person.email}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
