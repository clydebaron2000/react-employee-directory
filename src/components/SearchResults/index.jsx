import React, { useEffect, useState } from "react";
import "./style.css";

function SearchResults(props) {
  const [filteredList,setfilteredList]=useState(props.results);
  const [sortedList,setSortedList]=useState(filteredList);
  // const [lastnameDirection,setLastnameDirection]=useState(1);
  // const [firstnameSortDirection,setFirstnameDirection]=useState(1);
  // const [ageSortDirection,setAgeDirection]=useState(1);
  const [sort,setsort]=useState("last");
  function sortby(event){
    event.preventDefault();
    console.log('sortstate',sort);
    setsort(event.target.name);
    sortTable(sort);
  }
  function sortTable(sort){
    switch(sort){
      case "last": 
      console.log("l");
      setSortedList(props.results.sort((p1,p2)=>{
  return (p1.name.last!==p2.name.last)?((p1.name.last>p2.name.last)?1:-1):0;
      }));
      break;
      case "first": 
      console.log("f");
      setSortedList(props.results.sort((p1,p2)=>{
  return (p1.name.first!==p2.name.first)?((p1.name.first>p2.name.first)?1:-1):0;
      }));
      break;
      case "age": 
      console.log("a");
      setSortedList(props.results.sort((p1,p2)=>{
        const age1=parseInt(p1.dob.age);
        const age2=parseInt(p2.dob.age);
  return (age1===age2)?0:((age1>age2)?1:-1);
      }));
      break;
      default:
        console.log("default");
    }
  }
useEffect(function(){
sortTable(sort);
setsort(".");
  console.log(props.results);
},[sort,props.results]);

  return (
    <table>
      <thead>
      <tr>
        <th>Picture</th>
        <th>Title</th>
        <th><a href="#last" name="last" onClick={sortby}>Last</a></th>
        <th><a href="#first" name="first" onClick={sortby}>First</a></th>
        <th>DOB</th>
        <th><a href="#age" name="age" onClick={sortby}>Age</a></th>
        <th>Cell</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>

      {sortedList.map(person=>(
          <tr className="profile" key={person.login.uuid} >
            <td>
                <img alt="face" src={person.picture.medium} className="img-fluid" />
            </td>
            <td>
              <p className="title">{person.name.title}</p>
            </td>
            <td>
              <p className="last">{person.name.last}</p>
            </td>
            <td>
              <p className="first">{person.name.first}</p>
            </td>
            <td>
              <p className="dob">{`${new Date(person.dob.date).getMonth()}/${new Date(person.dob.date).getDay()}/${new Date(person.dob.date).getFullYear()}`}</p>
            </td>
            <td>
              <p className="age">{person.dob.age}</p>
            </td>
            <td>
              <p className="cell">{person.cell}</p>
            </td>
            <td>
              <p className="email">{person.email}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


    
  );
}

export default SearchResults;
