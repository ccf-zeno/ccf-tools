import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

const TooltipSingle = props => {
  const { title, style, overlayClassName, ...otherProps } = props;
  return (
    <Tooltip
      title={title}
      overlayClassName={`${styles.tooltip} ${overlayClassName}`}
      {...otherProps}
    >
      <span className={styles.singlespan} style={style}>
        {title}
      </span>
    </Tooltip>
  );
};

TooltipSingle.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};
TooltipSingle.defaultProps = {
  style: {},
};

export default TooltipSingle;
