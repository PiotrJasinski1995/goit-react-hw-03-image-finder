import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledImage } from './styled';

class ImageGalleryItem extends Component {
  static defaultProps = {
    src: '',
    srcLarge: '',
    alt: ',',
  };

  static propTypes = {
    src: PropTypes.string,
    srcLarge: PropTypes.string,
    alt: PropTypes.string,
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li>
        <StyledImage src={src} alt={alt} loading="lazy" />
      </li>
    );
  }
}

export default ImageGalleryItem;
