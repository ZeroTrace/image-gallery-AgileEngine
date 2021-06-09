const token = 'Bearer ' + localStorage.getItem('token')

const photosByPage = (_pageNumber) => {
    return new Promise((res, rej) => {
        window.axios.get(`/images?page=${_pageNumber}`, {
            headers: {Authorization: token}
        })
            .then(response => res(response.data))
            .catch(err => rej(err.response))
    })
}
const photoDetail = (_id) => {
    return new Promise((res, rej) => {
        window.axios.get(`/images/${_id}`, {
            headers: {Authorization: token}
        }).then(response => res(response.data)).catch(err => rej(err.response))
    })
}
export {
    photoDetail,
    photosByPage
}