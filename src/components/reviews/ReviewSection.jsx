import { useState } from "react";
import { Star, Send } from "lucide-react";

const initialReviews = [
  { id: 1, user: "Moshi", rating: 9, content: "Phim quá hay, kỹ xảo tuyệt đỉnh. Zendaya diễn xuất sắc!", date: "02/03/2024" },
  { id: 2, user: "Loan", rating: 8, content: "Cốt truyện hơi chậm đoạn đầu nhưng phần sau đánh nhau mãn nhãn.", date: "05/03/2024" },
];

const ReviewSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0 || !newContent.trim()) return;

    const review = {
      id: Date.now(),
      user: "Khách",
      rating: newRating,
      content: newContent,
      date: new Date().toLocaleDateString("vi-VN"),
    };
    
    setReviews([review, ...reviews]);
    setNewRating(0);
    setNewContent("");
  };

  return (
    <div className="w-full mt-12 bg-dark-800 p-6 md:p-8 rounded-2xl border border-dark-700 shadow-xl">
      <h3 className="text-2xl font-black text-light-100 mb-6 border-l-4 border-primary-500 pl-3">
        Đánh giá & Bình luận
      </h3>

      {/* Form Đánh giá */}
      <form onSubmit={handleSubmit} className="mb-10 bg-dark-900 p-5 rounded-xl border border-dark-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <span className="text-light-100 font-bold">Chấm điểm của bạn:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <Star
                key={star}
                size={24}
                fill={star <= (hoverRating || newRating) ? "currentColor" : "none"}
                className={`cursor-pointer transition-colors ${
                  star <= (hoverRating || newRating) ? "text-warning" : "text-dark-600"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setNewRating(star)}
              />
            ))}
          </div>
          {newRating > 0 && <span className="text-warning font-bold ml-2">{newRating}/10</span>}
        </div>

        <div className="relative">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Chia sẻ cảm nghĩ của bạn về bộ phim..."
            className="w-full bg-dark-800 border border-dark-600 rounded-xl p-4 pr-16 text-light-100 placeholder-light-500 focus:outline-none focus:border-primary-500 min-h-[100px] resize-y"
          ></textarea>
          <button 
            type="submit"
            disabled={!newRating || !newContent.trim()}
            className="absolute right-4 bottom-4 w-10 h-10 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          >
            <Send size={18} className="translate-x-0.5" />
          </button>
        </div>
      </form>

      {/* Danh sách Bình luận */}
      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-dark-900/50 rounded-xl border border-dark-700/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center text-light-100 font-bold">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <h4 className="text-light-100 font-bold">{review.user}</h4>
                  <p className="text-light-500 text-xs">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-dark-800 px-2 py-1 rounded-lg border border-warning/30">
                <Star size={14} fill="currentColor" className="text-warning" />
                <span className="text-white font-bold text-sm">{review.rating}</span>
              </div>
            </div>
            <p className="text-light-300 ml-13 leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
