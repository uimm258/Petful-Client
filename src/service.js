import config from '../src/config'

const ApiService = {
    handleGetDogs() {
        return fetch(`${config.API_ENDPOINT}/dogs`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    handleGetCats() {
        return fetch(`${config.API_ENDPOINT}/cats`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    handleGetPeople() {
        return fetch(`${config.API_ENDPOINT}/people`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    handleDogAdopt() {
        return fetch(`${config.API_ENDPOINT}/dogs`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
            })
    },

    handleCatAdopt() {
        return fetch(`${config.API_ENDPOINT}/cats`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
            })
    },

    handleAddPerson(newName) {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({person: newName}),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
    },

    handleDeletePerson() {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
    }
}

export default ApiService