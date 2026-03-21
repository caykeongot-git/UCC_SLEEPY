import React from 'react';
import MovieCard from '../../components/movies/MovieCard';

const MoviesDiscovery = () => {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white pt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-1/4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-bold mb-6 text-blue-500 uppercase">Bộ lọc</h3>
          <p className="text-zinc-500 text-sm">Tính năng lọc đang được cập nhật...</p>
        </aside>
        <main className="flex-1 text-center">
          <h2 className="text-2xl font-bold mb-10">KHÁM PHÁ PHIM</h2>
          <p className="text-zinc-500">Chưa có kết quả tìm kiếm.</p>
        </main>
      </div>
    </div>
  );
};

export default MoviesDiscovery;