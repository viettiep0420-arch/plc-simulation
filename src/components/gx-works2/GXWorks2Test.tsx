import React from 'react';

export default function GXWorks2Test() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          GX Works2 IDE Test
        </h1>
        <p className="text-gray-600 mb-4">
          Nếu bạn thấy component này với styling TailwindCSS, 
          thì GX Works2 IDE đã được cấu hình thành công!
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Test Button
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Success
          </button>
        </div>
      </div>
    </div>
  );
}
