import './GetStarted.css'

function GetStarted () {
    return (
        <div className='getStarted-content'>
            <h2 className='text'>Get Started</h2>
            <p>Eager to change how you manage your inventory? Dive right in by signing up or logging in. Let’s conquer the inventory world together, one transaction at a time.</p>
            <div className='columns'>
            <button>
                <div className='login'>
                    Login
                </div>
            </button>
            <button className='signUp-button'>
            <div className='sign-up'>
                    Sign Up
                </div>
            </button>
            </div>
        </div>

    )
}

export default GetStarted