import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component {
  state = { isActive: false };

  toggleButton = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const { OnToggleSidebar } = this.props;

    return (
      <div className="navigation">
        <button
          className="sidebarLink"
          onClick={() => this.toggleButton() || OnToggleSidebar()}
        >
          <FontAwesomeIcon icon={this.state.isActive ? faArrowLeft : faBars} />
        </button>
        <div className="title">Where to find Coffee in Nieuwegein</div>
      </div>
    );
  }
}

export default Navigation;