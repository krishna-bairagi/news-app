import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <Router>
            <Navbar />
         
            <Routes>
              <Route path="/" element={<News key="home" pagesize={6} country='in' category='general' />} />
              <Route path="/business" element={<News key="business" pagesize={6} country='in' category='business' />} />
              <Route path="/entertainment" element={<News key="entertainment" pagesize={6} country='in' category='entertainment' />} />
              <Route path="/general" element={<News key="general" pagesize={6} country='in' category='general' />} />
              <Route path="/health" element={<News key="health" pagesize={6} country='in' category='health' />} />
              <Route path="/science" element={<News key="science" pagesize={6} country='in' category='science' />} />
              <Route path="/sports" element={<News key="sports" pagesize={6} country='in' category='sports' />} />
              <Route path="/technology" element={<News key="technology" pagesize={6} country='in' category='technology' />} />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}

App.propTypes = {
  // Define prop types if needed
};
