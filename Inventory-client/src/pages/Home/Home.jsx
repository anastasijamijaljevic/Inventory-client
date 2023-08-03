import './Home.css'

const Home = () => {
    return (
        <section className='homepage'>
            <nav className='navbar'>
                <div className='nav-logo'></div>
                <div className="nav-right">
          <ul className="nav-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign Up</a></li>
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