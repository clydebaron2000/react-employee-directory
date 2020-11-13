import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    searchCriteria: {
      name:"",
      startDate:"",
      endDate:""
    },
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    this.handleFormSubmit("default");
  }

  handleInputChange = event => {
    var updatedCriteria=this.state.searchCriteria;
    updatedCriteria[event.target.name]=event.target.value;
    this.setState({ searchCriteria: updatedCriteria});
    console.log(this.state.searchCriteria);
    // this.handleFormSubmit(event);
  };

  //uncontrolled child elements controll own data
  // controlled I controll data
  handleFormSubmit = event => {
    if(event!=="default")
    event.preventDefault();
    API.getEmployees()
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        var list=res.data.results;
        const criteria=this.state.searchCriteria;
        console.log(list,criteria);
        list=list.filter(person=>{
          const name=Object.keys(person.name).map(key=>person.name[key]).join(' ');
          const search=criteria.name;
          var out=true;
          if (search!==undefined)
            out=name.indexOf(search)!==-1;
          return out;
        })
        list=list.filter(person=>{
          const dob=new Date(person.dob.date);
          const start=new Date(criteria.startDate);
          const end=new Date(criteria.endDate);
          var out=true;
          if(!(criteria.startDate===undefined||criteria.startDate==="")){
            out=start<=dob;
          }
          if(!(criteria.endDate===undefined||criteria.endDate==="")){
            out=dob<=end;
          }
          if(!(criteria.startDate===undefined||criteria.startDate==="")&&!(criteria.endDate===undefined||criteria.endDate==="")){
            out=start<=dob && dob<=end;
          }
          return out;
        });
        list=list.sort((person1,person2)=>{
          const p1=person1.name.last;
          const p2=person2.name.last;
          return (p1>p2)?1:-1;//last name alpha
        })
        console.log(list);
        this.setState({ results: list, error: "" });
      }).catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Search Employees!</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            criteria={this.state.searchCriteria}
          />
          <SearchResults results={this.state.results} />
        </Container>
      </div>
    );
  }
}

export default Search;
