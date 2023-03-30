import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import Gallery from './Gallery/Gallery';



class App extends Component {
  state = { query: '' };

  changeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.changeQuery} />
        <Gallery query={this.state.query} />
      </>
    );
  }
}

export default App;
