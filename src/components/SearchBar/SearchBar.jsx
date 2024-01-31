import { Component } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;

    event.preventDefault();
    const searchText = event.target.elements.search.value;
    console.log(searchText);
    onSubmit(searchText);
  };

  render() {
    return (
      <Styled.StyledHeader>
        <Styled.SearchFrom onSubmit={this.handleSubmit}>
          <input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <Styled.StyledButton type="submit">Search</Styled.StyledButton>
        </Styled.SearchFrom>
      </Styled.StyledHeader>
    );
  }
}

export default SearchBar;
