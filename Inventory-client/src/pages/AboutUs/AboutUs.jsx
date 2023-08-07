import style from './aboutUs.module.css'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AboutUs = () =>{
    return <>
    <Navbar/>
    <div className={style.container}>
        <div className={style.hero}>
                <div className={style.rows}>
                <h1 className={style.text}>Unleash Inventory Greatness</h1>
                <Link className={style.link} to="/">Home</Link>
                </div>
                
            </div>
            
        <div className={style.contentBox}>
            <div className={style.content}>
                <h2 className={style.title}>Efficient Inventory Masters</h2>
                <h3 className={style.contentText}>We optimize warehouses like magicians and make inventory tracking feel like a breeze. Say goodbye to tangled, inefficient inventory systems!</h3>
            </div>
            <div className={style.decoration}></div>
        </div>

        <div className={style.metrics}>
            {/* <div className={style.lines}>
                <div className={style.frame}></div>
                <div className={style.frame2}></div>
                <div className={style.frame3}></div>
                <div className={style.frame4}></div>
                <div className={style.frame5}></div>
                <div className={style.frame6}></div>
            </div> */}
            <div className={style.columns}>
                <div className={style.card}>
                    <h2 className={style.number}>750</h2>
                </div>
                <div className={style.card}>
                    <p className={style.metricsText}>Wowed clients who experienced unbeatable inventory management transformations with us.</p>
                </div>
            </div>
        </div>

        <div className={style.members}>
            <div className={style.membersTitle}>
                <h2 className={style.ourwizards}>Our Wizards</h2>
                <h2 className={style.membersText}>Meet the virtuosos behind our cutting-edge solutions.</h2>
            </div>
            <div className={style.membersDiv}>
                <div className={style.page}>
                    <div className={style.image}></div>
                    <h3 className={style.memberName}>Ertan Muslić</h3>
                    <p className={style.memberDesc}>Third year software engineering student. Programming is my way to solve challenges and bring change. Besides computers, I like sports and football. Our application is the result of our creativity and teamwork, and it is just the beginning of our journey towards professional development.</p>
                </div>
                <div className={style.page2}>
                    <div className={style.image}></div>
                    <h3 className={style.memberName}>Anastasija Mijaljević</h3>
                    <p className={style.memberDesc}>Third-year software engineering student. Our joint application is the result of our hard work and dedication. Besides coding, I enjoy traveling and photography. This app is just one step in our journey to create innovative solutions.</p>
                </div>
            </div>
        </div>

        <div className={style.faq}>
            <h2 className={style.magicalqueries}>Magical Queries</h2>
            <div className={style.questionsRow}>
                <div className={style.qa}>
                    <h2 className={style.q}>How fast can we start?</h2>
                    <h2 className={style.a}>Blink your eyes twice, and we’ll be there! Ok, not that fast, but we always strive to act swiftly and efficiently.</h2>
                </div>
                <div className={style.qa}>
                    <h2 className={style.q}>How much will it cost?</h2>
                    <h2 className={style.a}>Don’t worry, we’re not a crazy expensive crew of enchanted beings! Our prices are tailored to your needs and budget.</h2>
                </div>
                <div className={style.qa}>
                    <h2 className={style.q}>Will it disrupt our work?</h2>
                    <h2 className={style.a}>Fear not, young padawan, we’ll perform our spells so smoothly that your team won’t even notice we’re there!</h2>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
}

export default AboutUs;