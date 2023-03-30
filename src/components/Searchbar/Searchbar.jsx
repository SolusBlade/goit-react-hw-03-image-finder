import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import icons from '../../assets/icons/script.svg';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  render() {
    return (
      <header>
        <form
          className={s.searchForm}
          id="search-form"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className={s.searchBtn}>
            <svg className={s.searchIcon} width="20" height="20">
              <use href={`${icons}#icon-search`}></use>
            </svg>
          </button>
          <input
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images..."
            className={s.searchInput}
            onChange={e => this.setState({ input: e.target.value })}
          />
        </form>
      </header>
    );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
