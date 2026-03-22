const movieImages = import.meta.glob('../assets/movies/*.{png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' });

export const getDynamicMovies = () => {
  const allImages = Object.entries(movieImages);
  
  // Separate banners from posters (supporting _banner, .banner, -banner)
  const banners = allImages.filter(([path]) => path.toLowerCase().match(/[._-]banner\./));
  const posters = allImages.filter(([path]) => !path.toLowerCase().match(/[._-]banner\./));

  return posters.map(([path, url], index) => {
    // path e.g.: '../assets/movies/dia-dao.poster.jpg' -> pop() -> 'dia-dao.poster.jpg'
    const fullFilename = path.split('/').pop();
    const filenameNoExt = fullFilename.replace(/\.[^/.]+$/, ""); // 'dia-dao.poster'
    
    // Remove poster suffix to get the clean movie name (e.g. dia-dao)
    const baseName = filenameNoExt.replace(/[._-]poster$/i, '');
    
    // Extract title by splitting dashes/underscores and capitalizing
    let title = baseName.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Find matching banner if exists
    const matchingBanner = banners.find(([bannerPath]) => {
      const bannerFullFilename = bannerPath.split('/').pop();
      const bannerFilenameNoExt = bannerFullFilename.replace(/\.[^/.]+$/, "");
      const bannerBase = bannerFilenameNoExt.replace(/[._-]banner$/i, '');
      return bannerBase.toLowerCase() === baseName.toLowerCase();
    });

    const backdropUrl = matchingBanner ? matchingBanner[1] : url;

    // Inject custom data for specifically requested movies
    let customData = {};
    if (baseName.toLowerCase() === 'dia-dao') {
      title = 'Địa Đạo: Mặt Trời Trong Bóng Tối (2025)';
      customData = {
        genre: 'Lịch Sử, Hành Động',
        duration: 110,
        releaseDate: '04/04/2025',
        director: 'Bùi Thạc Chuyên',
        country: 'Việt Nam',
        description: 'Dưới lòng đất tối tăm, ánh sáng của hy vọng và lòng yêu nước vẫn rực rỡ. Bộ phim tái hiện chân thực cuộc sống và chiến đấu kiên cường của quân dân Củ Chi.',
        casts: [
          { name: "Thái Hòa", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Thái+Hòa&background=random" },
          { name: "Quang Tuấn", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Quang+Tuấn&background=random" },
          { name: "Uyển Ân", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Uyển+Ân&background=random" },
          { name: "Diễm Hằng Lamoon", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Diễm+Hằng&background=random" },
          { name: "Hồ Thu Anh", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Hồ+Thu+Anh&background=random" },
          { name: "Anh Tú Wilson", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Anh+Tú&background=random" }
        ]
      };
    } else if (baseName.toLowerCase() === 'nha-gia-tien') {
      title = 'Nhà Gia Tiên (2025)';
      customData = {
        genre: 'Hài Hước, Gia Đình',
        duration: 117,
        releaseDate: '21/02/2025',
        director: 'Huỳnh Lập',
        country: 'Việt Nam',
        description: '“Nhà Gia Tiên” đưa bạn đến một cuộc hành trình hài hước và đầy bất ngờ giữa các thế hệ trong một gia đình. Bộ phim phản ánh những mối quan hệ đan xen, những tình huống hài hước nhưng cũng không thiếu những khoảnh khắc xúc động.',
        casts: [
          { name: "Huỳnh Lập", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Huỳnh+Lập&background=random" },
          { name: "Phương Mỹ Chi", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Phương+Mỹ+Chi&background=random" },
          { name: "NSƯT Hạnh Thuý", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Hạnh+Thuý&background=random" },
          { name: "NSƯT Huỳnh Đông", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Huỳnh+Đông&background=random" },
          { name: "Puka", role: "Diễn viên", avatar: "https://ui-avatars.com/api/?name=Puka&background=random" }
        ]
      };
    } else if (baseName.toLowerCase() === 'phim-mai') {
      title = 'Mai (2024)';
      customData = {
        genre: 'Tình Cảm, Tâm Lý',
        duration: 131,
        releaseDate: '10/02/2024',
        director: 'Trấn Thành',
        country: 'Việt Nam',
        description: 'Mang trên mình những vết thương quá khứ và gánh nặng mưu sinh, Mai - một phụ nữ sắp bước sang tuổi 40 mang một số phận đầy gian truân. Tuy nhiên cuộc đời cô bỗng dưng bừng sáng rực rỡ khi Dương - chàng nhạc công trẻ đào hoa si tình kiên quyết theo đuổi yêu cô.',
        casts: [
          { name: "Phương Anh Đào", role: "Mai", avatar: "https://image.tmdb.org/t/p/w200/b0F8Xl4sX32b0T0H8EaJ0c7M3I7.jpg" },
          { name: "Tuấn Trần", role: "Dương", avatar: "https://image.tmdb.org/t/p/w200/5X8Xl4sX32b0T0H8EaJ0c7M3I7.jpg" },
          { name: "Trấn Thành", role: "Ông Hoàng", avatar: "https://image.tmdb.org/t/p/w200/2X8Xl4sX32b0T0H8EaJ0c7M3I7.jpg" },
          { name: "Hồng Đào", role: "Bà Đào", avatar: "https://image.tmdb.org/t/p/w200/7X8Xl4sX32b0T0H8EaJ0c7M3I7.jpg" }
        ]
      };
    } else if (baseName.toLowerCase() === 'kungfu-panda4') {
      title = 'Kung Fu Panda 4';
      customData = {
        genre: 'Hoạt Hình, Hài Hước',
        duration: 94,
        releaseDate: '08/03/2024',
        director: 'Mike Mitchell',
        country: 'Mỹ',
        description: 'Gấu trúc Po một lần nữa phải miễn cưỡng rời khỏi chốn yên bình rèn luyện một Đệ tử tiềm năng để truyền lại vị trí Thần Long Đại Hiệp của Thung lũng Bình Yên. Cùng lúc đó, mụ phù thủy "Tắc Kè Hoa" nguy hiểm đã âm thầm hấp thụ toàn bộ võ công từ các ác nhân từ âm giới để thống trị thế giới.',
        casts: [
          { name: "Jack Black", role: "Po (Lồng tiếng)", avatar: "https://image.tmdb.org/t/p/w200/rtCx0fiYxJVhzXXdwZE2XRTfIKE.jpg" },
          { name: "Awkwafina", role: "Zhen (Lồng tiếng)", avatar: "https://image.tmdb.org/t/p/w200/l5AKkg3H1QhMuXmTTmq1EyjylqT.jpg" },
          { name: "Viola Davis", role: "Chameleon (Lồng tiếng)", avatar: "https://image.tmdb.org/t/p/w200/e8pWTswrqU98A1I8q32Pmsx7YmQ.jpg" },
          { name: "Dustin Hoffman", role: "Shifu (Lồng tiếng)", avatar: "https://image.tmdb.org/t/p/w200/paE1Hk0A4G2T11Nid7163gClyT7.jpg" }
        ]
      };
    } else if (baseName.toLowerCase() === 'dune-part-two') {
      title = 'Dune: Part Two';
      customData = {
        genre: 'Hành Động, Viễn Tưởng',
        duration: 166,
        releaseDate: '01/03/2024',
        director: 'Denis Villeneuve',
        country: 'Mỹ',
        description: 'Paul Atreides hợp nhất với Chani và người Fremen trên sa mạc cằn cỗi Arrakis để tiến hành cuộc thánh chiến trả thù những kẻ âm mưu tuyệt diệt gia tộc anh. Đứng trước sự lựa chọn giữa tình yêu và định mệnh vũ trụ vĩ đại, Paul phải ngăn chặn một tương lai khủng khiếp mà chỉ anh mới nhìn thấy.',
        casts: [
          { name: "Timothée Chalamet", role: "Paul Atreides", avatar: "https://image.tmdb.org/t/p/w200/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
          { name: "Zendaya", role: "Chani", avatar: "https://image.tmdb.org/t/p/w200/r3AEEjAew1HjB81Q6cO5O4pLzG9.jpg" },
          { name: "Rebecca Ferguson", role: "Lady Jessica", avatar: "https://image.tmdb.org/t/p/w200/agkSOQj0D0aXndD7G1w4pQvWvO3.jpg" },
          { name: "Javier Bardem", role: "Stilgar", avatar: "https://image.tmdb.org/t/p/w200/uB2n7e29T8K7R4q6fI6jJbWXXoN.jpg" },
          { name: "Austin Butler", role: "Feyd-Rautha", avatar: "https://image.tmdb.org/t/p/w200/qwswx0K9A7yYvA7M14W8T9e62gV.jpg" }
        ]
      };
    }

    // We treat the images as movie representations
    return {
      id: `dyn-${index}`,
      title: title,
      genre: customData.genre || "Phim Nổi Bật",
      ageRating: "C16",
      duration: customData.duration || 120,
      releaseDate: customData.releaseDate,
      director: customData.director,
      country: customData.country,
      casts: customData.casts,
      rating: 8.5,
      is3D: false,
      poster: url,
      backdrop: backdropUrl, // use the matched banner for backdrop
      description: customData.description || `Bộ phim ${title} nổi bật tuần này. Bấm để xem chi tiết!`,
    };
  });
};
