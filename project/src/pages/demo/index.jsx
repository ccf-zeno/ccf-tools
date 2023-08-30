import React, { Component } from 'react';
import { Button } from "antd";
import { Demo } from '@ccf/tools';
import { goToUrl } from "@ccf/funcs";

export default class index extends Component {
  changeState = (obj, callback = () => {}) => {
    this.setState(obj, callback);
  };

  onClick=()=>{
    goToUrl('/demo',{a:'122'})
  }

  render() {
    return (
      <div>
        this is demo1
        <Demo />
        <Button onClick={this.onClick}>点我</Button>
      </div>
    );
  }
}
