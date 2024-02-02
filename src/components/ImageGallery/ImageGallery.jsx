import { Component } from 'react';
import { StyledGallery } from './styled';

class ImageGallery extends Component {
  render() {
    const { children } = this.props;

    return <StyledGallery>{children}</StyledGallery>;
  }
}

export default ImageGallery;
