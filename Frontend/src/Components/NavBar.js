import {  Link } from "react-router-dom";

function NavBar() {

    return (
        <div >
          <ul className='ul'>
          <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
  
          </ul>

      </div>
    );
}

export default NavBar;
