import React from "react";

const Summary = () => {
  return (
    <div className="bg-white rounded-3xl shadow p-6 flex-1">
      <h1 className="text-2xl font-bold mb-6">خلاصه این ماه</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#34d399]">
            {/* flame icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 7 7 7 12C7 15.866 9.686 18 12 18C14.314 18 17 15.866 17 12C17 9 15 6 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          <div>
            <h2 className="text-gray-500 text-sm">بیشترین سکه در روز</h2>
            <h1 className="text-xl font-bold">24</h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#34d399]">
            {/* trending up */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div>
            <h2 className="text-gray-500 text-sm">روزهای فعال</h2>
            <h1 className="text-xl font-bold">24</h1>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#34d399]">
            {/* check */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div>
            <h2 className="text-gray-500 text-sm">تسک های انجام شده</h2>
            <h1 className="text-xl font-bold">24</h1>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#34d399]">
            {/* target */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          <div>
            <h2 className="text-gray-500 text-sm">میانگین پیشرفت</h2>
            <h1 className="text-xl font-bold">24</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
