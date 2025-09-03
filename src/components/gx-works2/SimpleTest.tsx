import React from 'react';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          TailwindCSS Test
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Nếu bạn thấy component này với styling đẹp, 
          thì TailwindCSS đã hoạt động thành công!
        </p>
        <div className="space-y-3">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Primary Button
          </button>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Success Button
          </button>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Danger Button
          </button>
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> TailwindCSS đang hoạt động
          </p>
        </div>
      </div>
    </div>
  );
}
