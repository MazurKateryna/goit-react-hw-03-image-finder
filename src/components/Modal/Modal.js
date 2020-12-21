import React, { Component  } from "react";
import './Modal.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closingByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closingByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  
  render() {
    return (
      <div className="Overlay" onClick={this.props.onClose}>
        <div className="Modal">
        <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    )
  }
}
