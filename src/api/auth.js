const apiKey = process.env.VUE_APP_API_KEY

const getToken = () => {
    if (!localStorage.getItem('token')) {
        window.axios.post('/auth', {apiKey}).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
            }
        }).catch((err) => {
            alert(err.response.statusText)
            localStorage.removeItem('token')
        })
    }
}

export {
    getToken
}