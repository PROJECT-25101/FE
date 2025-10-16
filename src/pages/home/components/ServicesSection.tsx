const ServicesSection = () => {
  return (
    <div>
      <div className="antialiased">
        <section className="py-16">
          <div className="container mx-6 xl:mx-auto max-w-7xl  grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* <!-- Bên trái: Tiêu đề --> */}
            <div className="text-left">
              <h2 className="text-green-800 font-extrabold text-3xl md:text-5xl leading-tight mb-4">
                DỊCH VỤ TRÊN XE
                <br />
                ĐẦY ĐỦ TIỆN NGHI
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Chúng tôi luôn mong muốn mang đến cho quý khách những dịch vụ
                tốt nhất, sự hài lòng của quý khách là niềm vinh hạnh của chúng
                tôi.
              </p>
            </div>

            {/* <!-- Bên phải: 4 ô dịch vụ --> */}
            <div className="grid grid-cols-2 gap-6">
              {/* <!-- Ô 1 --> */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920474/z6068434141657_5c4e841c32617e8faa361ed3ee1e8459_r44bju.jpg"
                  alt="Phản hồi"
                  className="w-full h-60 md:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40  flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Phản hồi – khiếu nại
                  </h3>
                  <p className="text-sm leading-snug">
                    “Lắng nghe mọi ý kiến phản hồi để không ngừng hoàn thiện.”
                  </p>
                </div>
              </div>

              {/* <!-- Ô 2 --> */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920474/z6068434141657_5c4e841c32617e8faa361ed3ee1e8459_r44bju.jpg"
                  alt="Phản hồi"
                  className="w-full h-60 md:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40  flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Hợp đồng khách hàng
                  </h3>
                  <p className="text-sm leading-snug">
                    “Dễ dàng ký hợp đồng với dịch vụ tư vấn chuyên nghiệp qua
                    hotline”
                  </p>
                </div>
              </div>

              {/* <!-- Ô 3 --> */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920474/z6068434141657_5c4e841c32617e8faa361ed3ee1e8459_r44bju.jpg"
                  alt="Phản hồi"
                  className="w-full h-60 md:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40  flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">Đặt vé dễ dàng</h3>
                  <p className="text-sm leading-snug">
                    Đến mua vé xe trực tiếp trên website, từ các bến xe hoặc
                    điểm bán vé
                  </p>
                </div>
              </div>

              {/* <!-- Ô 4 --> */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920474/z6068434141657_5c4e841c32617e8faa361ed3ee1e8459_r44bju.jpg"
                  alt="Phản hồi"
                  className="w-full h-60 md:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Trung chuyển khách hàng
                  </h3>
                  <p className="text-sm leading-snug">
                    Dịch vụ trung chuyển tận nơi – Nhanh chóng, tiện lợi và tiết
                    kiệm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;
