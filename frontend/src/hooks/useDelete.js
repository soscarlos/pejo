
const useDelete = async(endpoint, token) => {
    await fetch(endpoint, {
        method: 'DELETE', 
        headers: { 'Authorization': 'Bearer ' + token }
      })
}

export default useDelete;