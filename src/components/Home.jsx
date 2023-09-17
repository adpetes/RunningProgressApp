import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-scroll';

const Home = () => {
  return (
    <div name='home' className='w-full flex justify-center items-center'>
        <div className='m-4 w-full lg:w-[40%]'>
            <p className='text-white font-bold my-2'>Hi, my name is </p>
            <h1 className='text-4xl sm:text-6xl font-bold text-[#f0ebc0]'>Adam Peterson</h1>
            <h2 className='text-4xl sm:text-5xl font-bold text-white'>I'm a New Runner.</h2>
            <p className='text-[#a9abaf] py-2 font-bold my-2'>
                I made this page as a fun project but also to document my running journey - 
                I started running in February 2023 to train for the BMO half-marathon. 
                This app uses the Strava API to get some of my running data and display it here.
            </p>
            <Link offset={-150} to='stats' smooth={true} duration={500} className='text-[#ccd6f6] group font-bold border-2 no-underline px-6 py-2 my-2 flex items-center hover:bg-[#6c8cf4] hover:border-[#6c8cf4] w-min'>
                More
                <span className='group-hover:rotate-90 duration-300'>
                <HiArrowNarrowRight className='ml-3'/>
                </span>
            </Link>
        </div>
    </div>
  )
}

export default Home