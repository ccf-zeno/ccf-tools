import React, { Component } from 'react';
import { Input } from 'antd';
import styles from './index.less';
// import 'antd/dist/antd.css';

export default class index extends Component {
  render() {
    return (
      <div className={styles.box}>
        <Input />
      </div>
    );
  }
}
