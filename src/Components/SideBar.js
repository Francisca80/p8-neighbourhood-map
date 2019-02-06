import React, { Component } from "react";

class SideBar extends Component {
  render() {
    const {
      SidebarActive,
      OnChangeText,
      OnClickText,
      query,
      locations
    } = this.props;

    return (
      <div className={SidebarActive ? "sidebar" : "sidebar hidden"}>
        <div className="input-wrapper">
          <input
            className="location-search"
            type="text"
            placeholder="Search Your Favorite Coffee Place"
            value={query}
            onChange={event => OnChangeText(event.target.value)}
          />
        </div>
        <ol className="location-list" role="tablist">
          {locations.map(marker => (
            <li key={marker.id} role="tab">
              <button
                className={
                  marker.isMarkerShown ? "location selected" : "location"
                }
                tabIndex="0"
                onClick={() => OnClickText(marker)}
              >
                {marker.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default SideBar;