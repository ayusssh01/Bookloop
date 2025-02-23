export const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`https://api.example.com/${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  