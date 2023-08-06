
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'


const Home = () => {
    return (
        <section className='homepage'>
          <Navbar/>
           
            <div className="left-section">
        <h1>Debt Inventory</h1>
        <p>A simple and effective way to manage your inventory.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
      
        </section>

       
    )
}

export default Home