import config from '../config'

const FoldersApiServices = {
       postFolder(folderId) {
        return fetch(`${config.API_ENDPOINT}/api/folders`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(folderId),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    } 
}
export default FoldersApiServices;