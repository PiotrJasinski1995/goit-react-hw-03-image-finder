import { Component } from 'react';
import UpButton from 'components/UpButton/UpButton';
import { StyledGallery } from './styled';

class ImageGallery extends Component {
  state = {
    scrollPos: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollPos } = this.state;

    this.setState({ scrollPos });
  };

  handleUpButtonClick = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  render() {
    const { children } = this.props;
    const showUpButton =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;

    return (
      <>
        <StyledGallery className="gallery">{children}</StyledGallery>
        {showUpButton && <UpButton onClick={this.handleUpButtonClick} />}
      </>
    );
  }
}

export default ImageGallery;
