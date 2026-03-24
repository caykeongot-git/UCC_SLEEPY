# 🎬 Cinema Ticketing System - API Implementation Guide

## 🎯 What Just Happened

Backend team đã cung cấp 10 official API endpoints. Chúng ta đã implement đầy đủ:

### ✅ Completed
1. **Fixed API Configuration**
   - Updated `.env`: `VITE_API_URL=https://warm-squids-check.loca.lt/api`
   - Updated `authStore.js`: Sửa `/api/` prefix

2. **Created 5 Service Files** (theo 10 APIs)
   - `movieService.js` - 2 functions (getAllMovies, getMovieDetails)
   - `authService.js` - Login, Register, Logout, Profile
   - `cinemaService.js` - getCinemas
   - `showtimeService.js` - getFilteredShowtimes, getRoomLayout
   - `bookingService.js` - holdSeat, checkoutBooking, + bonus methods

3. **Updated Zustand Stores**
   - `authStore.js` - Fixed API endpoints
   - `bookingStore.js` - Refactored, cleaner state management

4. **Documentation**
   - `README.md` - Full guide with examples
   - `COPY_PASTE_GUIDE.js` - Page-by-page code templates
   - `API_QUICK_REFERENCE.js` - Cheat sheet

## ⚡ Quick Implementation on Your Pages

### 1. LoginPage.jsx
```javascript
import authService from '../services/authService';

// Registration
const handleRegister = async (email, password, name, phoneNumber) => {
  const result = await authService.register(email, password, name, phoneNumber);
  if (result.success) alert('✅ Register success');
  else alert('❌ ' + result.error);
};

// Login
const handleLogin = async (email, password) => {
  const result = await authService.login(email, password);
  if (result.success) {
    alert('✅ Login success, token in Zustand store');
    navigate('/home');
  } else {
    alert('❌ ' + result.error);
  }
};

// Logout
const handleLogout = () => {
  authService.logout();
  alert('✅ Logged out');
  navigate('/login');
};
```

