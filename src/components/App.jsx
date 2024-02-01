import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import MainHeading from './MainHeading/MainHeading';
import Container from './Container/Container';
import Button from './Button/Button';
import axios from 'axios';

const API_KEY = '41284992-e3e58fe867fcadc7d8005ce00';
const photosPerPage = 12;

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalImages: 0,
    filter: '',
  };

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
        return { currentPage: prevState.currentPage + 1 };
      },
      () => {
        console.log('current page: ', this.state.currentPage);
        this.getImages(true);
      }
    );
  };

  getImages = async (loadNextPage = false) => {
    console.log('Filter: ' + this.state.filter);
    this.setState({
      isLoading: true,
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
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
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
      this.setState(
        {
          isLoading: false,
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
    const { images, totalImages } = this.state;

    const showLoadMoreButton = images.length > 0 && images.length < totalImages;
    console.log('showLoadMoreButton: ', showLoadMoreButton);

    return (
      <>
        <MainHeading>Image Gallery App</MainHeading>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <main>
          <section>
            <Container>
              <ImageGallery images={images} />
              {showLoadMoreButton && (
                <Button onClick={this.handleButtonClick}>Load more</Button>
              )}
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default App;
