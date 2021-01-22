import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import background from '../images/background.jpg'
import './Dashboard.css'

class Dashboard extends Component {
    render(){
        return(
            <div>
                <p>Welcome to Petful, a pet's adoption center. Once you adopt a pet from Petful, it will quickly become a part of your family. If you are thinking of adopting a pet, you might consider choosing a dog or a cat. Dogs and cats can bring lots of happy times to a family, and they can be excellent companions for a person who lives alone or someone who has lost a loved one. The current dog and cat up for adoption will be displayed on the next screen along with a list of people waiting to adopt.</p>
                
                <br />

                <img src={background} alt="background"/>

                <h4>Please read the following adoption instructions:</h4>
                <p>1. Please enter your name if you are interested in adopting any pets. Your name will be automatically added to the waiting list.</p>
                <p>2. When your name appears on the top of the list, you will have access to adopt pets from the selection boxes. Please note that you may only adopt either the cat or dog that is currently up for adoption.</p>
                <p>3. All pets are first come and first up to adoption. All rights served @ Petful.</p>

                <br />

                <h3>Click{' '}
                    <Link className="adopt" to="/adopt">Adopt</Link>{' '}
                    to start!
                </h3>

            </div>
        )
    }

}

export default Dashboard