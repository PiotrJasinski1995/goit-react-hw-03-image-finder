import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, SearchFrom, StyledButton } from './styled';

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;

    event.preventDefault();
    const searchText = event.target.elements.search.value;

    if (!searchText) return;

    onSubmit(searchText);
  };

  render() {
    return (
      <StyledHeader>
        <SearchFrom onSubmit={this.handleSubmit}>
          <input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <StyledButton type="submit">Search</StyledButton>
        </SearchFrom>
      </StyledHeader>
    );
  }
}

export default SearchBar;
