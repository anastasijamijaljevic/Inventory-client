
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
      <>
        <section className='homepage'>
          <Navbar/>
           
            <div className="left-section">
        <h1>Debt Inventory</h1>
        <p>A simple and effective way to manage your inventory.</p>
       <Link to = '/howitworks'  className="get-started-btn">Get Started</Link>
      </div>
      
        </section>

<Footer/>
       </>
    )
}

export default Home