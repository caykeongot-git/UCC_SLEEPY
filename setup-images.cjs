const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'C:\\Users\\Admin\\UCC_SLEEPY\\src\\assets\\movies';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'huong_dan.txt'), 'Bạn hãy copy hình ảnh (jpg, png) các bộ phim muốn hiển thị thả vào thư mục này nhé! Trình duyệt sẽ tự nhận diện và đẩy lên trang chủ.\\nVí dụ: file named terminator.jpg sẽ tự động đọc thành phim tên là Terminator.');

const download = (url, dest) => {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(res.headers.location, dest);
    } else {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
    }
  });
};

download('https://picsum.photos/seed/dune/500/750', path.join(dir, 'dune-part-two.jpg'));
download('https://picsum.photos/seed/mai/500/750', path.join(dir, 'phim-mai.jpg'));
download('https://picsum.photos/seed/kun/500/750', path.join(dir, 'kungfu-panda.jpg'));
