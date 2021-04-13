import React from 'react';
import SearchPresenter from './SearchPresenter';
import { tvApi, moviesApi } from 'api';

export default class extends React.Component {
    /**
   * @property {array} state.movieResults - Results for movie search
   * @property {array} state.tvResults - Results for tv search
   * @property {string} state.searchTerm - Search term for movie search
   * @property {string} state.error - The error message
   * @property {boolean} state.loading - Whether it is loaded 
   */
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    loading: false,
    error: null,
  };

  /**
   * Handles form submission
   * @param event - The from event
   */
  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm(searchTerm);
    }
  };

  /**
   * Updates input Term
   * @param event - The from event
   */
  updateTerm = event => {
    const {
      target: { value: searchTerm },
    } = event;
    this.setState({
      searchTerm
    })
  };

  /**
   * search by Term
   */
  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, loading, error, searchTerm } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
