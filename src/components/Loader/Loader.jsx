import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { LoaderStyled, LoaderBackground } from './styled';

class Loader extends Component {
  render() {
    return (
      <LoaderStyled>
        <LoaderBackground>
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </LoaderBackground>
      </LoaderStyled>
    );
  }
}

export default Loader;
