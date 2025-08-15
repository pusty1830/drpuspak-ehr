import React from 'react'

function Home() {
  return (
    <div>Home page 
        <div className='mt-8'>
<a href="/register" className='border px-2  mb-12  bg-green-600 text-white py-2 '> User Booking button</a>
        </div>

        
       <div className='mt-12'>
                <a href="/doctor/login" className='border px-2 bg-green-600 text-white py-2' > Docter Login </a>

       </div>
    </div>
  )
}

export default Home