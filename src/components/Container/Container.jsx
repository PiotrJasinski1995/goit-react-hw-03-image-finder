import { Component } from 'react';
import { StyledContainer } from './styled';

class Container extends Component {
  render() {
    const { children } = this.props;

    return <StyledContainer>{children}</StyledContainer>;
  }
}

export default Container;
