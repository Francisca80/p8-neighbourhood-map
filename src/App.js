import React, { Component } from 'react';

import './App.css';

import * as FoursquareAPI from "./FSApi";
import Navigation from './Components/Navigation';
import SideBar from './Components/SideBar';
import Map from './Components/Map';

import { Route } from "react-router-dom";

import escapeRegExp from "escape-string-regexp";


var lat = 52.025147;
var lng = 5.07104;

class App extends Component {

  state = {
    sidebarActive: false,
    locations: [],
    query: ""
  };


  componentDidMount(){
    FoursquareAPI.getVenues(lat, lng).then(venues => {
      if (!venues) return;
      const locations = venues.map(venue => {
        return {
          id: venue.id,
          name: venue.name,
          lat: venue.location.lat,
          lng: venue.location.lng,
          formattedAddress: venue.location.formattedAddress[0],
          isMarkerShown: false
        };
      });

 
      this.setState({ locations: locations });
    });
  }


  toggleSidebar = () => {
    this.setState({ sidebarActive: !this.state.sidebarActive });
  };

  filterLocations = query => {
    const match = new RegExp(escapeRegExp(query), "i");
    return this.state.locations.filter(loc => match.test(loc.name));
  };

  updateQuery = query => {
    this.setState({ query: query });
  };

  toggleMarkerLocation = location => {
    location.isMarkerShown = !location.isMarkerShown;
    this.setState({ locations: this.state.locations });
  }


  render() {
    return (
      <div className="app">
        <Route
          path="/"
          render={() => (
            <div className="app-content">
              <SideBar
                SidebarActive={this.state.sidebarActive}
                OnChangeText={this.updateQuery}
                OnClickText={this.toggleMarkerLocation}
                query={this.state.query}
                locations={this.filterLocations(this.state.query)}
              />
              <div className="content">
                <Navigation OnToggleSidebar={this.toggleSidebar} />
                <Map
                  lat={lat}
                  lng={lng}
                  locations={this.filterLocations(this.state.query)}
                  OnMarkerClick={this.toggleMarkerLocation}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

}



export default App;
