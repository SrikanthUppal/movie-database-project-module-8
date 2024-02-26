import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMovies: {},
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getUpdatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(eachMovie => ({
      id: eachMovie.id,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
      posterPath: `https://image.tmdb.org/t/p/w400${eachMovie.poster_path}`,
    })),
  })

  getPopularMovies = async (page = 1) => {
    const API_KEY = '922f8ca5c0e32fb763102ede590a5d66'
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovies: updatedData})
  }

  renderLoadingView = () => (
    <div className="loading-view">
      <Loader type="TailSpin" color="#032541" height={40} width={40} />
    </div>
  )

  renderPopularMoviesView = () => {
    const {popularMovies} = this.state
    const {results} = popularMovies

    return (
      <ul className="movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} details={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovies} = this.state
    return (
      <>
        <NavBar />
        <div className="popular-body-page">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesView()}
        </div>
        <Pagination
          totalPages={popularMovies.totalPages}
          apiCallback={this.getPopularMovies}
        />
      </>
    )
  }
}
export default Popular
