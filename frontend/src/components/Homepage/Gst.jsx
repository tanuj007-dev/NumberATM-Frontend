 import React from 'react'

const Gst = () => {
  return (
    <>
    <div className='bg-white'>
      <div className="w-full mx-auto px-4 py-4 bg-[#F5C037] flex flex-col justify-center items-center gap-2 lg:flex-row lg:justify-between lg:items-center  lg:px-8 lg:py-6 lg:gap-4">
        
        {/* Marketing Message / Text Block */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-[#000000] text-sm leading-snug lg:text-xl lg:leading-relaxed">
            Transform your digital identity today with NumberATM - where 
            <br className="hidden sm:inline" />
            exclusivity meets excellence in premium telecommunications solutions.
          </p>
        </div>

        {/* GST Number Block */}
        <div className="text-center lg:text-right pt-2 lg:pt-0">
          <h1 className="text-[#17565D] text-xl font-bold lg:text-3xl lg:font-semibold">
            GST: 06AAECV9458Q2ZB
          </h1>
        </div>
      </div>
      </div>
    </>
  )
}

export default Gst