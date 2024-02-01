import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styled';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  render() {
    const { onClick, children } = this.props;

    return <StyledButton onClick={onClick}>{children}</StyledButton>;
  }
}

export default Button;
