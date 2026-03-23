# 🎬 HƯỚNG DẪN TEST API & QUY TRÌNH PUSH CODE CHO TEAM FRONTEND

Chào 500 anh em Frontend! Nhằm quản lý tập trung và đảm bảo Code chất lượng nhất, cấu trúc dự án sẽ chia làm hai phần: Frontend (của anh em) chạy Local, và Backend + Database do **Moshi (Lead)** quản lý và chạy ngầm (Zero Trust Architecture).

Anh em VUI LÒNG đọc kỹ và làm theo đúng Workflow dưới đây trước khi commit code lên kho.

---

## 1. Cách lấy Dữ liệu thật (Real Data) để Test Giao diện
Anh em không vác theo cục Database nặng trịch hay Code Backend rườm rà. Mọi luồng Logic đều đổ về qua API do máy của tớ tung ra internet.

**Thao tác kết nối API hằng ngày:**
- **Bước 1:** Inbox tớ xin cái `Link API Tunnel` (Vì lý do rèn thói quen bảo mật, cái đường ống API này linh hoạt tự động đổi Link mới mõi ngày, chống bị ddos).
- **Bước 2:** Mở file `.env` ở thư mục `cinema-web` trên máy tính của anh em (nếu chưa có thì tạo).
- **Bước 3:** Nhét cái link tớ vừa cấp vào biến này:
  ```env
  VITE_API_URL=https://link-cua-moshi-hom-nay.loca.lt/api
  ```
- **Bước 4:** Bật web lên (`npm run dev`) để chiêm ngưỡng data Phim thật, Rạp thật được thả về tận máy tính!

---

## 2. Quy trình Commit / Đẩy code (BẮT BUỘC)
Để tránh đụng búa xua (Merge Conflict), TUYỆT ĐỐI không gõ lệnh đẩy thẳng vào nhánh `main`.

**Cụ thể từng bước làm tính năng:**
1. **Chia Nhánh (Branching):** Anh em tự tạo một nhánh Github riêng đại diện cho tính năng của mình (VD: `git checkout -b hoan/trang-dat-ve`).
2. **Kiểm duyệt Data (Test with API):** Trước khi quyết định bấm commit, anh em VÉT API ở Bước 1 vào, kiểm tra kỹ xem trang của mình lấy/render data ĐÚNG Ý ĐỒ chưa, có mỏi/hỏng lúc không có data hoặc data trả về chậm không.
3. **Pull Request (Gửi yêu cầu gộp Code):**
   - Đẩy code lên nhánh của mình (`git push origin ten_nhanh_cua_ban`).
   - Lên thao tác trên github, tạo thẻ Pull Request (PR) báo để gộp vào `main`.
4. **Khâu Review cuối cùng:** 
   - Tớ (Moshi) sẽ nhận thông báo, kéo nhánh của cậu về test tổng quát qua Backend chính chủ. 
   - Phê duyệt (Approve) code Mượt -> Merge thẳng vào Repo chung `main`.
   - Lỗi, Đụng giao diện vì quên test với API -> Tạch, comment bắt yêu cầu sửa lại code.

Đọc thật kĩ nhé, có Link Tunnel rồi bắt đầu chiến thôi!🚀

---

## 3. Bí kíp "Nói chuyện" với AI (Dành cho anh em xài AI Trợ lý)
Vì mình đã có Backend thật xịn xò (trả về JSON chuẩn chỉ, có mã hóa JWT đàng hoàng), anh em khi mướn AI code Frontend (ví dụ xài Cursor, GitHub Copilot, ChatGPT) **BẮT BUỘC** phải nhắc tụi nó tuân thủ luật này để đỡ phải sửa code nhiều lần:

**❌ Đừng Prompt kiểu phèn:**
> *"Code cho tao trang Đặt vé và Giỏ hàng, lưu logic tạm vô `localStorage` hay Redux nhé."* 
*(Sai hoàn toàn! Giỏ hàng, Booking và Tài khoản đã có CSDL phân xử).*

**✅ Hãy Prompt kiểu Tech Lead (Copy nguyên đoạn này vứt cho AI của cậu):**
> "Dự án của tôi đã có sẵn Backend Node.js thực tế. KHÔNG được dùng `localStorage` hay `sessionStorage` để lưu trữ dữ liệu giỏ hàng, đặt vé hay user info. Bắt buộc dùng thư viện `axios` để gọi các thao tác tới biến môi trường `import.meta.env.VITE_API_URL`.
> Khi user đăng nhập thành công qua API `/api/auth/login`, hãy lưu `token` vào Zustand store, và BẮT BUỘC nhét header `Authorization: Bearer <token>` vào mọi request Axios phía sau (như lúc gọi API đặt vé `/api/bookings/checkout`).
> Dữ liệu trả về luôn là JSON. Hãy trích xuất và hiển thị dữ liệu JSON đó ra màn hình và Handle lỗi đàng hoàng thay vì tự tạo mock data."

Anh em quăng câu thần chú này vào trước khi bảo AI code bất cứ file `Service.js` hay `Component` nào nhé. Chúc anh em ghép API mượt mà! 🛡️
