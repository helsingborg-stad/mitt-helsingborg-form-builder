import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Icon.css';

interface Props {
  className?: string;
  [x: string]: any;
}

const Icon: React.FC<Props> = ({ children, className, ...other }) => {
  return <i className={cn('nestable-icon', className)} {...other} />;
};

Icon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Icon;
