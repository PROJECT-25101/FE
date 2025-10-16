import { PhoneOutlined, PushpinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div>
      <div className="bg-green-700 text-white">
        <footer className="w-full py-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8 text-lg">
            {/* Cột 1 */}
            <div className="col-span-2 flex flex-col items-center space-y-6">
              <img
                src="https://gotickets.events/wp-content/uploads/2022/12/logo-gotickets.png"
                alt="Logo"
                className="w-62 invert"
              />
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-blue-500 text-3xl">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="text-white hover:text-pink-500 text-3xl">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

            {/* <!-- Cột 2 --> */}
            <div className="col-span-3 space-y-4">
              <h2 className="font-bold text-2xl text-yellow-400">
                CÔNG TY TNHH GOTICKET
              </h2>
              <p>
                <span className="text-yellow-400 mr-2">
                  <PushpinOutlined />
                </span>
                Khách sạn Thân Hoa, đường Mai Thúc Loan, phường Nghi Hương, TP.
                Vinh, Nghệ An.
              </p>
              <p>
                <span className="text-yellow-400 mr-2">
                  <PhoneOutlined />
                </span>
                0365252737
              </p>
              <p>
                <span className="text-yellow-400 mr-2">
                  <PhoneOutlined />
                </span>
                1900 6467 - 1900 6762
              </p>
            </div>

            {/* <!-- Cột 3 --> */}
            <div className="col-span-3 space-y-4">
              <h2 className="font-bold text-2xl">Liên hệ với chúng tôi</h2>
              <form className="flex flex-col space-y-3">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="px-4 py-2 rounded-md text-black bg-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-md text-black bg-white"
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="px-4 py-2 rounded-md text-black bg-white"
                />
                <textarea
                  placeholder="Lời nhắn đến Văn Minh"
                  className="px-4 py-2 rounded-md text-black bg-white"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-900 px-6 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Gửi
                </button>
              </form>
            </div>

            {/* <!-- Cột 4 --> */}
            <div className="col-span-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.011726812385!2d105.6935!3d18.6796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cfd26e6c6b6b%3A0xa648cfb9cdbcdaad!2zQ8O0bmcgVHkgVE5ISC BWw6FuIE1pbmg!5e0!3m2!1svi!2s!4v1672500000000"
                width="100%"
                height={250}
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md hover:scale-105 transition-transform"
              />
            </div>

            {/* <!-- Cột 5 --> */}
            <div className="col-span-2 space-y-4">
              <h2 className="font-bold text-2xl">Liên kết nhanh</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Hệ thống văn phòng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Điều khoản Văn Minh
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
