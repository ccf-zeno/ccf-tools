import React, { Component } from 'react';

export default class index extends Component {
  changeState = (obj, callback = () => {}) => {
    this.setState(obj, callback);
  };

  render() {
    return <div>xxc</div>;
  }
}
