import { Component } from 'react';
import { MainHeadingStyled } from './styled';

class MainHeading extends Component {
  render() {
    const { children } = this.props;

    return <MainHeadingStyled>{children}</MainHeadingStyled>;
  }
}

export default MainHeading;
