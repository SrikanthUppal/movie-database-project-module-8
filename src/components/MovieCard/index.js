import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {details} = props
  const {id, posterPath, title, voteAverage} = details
  return (
    <li className="list-item">
      <img src={posterPath} alt={title} className="poster-image" />
      <div className="poster-text">
        <h1 className="title">{title}</h1>
        <p className="rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`}>
        <button type="button" className="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
