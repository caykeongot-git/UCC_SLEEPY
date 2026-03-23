import React from 'react';
import { useBookingStore } from './useBookingStore';

const MOCK_FB = [
  { id: 'combo1', name: 'Combo Solo', desc: '1 Bắp lớn + 1 Nước ngọt lớn', price: 85000, image: 'https://img.giftpop.vn/brand/LOTTECINEMA/MP2010230001_BASIC_origin.jpg' },
  { id: 'combo2', name: 'Combo Couple', desc: '1 Bắp lớn + 2 Nước ngọt lớn', price: 105000, image: 'https://www.giftpop.vn/upload/ckEditorFile/0/images/Untitled-2(1).jpg' },
  { id: 'popcorn', name: 'Bắp Rang Bơ', desc: 'Vị Phô Mai / Caramel', price: 60000, image: 'https://www.giftpop.vn/upload/ckEditorFile/0/images/Untitled-7.jpg' },
];

export default function FoodAndBeverage() {
  const { fbItems, updateFBItem } = useBookingStore();

  return (
    <div className="w-full glass-effect p-6 rounded-md">
      <h2 className="mb-6 border-b border-dark-700 pb-2">2. Chọn Bắp Nước</h2>
      
      <div className="flex flex-col gap-4">
        {MOCK_FB.map((item) => {
          const qty = fbItems[item.id]?.quantity || 0;
          
          return (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-dark-800 border border-dark-700 hover:border-dark-700 rounded-md transition-colors">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0 bg-dark-900" />
              <div className="flex-1">
                <h3 className="text-light-100 text-lg">{item.name}</h3>
                <p className="text-light-500 text-sm mt-1">{item.desc}</p>
                <p className="text-primary-500 font-semibold mt-2">{item.price.toLocaleString()}đ</p>
              </div>
              
              <div className="flex items-center gap-3 bg-dark-900 rounded-full p-1 border border-dark-700">
                <button 
                  onClick={() => updateFBItem(item, -1)}
                  className="w-8 h-8 rounded-full bg-dark-700 text-light-100 hover:bg-primary-500 transition-colors flex justify-center items-center font-bold text-lg"
                >-</button>
                <span className="w-5 text-center font-bold text-light-100">{qty}</span>
                <button 
                  onClick={() => updateFBItem(item, 1)}
                  className="w-8 h-8 rounded-full bg-dark-700 text-light-100 hover:bg-primary-500 transition-colors flex justify-center items-center font-bold text-lg"
                >+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}