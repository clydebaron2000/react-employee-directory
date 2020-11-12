import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import API from "./utils/API"
function App() {

  return ( 
  <Router> 
   <div> 
     <Navbar/>
      <Wrapper>
        <Route exact path = "/"  component = { Search }/> 
      </Wrapper> 
      <Footer/>
    </div> 
  </Router>);
}
export default App;