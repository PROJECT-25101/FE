const QuantitySection = () => {
  return (
    <div>
      <section className="bg-[#FFFBEF] py-16">
        <div className="mx-6 xl:mx-auto max-w-7xl text-center">
          {/* <!-- Tiêu đề --> */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-2">
            CAM KẾT CHẤT LƯỢNG
          </h2>
          <p className="text-lg font-semibold mb-4 text-gray-800">
            VỚI BỘ TIÊU CHUẨN CỦA NHÀ XE VĂN MINH
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            Văn Minh cam kết chất lượng và tiêu chuẩn đối với khách hàng, đảm
            bảo quyền lợi và sự chu đáo, tận tâm đối với khách hàng.
          </p>

          {/* <!-- 4 cột cam kết --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* <!-- 1. Giữ chỗ 100% --> */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="border-2 border-dashed border-red-300 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
                  alt="Giữ chỗ"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-bold text-lg">Giữ chỗ 100%</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hành khách đặt vé được giữ chỗ 100%, KHÔNG để khách nằm luồng.
              </p>
            </div>

            {/* <!-- 2. Dịch vụ uy tín --> */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="border-2 border-dashed border-red-300 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3203/3203071.png"
                  alt="Uy tín"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-bold text-lg">Dịch vụ uy tín</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Xuất bến đúng giờ, cam kết KHÔNG bao giờ bắt khách dọc đường.
              </p>
            </div>

            {/* <!-- 3. Giá vé ổn định --> */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="border-2 border-dashed border-red-300 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
                  alt="Giá vé"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-bold text-lg">Giá vé ổn định</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cam kết bán đúng giá niêm yết và KHÔNG bao giờ tăng giá dịp lễ
                Tết.
              </p>
            </div>

            {/* <!-- 4. Nhiệt tình --> */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="border-2 border-dashed border-red-300 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                  alt="Nhiệt tình"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-bold text-lg">Nhiệt tình</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nhân viên nhiệt tình, chu đáo và luôn mang lại cảm giác thoải
                mái cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuantitySection;
