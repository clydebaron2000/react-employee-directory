import axios from "axios";

var API={
  getEmployees: function() {
    return axios.get("https://randomuser.me/api/?results=100&nat=us");
  }
};
export default API;