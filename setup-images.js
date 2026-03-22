const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'C:\\Users\\Admin\\UCC_SLEEPY\\src\\assets\\movies';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'huong_dan.txt'), 'Bạn hãy copy hình ảnh (jpg, png) các bộ phim muốn hiển thị thả vào thư mục này nhé! Hệ thống sẽ tự nhận diện và đẩy lên trang chủ.\\nVí dụ: terminator.jpg sẽ tự động có tên là Terminator.');

const download = (url, dest) => {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(res.headers.location, dest); // handle redirect
    } else {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
    }
  });
};

download('https://picsum.photos/seed/phim1/500/750', path.join(dir, 'phim-hanh-dong-1.jpg'));
download('https://picsum.photos/seed/phim2/500/750', path.join(dir, 'phim-tinh-cam-2.jpg'));
download('https://picsum.photos/seed/phim3/500/750', path.join(dir, 'phim-hoat-hinh-3.jpg'));
