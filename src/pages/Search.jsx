import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: {},
    criteria: {},
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    
  }

  handleInputChange = event => {
    var updatedCriteria=this.state.criteria;
    updatedCriteria[event.target.name]=event.target.value;
    this.setState({ criteria: updatedCriteria});
    console.log(this.state.criteria);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getEmployees()
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        var list=res.data.results;
        const criteria=this.state.criteria;
        console.log(list,criteria);
        list=list.filter(person=>{
          const name=Object.keys(person.name).map(key=>person.name[key]).join(' ');
          const search=criteria.name;
          const out=name.indexOf(search);
          console.log('name',name);
          console.log('search',search);
          console.log('out',out,typeof out);
          console.log('boolean',out!==-1,typeof -1);
          return out!==-1;
        }
        )
        console.log(list);
        this.setState({ results: list, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
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
            criteria={this.state.criteria}
          />
          <SearchResults results={this.state.results} />
        </Container>
      </div>
    );
  }
}

export default Search;
