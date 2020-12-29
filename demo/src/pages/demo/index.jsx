import React, { Component } from 'react';
import * as xx from 'ccf-funcs';

export default class index extends Component {  
  changeState = (obj, callback = () => {}) => {
    this.setState(obj, callback);
  };

  render() {
    console.log(xx);
    return <div>xxx</div>;
  }
}
