const IntroduceSection = () => {
  return (
    <div className="antialiased bg-white text-gray-800">
      <section className="w-full bg-white py-16">
        <div className="mx-6 xl:mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* <!-- LEFT --> */}
            <div className="md:col-span-2 flex flex-col justify-center fade-in">
              <h3 className="text-green-600 text-5xl font-medium mb-2">
                Giới thiệu
              </h3>

              <h1 className="text-green-800 font-extrabold text-4xl sm:text-5xl md:text-8xl leading-tight mb-4 ">
                CÔNG TY
              </h1>

              <h4 className="uppercase text-black text-sm font-semibold mb-4 tracking-wide">
                KHỞI ĐẦU TỪ MỘT NỀN MÓNG VỮNG CHẮC
              </h4>

              <div className="space-y-4 text-gray-700 mb-6">
                <p>
                  Là kim chỉ nam được Ban Giám đốc GoTicket xây dựng và gìn giữ
                  trong suốt quá trình hình thành và phát triển. Trải qua gần 17
                  năm hoạt động, chúng tôi không ngừng đổi mới, sáng tạo và từng
                  bước khẳng định vị thế của mình trong lĩnh vực vận tải hành
                  khách – mang đến những hành trình an toàn, tiện nghi và đáng
                  tin cậy cho mọi khách hàng. Với tinh thần dám nghĩ, dám làm và
                  nỗ lực không ngừng nghỉ, GoTicket ngày càng khẳng định vị thế
                  là thương hiệu vận tải uy tín hàng đầu tại Việt Nam, nơi mỗi
                  chuyến xe không chỉ là phương tiện di chuyển, mà còn là hành
                  trình của niềm tin, chất lượng và sự tận tâm. GoTicket – Khởi
                  đầu vững chắc, đồng hành tin cậy, kiến tạo hành trình an toàn
                  cho mọi người Việt.
                </p>

                <p>
                  Với những nỗ lực không ngừng nghỉ cùng bản lĩnh dám đương đầu
                  khó khăn, chúng tôi ngày càng khẳng định được vị thế thương
                  hiệu hàng đầu tại Việt Nam và tiếp tục tạo nên những giá trị
                  bền vững.
                </p>
              </div>

              <a
                href="/gioi-thieu-chung"
                className="inline-block text-green-700 font-semibold hover:underline"
              >
                Tìm hiểu thêm →
              </a>
            </div>

            {/* <!-- RIGHT --> */}
            <div className="slide-down grid grid-rows-2 gap-6">
              {/* <!-- Card 1 --> */}
              <a
                href="/lich-su-hinh-thanh"
                className="group relative block overflow-hidden rounded-md shadow-lg"
              >
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920475/2_irvkl6.jpg"
                  alt="Lịch sử hình thành"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mb-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-white text-2xl font-bold tracking-tight">
                    LỊCH SỬ
                    <br />
                    HÌNH THÀNH
                  </h3>
                </div>
              </a>

              {/* <!-- Card 2 --> */}
              <a
                href="/tam-nhin-su-menh"
                className="group relative block overflow-hidden rounded-md shadow-lg"
              >
                <img
                  src="https://res.cloudinary.com/dznlvsapr/image/upload/v1759920474/3_bnmxg8.jpg"
                  alt="Tầm nhìn sứ mệnh"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mb-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-white text-2xl font-bold tracking-tight">
                    TẦM NHÌN &<br />
                    SỨ MỆNH
                  </h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroduceSection;
