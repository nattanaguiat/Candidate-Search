import { useLocation, Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;


  // TODO
  // const li = {
  //   style
  // }

  return (
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a className="nav-link active" href="#"><Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Home
          </Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><Link to="/SavedCandidates" className={currentPage === '/search' ? 'nav-link active' : 'nav-link'}>
           Saved Candidates 
          </Link></a>
        </li>
      </ul>
  )
};

export default Nav;
