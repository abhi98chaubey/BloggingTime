import React from 'react'

function Logo({ width = '20' }) {
  return (
    <div>
      <img
        className={`block rounded-full w-10 h-10`}
        src="https://th.bing.com/th/id/OIP.hx5kKYwjxlUkkhSPsNdBCQHaHW?rs=1&pid=ImgDetMain"
        alt="Logo"
      />
    </div>
  );
}



export default Logo