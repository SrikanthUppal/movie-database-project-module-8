import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeInput = event => {
          onChangeSearchInput(event.target.value)
        }

        const onClickSearch = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push('/search')
        }

        return (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="input"
              value={searchInput}
              onChange={onChangeInput}
            />
            <button
              className="search-button"
              type="button"
              onClick={onClickSearch}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <h1 className="logo-name">movieDB</h1>
      </div>
      <div className="tabs-container">
        <ul className="tabs-list">
          <li className="tab-item">
            <Link to="/" className="nav-link">
              Popular
            </Link>
          </li>
          <li className="tab-item">
            <Link to="/top-rated" className="nav-link">
              Top Rated
            </Link>
          </li>
          <li className="tab-item">
            <Link to="/upcoming" className="nav-link">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}
export default withRouter(NavBar)
