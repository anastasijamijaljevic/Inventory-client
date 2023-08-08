import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar'>
        <div className='nav-logo'></div>
        <div className="nav-right">
  <ul className="nav-list">
    <li><Link to="/" className="nav-link">Home</Link></li>
    <li> <Link to="/rooms" className="nav-link">Rooms</Link></li>
    <li> <Link to="/howitworks" className="nav-link">How It Works</Link></li>
    <li> <Link to="/about" className="nav-link">About Us</Link></li>
  </ul>
</div>
    </nav>
    )
}

export default Navbar