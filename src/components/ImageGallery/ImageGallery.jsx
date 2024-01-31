import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './styled';

class ImageGallery extends Component {
  static defaultProps = {
    images: [],
  };

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
        tags: PropTypes.string,
      })
    ),
  };

  render() {
    const { images } = this.props;

    return (
      <StyledGallery>
        {images.map(image => {
          const { id, webformatURL, largeImageURL, tags } = image;
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              srcLarge={largeImageURL}
              alt={tags}
            />
          );
        })}
      </StyledGallery>
    );
  }
}

export default ImageGallery;
