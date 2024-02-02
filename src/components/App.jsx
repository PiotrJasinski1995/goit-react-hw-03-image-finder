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
    //console.log('Child nodes: ', gallery.childNodes[9].getBoundingClientRect());
    console.log('ScrollImageIndex: ', scrollImageIndex);

    if (
      prevImages.length !== images.length &&
      images.length > 0 &&
      scrollImageIndex > 0
    ) {
      console.log('scrollImageIndex did update: ', scrollImageIndex);
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
        console.log('current page: ', this.state.currentPage);
        this.getImages(true);
      }
    );
    // const y = gallery.childNodes[9].getBoundingClientRect().top - 15;

    // gallery.childNodes[9].scrollTo({ top: y, behavior: 'smooth' });
  };

  handleModalClick = event => {
    if (event.target.localName !== 'img') {
      this.closeModal();
    }
  };

  closeModal = () => {
    console.log('fsdfdfDFSFSDF');
    this.setState({
      selectedImage: {},
    });

    document.removeEventListener('keydown', this.handleCloseModalKeydown);
  };

  handleImageClick = (src, tags) => {
    document.addEventListener('keydown', this.handleCloseModalKeydown);
    console.log('src: ', src);
    this.setState({
      selectedImage: { src, tags },
    });
  };

  handleCloseModalKeydown = event => {
    console.log('DFAFSF');
    console.log(event);
    if (event.code === 'Escape') {
      console.log('AAAAAAAAAA');
      this.closeModal();
    }
  };

  getImages = async (loadNextPage = false) => {
    console.log('Filter: ' + this.state.filter);
    this.setState({
      isLoading: true,
      isLoadingNew: !loadNextPage,
    });

    const { currentPage, filter } = this.state;
    console.log('current_page', currentPage);

    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        page: currentPage,
        per_page: photosPerPage,
        image_type: 'photo',
        orientation: 'horizontal',
        q: filter,
        // safesearch: true,
      });

      const datas = await axios(`https://pixabay.com/api/?${searchParams}`);
      // console.log('axios data: ', datasss);
      // const datass = await fetch(`https://pixabay.com/api/?${searchParams}`);
      // const datas = await datass.json();

      console.log('datas: ', datas);
      const { data } = datas;
      console.log(`https://pixabay.com/api/?${searchParams}`);
      console.log('data: ', data);

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

      console.log('images: ', images);

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
            console.log('totalImages: ', totalImages);

            if (images.length >= totalImages) {
              Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
              );
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
                  "We're sorry, but you've reached the end of search results."
                );
              }
            }
          }
        );
      }

      console.log('images: ', images);
    } catch (error) {
      this.setState(
        {
          error,
        },
        () => {
          console.log('ERROR: ', error);
        }
      );
    } finally {
      this.setState(
        {
          isLoading: false,
          isLoadingNew: false,
        },
        () => {
          console.log('Final data: ', this.state.images);
        }
      );
    }
  };

  // async componentDidMount() {
  //   console.log('DidMount');
  //   await this.getImages();
  // }

  // async componentDidUpdate() {
  //   console.log('DidUpdate');
  //   await this.getImages();
  // }

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
