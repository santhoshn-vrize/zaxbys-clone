import fetch from 'isomorphic-unfetch';

export const fetchDataWithAuthorization = async (url, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // Adjust content-type according to your API requirements
  };

  try {
    const response = await fetch(url, {
      method: 'GET', // Change the HTTP method as needed (GET, POST, PUT, DELETE, etc.)
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};
  