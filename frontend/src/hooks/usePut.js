import { useEffect, useState } from 'react';

const usePut = async(data, endpoint) => {
    const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await res.json();
}

export default usePut;