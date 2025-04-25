import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="p-4 mt-4 animate-pulse max-w-4xl mx-auto">
      <div className="md:flex">
        {/* Image Placeholder */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <div className="w-full h-96 rounded-lg shadow bg-gradient-to-r from-gray-200 to-gray-300" />
        </div>

        {/* Details Placeholder */}
        <div className="md:w-1/2 pl-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 mb-4 w-3/4" />
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 mb-4 w-5/6" />

            {/* Action Buttons Placeholder */}
            <div className="flex gap-4">
                <div className="h-10 w-1/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
                <div className="h-10 w-1/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
