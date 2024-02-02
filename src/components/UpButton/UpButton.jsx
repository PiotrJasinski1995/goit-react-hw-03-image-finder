import { Component } from 'react';
import PropTypes from 'prop-types';
import upArrow from '../../images/up-arrow.png';
import { StyledUpButton } from './styled';

class UpButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  handleClick = () => {
    const { onClick } = this.props;

    onClick();
  };

  render() {
    return (
      <StyledUpButton type="button">
        <img
          src={upArrow}
          alt="up arrow"
          width="50px"
          onClick={this.handleClick}
        />
      </StyledUpButton>
    );
  }
}

export default UpButton;
