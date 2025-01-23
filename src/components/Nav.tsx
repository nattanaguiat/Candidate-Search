import { useLocation, Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;


  // TODO
  // const li = {
  //   style
  // }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Home
          </Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className={currentPage === '/search' ? 'nav-link active' : 'nav-link'}>
           Saved Candidates 
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
