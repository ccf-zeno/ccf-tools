import React, { PureComponent } from 'react';
import { Input } from 'antd';
import styles from './index.less';

export default class index extends PureComponent {
  render() {
    return (
      <div className={styles.box}>
        <Input />
      </div>
    );
  }
}
