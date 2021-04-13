import React from 'react';
import HomePresenter from './HomePresenter';
import { moviesApi } from 'api';

export default class extends React.Component {
  /**
   * @property {array} state.nowPlaying - The movies currently playing 
   * @property {array} state.upcoming - The movies to be upcoming
   * @property {array} state.popular - The popluar movies
   * @property {string} state.error - The error message
   * @property {boolean} state.loading - Whether it is loaded 
   */
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