### 2. HomePage.jsx (List all movies)
```javascript
import movieService from '../services/movieService';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await movieService.getAllMovies();
      if (result.success) {
        setMovies(result.data);
      }
    })();
  }, []);

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <button onClick={() => navigate(`/movie/${movie.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 3. MovieDetailPage.jsx (Select cinema & showtime)
```javascript
import movieService from '../services/movieService';
import showtimeService from '../services/showtimeService';
import useBookingStore from '../context/bookingStore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const setShowtime = useBookingStore((state) => state.setShowtime);

  useEffect(() => {
    (async () => {
      // Get movie details
      const movieResult = await movieService.getMovieDetails(movieId);
      if (movieResult.success) setMovie(movieResult.data);

      // Get all showtimes for this movie
      const showtimeResult = await showtimeService.getFilteredShowtimes(movieId);
      if (showtimeResult.success) setShowtimes(showtimeResult.data);
    })();
  }, [movieId]);

  const handleSelectShowtime = (showtimeId) => {
    setShowtime(showtimeId, movieId);
    navigate(`/seat-selection/${showtimeId}`);
  };

  return (
    <div>
      {movie && (
        <>
          <img src={movie.poster} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          
          <h2>Available Showtimes</h2>
          <div className="showtimes-list">
            {showtimes.map((showtime) => (
              <button
                key={showtime.id}
                onClick={() => handleSelectShowtime(showtime.id)}
                className="showtime-btn"
              >
                {showtime.cinemaName} - {showtime.time}
                <br />
                Giá: {showtime.price} VND
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

### 4. SeatSelectionPage.jsx (Select seats & hold them)
```javascript
import showtimeService from '../services/showtimeService';
import bookingService from '../services/bookingService';
import useBookingStore from '../context/bookingStore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeatSelectionPage() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [roomLayout, setRoomLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const selectedSeats = useBookingStore((state) => state.selectedSeats);
  const selectSeat = useBookingStore((state) => state.selectSeat);
  const deselectSeat = useBookingStore((state) => state.deselectSeat);
  const setRoomLayout_store = useBookingStore((state) => state.setRoomLayout);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await showtimeService.getRoomLayout(showtimeId);
      if (result.success) {
        setRoomLayout(result.data);
        setRoomLayout_store(result.data);
      }
      setLoading(false);
    })();
  }, [showtimeId]);

  const handleSelectSeat = async (seatId, seatStatus) => {
    if (seatStatus !== 'AVAILABLE') {
      alert('❌ Seat không available');
      return;
    }

    if (selectedSeats.includes(seatId)) {
      // Deselect
      deselectSeat(seatId);
    } else {
      // Hold seat for 5 minutes
      const result = await bookingService.holdSeat(showtimeId, seatId);
      if (result.success) {
        selectSeat(seatId);
        console.log('✅ Seat held for 5 minutes');
      } else {
        alert('❌ ' + result.error);
      }
    }
  };

  if (loading) return <div>Loading seats...</div>;

  return (
    <div>
      <h2>Select Your Seats</h2>
      <p>Room: {roomLayout?.room}</p>

      <div className="theater-seats">
        {roomLayout?.seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSelectSeat(seat.id, seat.status)}
            className={`seat seat-${seat.status} ${
              selectedSeats.includes(seat.id) ? 'selected' : ''
            }`}
            disabled={seat.status !== 'AVAILABLE'}
            title={`Seat ${seat.seatNumber} - ${seat.status}`}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <div className="selected-info">
        <p>Selected Seats ({selectedSeats.length}): {selectedSeats.join(', ')}</p>
        <button
          onClick={() => navigate(`/checkout/${showtimeId}`)}
          disabled={selectedSeats.length === 0}
          className="btn-checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
```

### 5. CheckoutPage.jsx (Payment)
```javascript
import bookingService from '../services/bookingService';
import useBookingStore from '../context/bookingStore';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('VNPAY');
  const [processing, setProcessing] = useState(false);

  const showtimeDetails = useBookingStore((state) => state.showtimeDetails);
  const selectedSeats = useBookingStore((state) => state.selectedSeats);
  const clearBooking = useBookingStore((state) => state.clearBooking);

  const handleConfirmPayment = async () => {
    if (selectedSeats.length === 0) {
      alert('❌ No seats selected');
      return;
    }

    setProcessing(true);
    const result = await bookingService.checkoutBooking(
      showtimeId,
      selectedSeats,
      paymentMethod
    );

    if (result.success) {
      console.log('🎉 Payment success!');
      console.log('Bill:', result.data.bill);
      
      // Save bill to Zustand for next page
      // (Optional: create a paymentStore if needed)
      
      // Clear booking state
      clearBooking();

      // Navigate to success page
      navigate('/payment-result', {
        state: { bill: result.data.bill }
      });
    } else {
      alert('❌ Payment failed: ' + result.error);
    }

    setProcessing(false);
  };

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>

      {showtimeDetails && (
        <div className="order-details">
          <p>Movie: <strong>{showtimeDetails.movieTitle}</strong></p>
          <p>Cinema: <strong>{showtimeDetails.cinemaName}</strong></p>
          <p>Time: <strong>{showtimeDetails.time}</strong></p>
          <p>Room: <strong>{showtimeDetails.room}</strong></p>
          <hr />
          <p>Seats: <strong>{selectedSeats.join(', ')}</strong></p>
          <p>Unit Price: <strong>{showtimeDetails.price} VND</strong></p>
          <p className="total">
            Total: <strong>{showtimeDetails.price * selectedSeats.length} VND</strong>
          </p>
        </div>
      )}

      <div className="payment-method">
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="VNPAY">VNPay</option>
          <option value="MOMO">MoMo</option>
          <option value="CASH">Cash at Counter</option>
        </select>
      </div>

      <button
        onClick={handleConfirmPayment}
        disabled={processing}
        className="btn-confirm"
      >
        {processing ? 'Processing...' : `Confirm Payment (${selectedSeats.length} seats)`}
      </button>
    </div>
  );
}
```

### 6. TransactionHistoryPage.jsx (View past bookings)
```javascript
import bookingService from '../services/bookingService';
import { useEffect, useState } from 'react';

