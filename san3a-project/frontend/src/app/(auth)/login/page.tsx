export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-row-reverse bg-white">
      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-[#071C35] to-[#02111F] text-white relative">
        <div className="w-full flex flex-col justify-center px-16">
          <div className="absolute top-10 right-10 text-xl font-bold">
            صنعة
          </div>

          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            انضم إلى مجتمعنا من
            <br />
            المحترفين الموثوقين
            <br />
            وأصحاب المنازل السعداء
          </h1>

          <p className="text-gray-300 text-lg mb-12">
            المنصة الأكثر موثوقية لخدمات المنازل الذكية الاحترافية.
            <br />
            آمنة، موثوقة، وسلسة.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-end">
              <span>شبكة محترفين موثقة</span>
              <div className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center">
                ✓
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <span>حماية دفع آمنة</span>
              <div className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center">
                🛡
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <span>دعم فني متخصص على مدار الساعة</span>
              <div className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center">
                🎧
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-xl" dir="rtl">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-3">
              إنشاء حساب
            </h2>

            <p className="text-gray-500">
              ابدأ رحلتك مع صنعة اليوم.
            </p>
          </div>

          {/* Account Type */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button className="bg-[#007A4D] text-white py-4 rounded-xl font-medium">
              أنا عميل
            </button>

            <button className="bg-[#EEF5F1] text-gray-700 py-4 rounded-xl font-medium">
              أنا فني محترف
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700">
                الاسم الكامل
              </label>

              <input
                type="text"
                placeholder="أدخل اسمك الكامل"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#007A4D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#007A4D]"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  رقم الهاتف
                </label>

                <input
                  type="tel"
                  placeholder="+20 100 000 0000"
                  className="w-full h-14 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#007A4D]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                كلمة المرور
              </label>

              <input
                type="password"
                placeholder="8 أحرف على الأقل"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#007A4D]"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <label className="text-gray-700">
                أوافق على الشروط وسياسة الخصوصية
              </label>

              <input
                type="checkbox"
                className="w-5 h-5 accent-[#007A4D]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#007A4D] hover:bg-[#006341] transition text-white py-4 rounded-xl text-lg font-medium"
            >
              إنشاء الحساب
            </button>
          </form>

          <div className="text-center mt-8">
            <span className="text-gray-500">
              لديك حساب بالفعل؟
            </span>

            <button className="mr-2 font-semibold text-gray-900">
              تسجيل الدخول
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-12 text-lg">
            <button className="text-[#007A4D] font-medium">
              العربية
            </button>

            <button className="text-gray-500">
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}