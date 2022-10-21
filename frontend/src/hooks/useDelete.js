
const useDelete = async(endpoint) => {
    await fetch(endpoint, {
        method: 'DELETE', 
      })
}

export default useDelete;