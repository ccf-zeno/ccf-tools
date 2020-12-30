/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Tooltip } from 'ccf-tools';
import { checkEmail } from 'ccf-funcs';
import 'ccf-tools/dist/index.css';
import styles from './index.less';

export default class index extends Component {
  render() {
    return (
      <div className={styles.box}>
        <Tooltip title="爱测试心意爱测试心意爱试心意爱测试心意爱测试心意爱测" />
      </div>
    );
  }
}
