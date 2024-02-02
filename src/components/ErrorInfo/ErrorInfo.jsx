import { Component } from 'react';
import { StyledErrorParagraph } from './styled';

class ErrorInfo extends Component {
  render() {
    const { children } = this.props;

    return <StyledErrorParagraph>{children}</StyledErrorParagraph>;
  }
}

export default ErrorInfo;
