
const useDelete = async(endpoint) => {
    const res = await fetch(endpoint, {
        method: 'DELETE', 
      })    
}

export default useDelete;