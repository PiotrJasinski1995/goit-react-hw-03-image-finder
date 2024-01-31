import { Component } from 'react';
import * as Styled from './styled';

class MainHeading extends Component {
  render() {
    const { children } = this.props;
    return <Styled.MainHeadingStyled>{children}</Styled.MainHeadingStyled>;
  }
}

export default MainHeading;
