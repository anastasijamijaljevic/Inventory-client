/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import './HowItWorks.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'




const HowItWorks = () => {
    return (
      <>
      <Navbar/>
<section className="how-it-works">
  <div className="how-it-works-card animate__animated animate__fadeInUp">
    <h2 className="how-it-works-card-title">How It Works</h2>
    <p>Welcome to our Inventory Management Application! Our user-friendly system allows you to efficiently manage inventory transactions while keeping everyone in the loop. Here's how it all comes together:</p>
  </div>
  <div className="how-it-works-card animate__animated animate__fadeInUp">
    <h3 className="how-it-works-card-subtitle">Explore Rooms</h3>
    <p>Discover our collection of available rooms, each stocked with various inventory items. Whether you're searching for tools, equipment, or supplies, our extensive selection has you covered. Feel free to explore the rooms and items without the need to log in.</p>
  </div>
  <div className="how-it-works-card animate__animated animate__fadeInUp">
    <h3 className="how-it-works-card-subtitle">Easy Transactions</h3>
    <p>When it's time to borrow or return items, simply log in to our application. Logging in grants you access to complete inventory management functionalities. With just a few clicks, you can select the items you need and proceed with the transaction.</p>
  </div>
  <div className="how-it-works-card animate__animated animate__fadeInUp">
    <h3 className="how-it-works-card-subtitle">Streamlined Process</h3>
    <p>Upon selecting items to borrow, the application guides you through the necessary steps. After confirming the transaction, a statement is generated detailing the transaction's specifics. This statement can be printed for your records, ensuring transparency and accountability.</p>
  </div>
  <div className="how-it-works-card animate__animated animate__fadeInUp">
    <h3 className="how-it-works-card-subtitle">Return with Ease</h3>
    <p>Returning items is just as straightforward. Log in, choose the items you're returning, and the application will walk you through the process. Again, a statement is produced after the return is confirmed, providing a clear record of the transaction.</p>
    <p>Our primary focus is efficiency, accountability, and user-friendliness. By combining the ability to explore rooms freely with the power to complete transactions upon logging in, we offer you a seamless inventory management experience. Feel confident knowing that each transaction is accompanied by a printed statement, promoting transparency and communication.</p>
    <div className="how-it-works-get-started-button animate__animated animate__fadeInUp">
     <Link to='/login' class="button-how-it-works">Get Started</Link>
    </div>
  </div>
</section>
<Footer/>
</>

    )
}

export default HowItWorks