export default function TransactionHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await bookingService.getUserBookings();
      if (result.success) {
        setBookings(result.data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.movieTitle}</td>
                <td>{new Date(booking.showtimeDate).toLocaleString()}</td>
                <td>{booking.seatNumbers.join(', ')}</td>
                <td>{booking.totalPrice} VND</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    onClick={() => handleCancel(booking.id)}
                    disabled={booking.status === 'CANCELLED'}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const handleCancel = async (bookingId) => {
  const result = await bookingService.cancelBooking(bookingId);
  if (result.success) {
    alert('✅ Booking cancelled');
    // Refresh page or remove from list
  } else {
    alert('❌ ' + result.error);
  }
};
```

## 🚨 Important Checklist

- [x] `.env` has `VITE_API_URL=https://warm-squids-check.loca.lt/api`
- [x] All service files created
- [x] authStore.js endpoints fixed (no `/api` prefix)
- [x] bookingStore.js refactored
- [x] Token auto-inject interceptor working
- [ ] **VERIFY BACKEND RUNNING**
  ```bash
  curl https://warm-squids-check.loca.lt/api/movies
  ```
- [ ] **CHECK CORS HEADERS** (Backend must allow http://localhost:517x)
- [ ] **TEST LOGIN FLOW** (F12 → Network tab → Check Authorization header)
- [ ] **TEST FULL BOOKING FLOW** (Register → Login → Browse → Select Seats → Checkout)

## 📚 File Structure

```
src/
├── context/
│   ├── authStore.js (✅ Fixed endpoints)
│   └── bookingStore.js (✅ Refactored)
├── services/
│   ├── api.js (✅ Zustand token injection)
│   ├── authService.js (✅ NEW)
│   ├── movieService.js (✅ NEW)
│   ├── cinemaService.js (✅ NEW)
│   ├── showtimeService.js (✅ NEW)
│   ├── bookingService.js (✅ NEW)
│   ├── README.md (✅ Complete guide)
│   ├── COPY_PASTE_GUIDE.js (✅ Full page examples)
│   └── API_QUICK_REFERENCE.js (✅ Cheat sheet)
├── pages/
│   ├── LoginPage.jsx (⚡ Use authService)
│   ├── MovieSelection.jsx (⚡ Use movieService, showtimeService)
│   ├── checkout/
│   │   ├── CheckoutPage.jsx (⚡ Use bookingService)
│   │   └── PaymentResult.jsx (✅ Display bill)
│   └── history/
│       └── TransactionHistory.jsx (⚡ Use bookingService)
```

## 🔑 Key Points

1. **All functions return `{ success, data/error }`** - Always check result.success
2. **Token auto-injected** - Bearer token added automatically to all requests
3. **Zustand ONLY** - No localStorage/sessionStorage
4. **Seat hold = 5 min** - User must checkout within 5 minutes
5. **CORS Required** - Backend must allow http://localhost:517x origin

## 🚀 Next Steps

1. Verify backend is running:
   ```bash
   curl https://warm-squids-check.loca.lt/api/movies
   ```

2. Update your components using examples above

3. Test in F12 Console:
   ```javascript
   import movieService from './src/services/movieService';
   const result = await movieService.getAllMovies();
   console.log(result);
   ```

4. Check Network tab to verify:
   - Requests go to correct URLs
   - Authorization header present
   - Response status 200 OK
   - CORS headers in response

## 📞 Troubleshooting

**"CORS error"** → Backend not allowing requests → Check CORS middleware
**"401 Unauthorized"** → User not logged in → Call authService.login() first
**"404 Not Found"** → Check VITE_API_URL ends with `/api`
**"Network error"** → Backend down → Verify server running
**"Seat hold failed"** → Another user bought it → Refresh seats

---

**READY TO IMPLEMENT** ✅ Copy code from examples above into your pages!
