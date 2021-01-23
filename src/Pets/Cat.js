import React, { Component } from 'react'
import ApiService from '../service'

export default class Cats extends Component {
    state = {
        cats: [],
        catPos: 0,
        loading: true,
        adoptable: false
    }

    componentDidMount() {
        ApiService.handleGetCats()
            .then(cats => this.setState({ cats: cats, loading: false }))
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

    setAutoAdopt = () => {
        let counter = 0

        setInterval(() => {
            for (let i = 0; i < this.props.people.length; i++) {
                if (this.props.people.length >= 3) {
                    this.adoptCat()
                    this.setState({
                        adoptable: true
                    })

                    counter++
                    console.log(counter)
                }
                if (counter === 3) {
                    return this.setState({
                        adoptable: true
                    })
                } else {
                    counter = 0
                }
            }
        }, 5000)
    }

    /*componentWillUnmount(){
        const stopAutoAdopt = clearInterval(this.setAutoAdopt, 5000)
        return stopAutoAdopt
    }*/

    onClickEffect = () => {
        this.adoptCat()
        window.alert('Congrats! You adopted a Cat!')
    }

    render() {
        if (this.state.loading) return ('loading')

        const cats = this.state.cats
        const { catPos } = this.state
        const adoptable = this.state.adoptable
        const cat = cats[catPos]

        let isAvailable = false
        if (cat.length <= 0 && adoptable === false) isAvailable = false
        if (this.props.peoplePos === 0 && adoptable === true) isAvailable = true

        return (
            <div>
                {this.setAutoAdopt}
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
            </div>
        )
    }
}


