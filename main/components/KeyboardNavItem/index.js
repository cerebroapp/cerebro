import React from 'react';
import styles from './styles.css';

export default (props) => {
  let className = styles.item;
  className += props.className ? ` ${props.className}` : '';
  const onSelect = props.onSelect || (() => {});
  const onClick = onSelect;
  const onKeyDown = (event) => {
    if (props.onKeyDown) {
      props.onKeyDown(event)
    }
    if (!event.defaultPrevented && event.keyCode === 13) {
      onSelect();
    }
  }
  const itemProps = {
    className,
    onClick,
    onKeyDown,
    tabIndex: 0,
  };
  const TagName = props.tagName ? props.tagName : 'div';
  return (
    <TagName {...props} {...itemProps} />
  )
};
