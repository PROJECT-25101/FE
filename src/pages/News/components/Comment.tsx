export default function Comment() {
  return (
    <div>
      <div>
        <div className="w-full max-w-5xl bg-gray-100 p-8 rounded-md shadow">
          <h2 className="text-2xl font-bold mb-2">Để lại một bình luận</h2>
          <p className="text-gray-700 mb-6">
            Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc
            được đánh dấu <span className="text-red-600">*</span>
          </p>
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                Bình luận <span className="text-red-600">*</span>
              </label>
              <textarea className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">
                  Tên <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Trang web</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-400 rounded"
              />
              <label className="text-gray-800">
                Lưu tên của tôi, email, và trang web trong trình duyệt này cho
                lần bình luận kế tiếp của tôi.
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-800 transition"
            >
              GỬI BÌNH LUẬN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
