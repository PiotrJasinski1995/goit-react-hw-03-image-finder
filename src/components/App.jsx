import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
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

  handleFromSubmit = async searchInput => {
    this.setState(
      {
        filter: searchInput,
      },
      this.getImages
    );

    // await this.getImages();
  };

  getImages = async () => {
    console.log('Filter: ' + this.state.filter);
    this.setState({
      isLoading: true,
    });

    const { currentPage, filter } = this.state;

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

      const data = await axios(`https://pixabay.com/api/?${searchParams}`);
      console.log(data);
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

  async componentDidMount() {
    console.log('DidMount');
    await this.getImages();
  }

  // async componentDidUpdate() {
  //   console.log('DidUpdate');
  //   await this.getImages();
  // }

  render() {
    return <SearchBar onSubmit={this.handleFromSubmit} />;
  }
}

export default App;
