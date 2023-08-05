import { Link } from 'react-router-dom'
import './Home.css'


const Home = () => {
    return (
        <section className='homepage'>
            <nav className='navbar'>
                <div className='nav-logo'></div>
                <div className="nav-right">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li> <Link to="/rooms" className="nav-link">Rooms</Link></li>
            <li> <Link to="/howitworks" className="nav-link">How It Works</Link></li>
            <li> <Link to="/about" className="nav-link">About Us</Link></li>
            <li> <Link to="/login" className="nav-link">Log In</Link></li>
            <li> <Link to="/register" className="nav-link">Sign Up</Link></li>
          </ul>
        </div>
            </nav>
           
            <div className="left-section">
        <h1>Debt Inventory</h1>
        <p>A simple and effective way to manage your inventory.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
      
        </section>

       
    )
}

export default Home