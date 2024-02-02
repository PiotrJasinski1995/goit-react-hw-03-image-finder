import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledModalOverlay, StyledImage } from './styled';

class Modal extends Component {
  static defaultProps = {
    src: '',
    alt: '',
  };

  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { src, alt, onClick } = this.props;

    return (
      <StyledModalOverlay onClick={onClick}>
        <StyledImage src={src} alt={alt} />
      </StyledModalOverlay>
    );
  }
}

export default Modal;
