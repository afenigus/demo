import React from 'react'
import Telegram  from '../../assets/telegram.svg';
import Github from '../../assets/github.svg';
import Twitter from '../../assets/twitter.svg';
import Call from '../../assets/call.svg';
import Map from '../../assets/map.svg';
import Facebook from '../../assets/facebook.svg';

const Contact = () => {
  return (
    <div className='w-full boder-2  flex flex-col items-center justify-center borer-red-900 h-[65vh]'>
        <div className=' borer-2 h-full flex justify-center items-center' >
           <h1 className='font-bold text-2xl' > </h1>
        </div>

         <div className=' borer-2 h-full flex justify-center items-center' >
           <h1 className='font-bold text-2xl' >Contact me by following Contact Address</h1>
        </div>


      <div className='w-full boder boder-green-900 flex items-center justify-center'  > 
          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
          <a className='flex flex-col items-center justify-center'  href="#"> <img src={Map} className=' w-8 h-8' /><h1>Addis Ababa</h1></a>
          </div>

          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
            <a className='flex flex-col items-center justify-center' href="#"> <img src={Call} className=' w-8 h-8' /><h1>+251-9470-73699</h1></a>
          </div>

          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
            <a className='flex flex-col items-center justify-center' href="#"> <img src={Facebook} className=' w-8 h-8' /><h1>Facebook</h1></a>
          </div>

          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
            <a className='flex flex-col items-center justify-center'  href="https://t.me/your_telegram_channel"> <img src={Telegram} className=' w-8 h-8' /><h1>@Afedilmru</h1></a>
          </div>
          
          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
          <a className='flex flex-col items-center justify-center'  href="https://github.com/"> <img src={Github } className=' w-8 h-8' /><h1>GitHub</h1></a>
          </div>

          <div className='flex flex-col items-center justify-center boder boder-red-900 w-full'>
            <a className='flex flex-col items-center justify-center' href="https://github.com/"> <img src={Twitter} className=' w-8 h-8' color='green' /><h1>Twitter</h1></a>
          </div>
        </div>
    </div>
  )
}

export default Contact

