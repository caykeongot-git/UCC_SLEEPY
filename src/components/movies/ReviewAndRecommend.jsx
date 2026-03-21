import React, { useState } from 'react';

const ReviewAndRecommend = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="mt-16 border-t border-zinc-900 pt-10">
      <h3 className="text-2xl font-bold mb-6 text-blue-500">ĐÁNH GIÁ PHIM</h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-zinc-700'}`}
          >★</button>
        ))}
      </div>
      <textarea 
        className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-white"
        placeholder="Nhập cảm nhận của bạn..."
      />
    </div>
  );
};

export default ReviewAndRecommend;