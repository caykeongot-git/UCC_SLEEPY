import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

const genres = ["Tất cả", "Hành Động", "Viễn Tưởng", "Kinh Dị", "Tình Cảm", "Hài Hước", "Hoạt Hình"];
const countries = ["Tất cả", "Mỹ", "Việt Nam", "Hàn Quốc", "Nhật Bản"];
const ratings = ["Tất cả", "P", "C13", "C16", "C18"];
const formats = ["Tất cả", "2D", "3D", "IMAX"];

const MovieFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    genre: "Tất cả",
    country: "Tất cả",
    rating: "Tất cả",
    format: "Tất cả",
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <div className="w-full bg-dark-800 rounded-2xl border border-dark-700 shadow-lg p-5 mb-8">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm phim, đạo diễn, diễn viên..."
            value={filters.keyword}
            onChange={(e) => handleChange("keyword", e.target.value)}
            className="w-full bg-dark-900 border border-dark-600 rounded-xl py-3 pl-12 pr-4 text-light-100 placeholder-light-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-500" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-colors font-bold ${
            isOpen ? "bg-primary-600 border-primary-500 text-white" : "bg-dark-900 border-dark-600 text-light-300 hover:text-white"
          }`}
        >
          {isOpen ? <X size={20} /> : <Filter size={20} />}
          <span className="hidden sm:inline">{isOpen ? "Đóng bộ lọc" : "Lọc nâng cao"}</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeInUp">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-light-300">Thể loại</label>
            <select
              value={filters.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              className="bg-dark-900 border border-dark-600 text-light-100 rounded-lg p-2.5 focus:outline-none focus:border-primary-500"
            >
              {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-light-300">Quốc gia</label>
            <select
              value={filters.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="bg-dark-900 border border-dark-600 text-light-100 rounded-lg p-2.5 focus:outline-none focus:border-primary-500"
            >
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-light-300">Độ tuổi</label>
            <select
              value={filters.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              className="bg-dark-900 border border-dark-600 text-light-100 rounded-lg p-2.5 focus:outline-none focus:border-primary-500"
            >
              {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-light-300">Định dạng</label>
            <select
              value={filters.format}
              onChange={(e) => handleChange("format", e.target.value)}
              className="bg-dark-900 border border-dark-600 text-light-100 rounded-lg p-2.5 focus:outline-none focus:border-primary-500"
            >
              {formats.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
