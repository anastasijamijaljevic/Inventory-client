import { Link } from 'react-router-dom';
import './error404.css';


const Error404 = () =>{
    return <> 
        <div className='container'>
            <div className='hero'>
                <h1 className='title'>Oops!</h1>
                <Link className='homeButton' to="/">Home</Link>
            </div>
            <div className='hero2'>
                <div className='content'>
                    <h2 className='title2'>We’re Lost!</h2>
                    <p className='text'>Our trusty compass led us astray and we’ve landed on unknown territory. This mystical 404 realm is not the page you were searching for.</p>
                </div>
            </div>

            {/* <div className='getBack'>
                <div className='wrapper'>
                    <h2 className='title3'>Find your way back to safety!</h2>
                    <Link className='homeButton' to="/">Home</Link>
                </div>
            </div> */}

        </div>
        </>
}


export default Error404;