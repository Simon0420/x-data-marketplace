import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Data from './components/pages/data'
import Overview from "./components/pages/overview";
import Market from "./components/pages/market";
import Service from "./components/pages/services";
import Integration from "./components/pages/integration";
import Upload from "./components/pages/upload";

//includes
import './Assets/css/default.css'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Header/>

          <Route exact path ='/' component={Homepage} />
          <Route exact path ='/data' component={Data} />
          <Route exact path ='/overview' component={Overview} />
          <Route exact path ='/market' component={Market} />
          <Route exact path ='/services' component={Service} />
          <Route exact path ='/integration' component={Integration} />
          <Route exact path ='/upload' component={Upload} />

          <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
