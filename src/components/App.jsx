import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import MainHeading from './MainHeading/MainHeading';
import Container from './Container/Container';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorInfo from './ErrorInfo/ErrorInfo';
import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '41284992-e3e58fe867fcadc7d8005ce00';
const photosPerPage = 12;

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    isLoadingNew: false,
    error: null,
    currentPage: 1,
    totalImages: 0,
    filter: '',
    selectedImage: {},
    scrollImageIndex: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.images;
    const { images, scrollImageIndex } = this.state;
    const gallery = document.querySelector('.gallery');

    if (
      prevImages.length !== images.length &&
      images.length > photosPerPage &&
      scrollImageIndex > 0
    ) {
      gallery.childNodes[scrollImageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseModalKeydown);
  }

  handleFormSubmit = async searchInput => {
    const { filter } = this.state;

    if (searchInput === filter) return;

    this.setState(
      {
        filter: searchInput,
        currentPage: 1,
      },
      () => {
        this.getImages();
      }
    );
  };

  handleButtonClick = async () => {
    this.setState(
      prevState => {
        return { currentPage: prevState.currentPage + 1, scrollImageIndex: 0 };
      },
      () => {
        this.getImages(true);
      }
    );
  };

  handleModalClick = event => {
    if (event.target.localName !== 'img') {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.setState({
      selectedImage: {},
    });

    document.removeEventListener('keydown', this.handleCloseModalKeydown);
  };

  handleImageClick = (src, tags) => {
    document.addEventListener('keydown', this.handleCloseModalKeydown);
    this.setState({
      selectedImage: { src, tags },
    });
  };

  handleCloseModalKeydown = event => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  };

  getImages = async (loadNextPage = false) => {
    const { currentPage, filter } = this.state;

    this.setState({
      isLoading: true,
      isLoadingNew: !loadNextPage,
    });

    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        page: currentPage,
        per_page: photosPerPage,
        image_type: 'photo',
        orientation: 'horizontal',
        q: filter,
      });

      const { data } = await axios(`https://pixabay.com/api/?${searchParams}`);

      this.setState({
        totalImages: data.total,
      });

      const images = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });

      if (loadNextPage) {
        this.setState(
          prevState => {
            const prevImages = [...prevState.images];

            return {
              images: [...prevImages, ...images],
              scrollImageIndex: prevImages.length,
            };
          },
          () => {
            const { images, totalImages } = this.state;

            if (images.length >= totalImages) {
              Notiflix.Notify.info("You've reached the end of search results.");
            }
          }
        );
      } else {
        this.setState(
          {
            images,
          },
          () => {
            const { images, totalImages } = this.state;
            const totalPhotos = totalImages;

            if (totalPhotos <= 0) {
              Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            } else {
              const imageString = totalPhotos === 1 ? 'image' : 'images';

              Notiflix.Notify.info(
                `Hooray! We found ${totalPhotos} ${imageString}.`
              );

              if (images.length >= totalImages) {
                Notiflix.Notify.info(
                  "You've reached the end of search results."
                );
              }
            }
          }
        );
      }
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
        isLoadingNew: false,
      });
    }
  };

  render() {
    const {
      images,
      isLoading,
      isLoadingNew,
      error,
      totalImages,
      selectedImage,
    } = this.state;

    const showLoadMoreButton = images.length > 0 && images.length < totalImages;

    return (
      <>
        <MainHeading>Image Gallery App</MainHeading>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <main>
          <section>
            <Container>
              {error && (
                <ErrorInfo>Something went wrong: {error.message}.</ErrorInfo>
              )}
              {!isLoadingNew && (
                <ImageGallery>
                  {images.map(image => {
                    const { id, webformatURL, largeImageURL, tags } = image;
                    return (
                      <ImageGalleryItem
                        key={id}
                        src={webformatURL}
                        srcLarge={largeImageURL}
                        alt={tags}
                        onClick={this.handleImageClick}
                      />
                    );
                  })}
                </ImageGallery>
              )}
              {showLoadMoreButton && (
                <Button onClick={this.handleButtonClick}>Load more</Button>
              )}
              {isLoading && <Loader />}
              {selectedImage.src && (
                <Modal
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  onClick={this.handleModalClick}
                />
              )}
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default App;
