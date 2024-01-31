import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import MainHeading from './MainHeading/MainHeading';
import Container from './Container/Container';
import axios from 'axios';

const apiKey = '41284992-e3e58fe867fcadc7d8005ce00';
const photosPerPage = 12;

class App extends Component {
  state = {
    gallery: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    numberOfPages: 0,
    filter: '',
  };

  handleFormSubmit = async searchInput => {
    this.setState(
      {
        filter: searchInput,
      },
      () => {
        this.getImages();
      }
    );
  };

  getImages = async (loadNextPage = false) => {
    console.log('Filter: ' + this.state.filter);
    this.setState({
      isLoading: true,
    });

    const { filter } = this.state;
    let { currentPage } = this.state;

    currentPage = loadNextPage ? currentPage + 1 : currentPage;

    try {
      const searchParams = new URLSearchParams({
        key: apiKey,
        q: filter,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: photosPerPage,
      });

      const { data } = await axios(`https://pixabay.com/api/?${searchParams}`);
      console.log('data: ', data);
      const images = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });

      if (loadNextPage) {
        this.setState(prevState => ({
          images: [...prevState.images, images],
        }));
      } else {
        this.setState({
          images,
        });
      }

      console.log('images: ', images);
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
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
    const { images } = this.state;

    return (
      <>
        <MainHeading>Image Gallery App</MainHeading>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <main>
          <section className="image-gallery-section"></section>
          <Container>
            <ImageGallery images={images} />
          </Container>
        </main>
      </>
    );
  }
}

export default App;
