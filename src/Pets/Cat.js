import React, { Component } from 'react'
import ApiService from '../service'
import {Link} from 'react-router-dom'

export default class Cats extends Component {
    state = {
        cats: [],
        catPos: 0
    }

    nextCat = () => {
        this.setState({ catPos: this.state.catPos + 1 })
    }

    previousCat = () => {
        this.setState({ catPos: this.state.catPos - 1 })
    }

    adoptCat = () => {
        ApiService.handleCatAdopt()
            .then(res => {
                let { cats } = this.state
                cats.shift()
                this.setState({ cats: cats })
                this.props.deletePerson()
            })
    }

    onClickEffect = () => {
        this.adoptCat()
        window.alert('Congrats! You adopted a Cat!')
        return <Link to="/"></Link> 
    }

    render() {
        const cats = this.props.cats
        const { catPos } = this.state
        let isAvailable = false
        let cat;
        
        console.log(this.state.cats)

        if (cats.length > 0) {
            cat = cats[catPos]

            if (cat.length <= 0 && this.props.isAdoptable === false && this.props.people.length <= 0) isAvailable = false
            if (this.props.isAdoptable === true) isAvailable = true
        }

        return (
            <>
                {cats.length > 0 && <div>
                <img src={cat.imageURL} alt="photograph" />
                <h3>{cat.name}</h3>
                <ul>
                    <li>Name: {cat.name}</li>
                    <li>Age: {cat.age}</li>
                    <li>Breed: {cat.breed}</li>
                    <li>Description: {cat.description}</li>
                    <li>Gender: {cat.gender}</li>
                    <li>Story: {cat.story}</li>
                </ul>

                <button onClick={this.onClickEffect} disabled={isAvailable ? false : true}>Adopt</button><br />
                <button onClick={this.previousCat} hidden={!catPos}>Previous Cat</button>
                <button onClick={this.nextCat} hidden={catPos === this.state.cats.length - 1}>Next Cat</button>
                </div>}
            </>
        )
    }
}

