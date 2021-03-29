import React, { PureComponent } from 'react';
import { Input } from "antd";
import styles from './index.less';

export default class index extends PureComponent {

  constructor(){
    super();
    this.state={
      value:'',
    }
  }

  onChange=(e)=>{
    this.setState({
      value:e.target.value,
    });
  }

  render() {
    const { value }=this.state;
    return (
      <div className={styles.box}>
        <Input value={value} onChange={this.onChange} />
      </div>
    );
  }
}
