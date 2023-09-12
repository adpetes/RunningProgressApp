import React from 'react'
import pfp from '../images/pfp.jpg'
import marathon_pic_1 from '../images/marathon_pic_1.jpeg'
import marathon_pic_2 from '../images/marathon_pic_2.jpeg'
import marathon_pic_3 from '../images/marathon_pic_3.jpeg'
import marathon_pic_4 from '../images/marathon_pic_4.jpeg'
import marathon_pic_5 from '../images/marathon_pic_5.jpeg'

function Gallery() {
  return (
    <div name='gallery' className='w-full md:h-screen text-gray-300 bg-[#426a5e]'>
      <div  className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl text-white font-bold'>Gallery</p>
          <p className='text-[#a9abaf] font-bold'>Some photos from this year!</p>
        </div>

        {/* Grid container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-0'>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${marathon_pic_1})`}}/>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${marathon_pic_2})`}}/>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${pfp})`}}/>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${marathon_pic_3})`}}/>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${marathon_pic_4})`}}/>
            <div className='shadow-lg shadow-black group container rounded-md flex justify-center items-center mx-auto border border-white content-div'
                style={{backgroundImage: `url(${marathon_pic_5})`}}/>
        </div>
      </div>
    </div>
  )
}

export default Gallery