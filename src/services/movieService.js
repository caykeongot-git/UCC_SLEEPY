import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true
});

const movieService = {
  getMovies: async () => {
    try {
      const response = await api.get('/movies');
      
      // Map properties from backend schema to frontend expected fields
      return response.data.map(m => ({
        ...m,
        trailerId: m.trailer,   // Frontend uses trailerId
        duration: m.duration ? `Dự kiến: ${m.duration} phút` : "Đang cập nhật",
        cast: m.cast ? JSON.parse(m.cast) : []
      }));
    } catch (error) {
      console.error("Failed to fetch movies from backend:", error);
      return [];
    }
  },
  
  getMovieById: async (id) => {
    // Ideally we would hit /api/movies/:id, but for now we'll fetch all and find
    // This allows the detail page to still work immediately
    const movies = await movieService.getMovies();
    return movies.find(m => m.id === Number(id)) || null;
  }
};

export default movieService;