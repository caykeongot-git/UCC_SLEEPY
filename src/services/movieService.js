const mockMovies = [
  {
    id: 1,
    title: "AVATAR: LỬA VÀ TRO TÀN",
    // Sử dụng link ảnh chất lượng cao nhất từ Youtube
    poster: "https://img.youtube.com/vi/xAVri1ZrnNM/maxresdefault.jpg",
    trailerId: "xAVri1ZrnNM",
    description: "Jake Sully và Neytiri phải đối mặt với một bộ tộc Na'vi mới hung tợn - tộc Người Tro - trong cuộc chiến sinh tồn khốc liệt nhất trên Pandora. Đạo diễn James Cameron hứa hẹn sẽ đưa khán giả vào những vùng đất chưa từng được khám phá.",
    format: "IMAX | 3D | 2D",
    genre: "Hành Động | Viễn Tưởng",
    duration: "Dự kiến: 19.12.2025",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"]
  }
];

const movieService = {
  getMovies: async () => mockMovies,
  getMovieById: async (id) => mockMovies.find(m => m.id === Number(id)) || mockMovies[0]
};

export default movieService;