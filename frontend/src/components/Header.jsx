import React from 'react'

const Header = () => {
  return (
     <div className="bg-blue-950 flex justify-between  text-white items-center text-center px-3 py-4 md:p-6">
      <div>
        <h1 className="text-xs font-semibold md:text-base md:font-medium hover:text-green-300 cursor-pointer">Email Sender📩</h1>
        </div>
        <h1 className="text-base md:text-2xl font-bold">🚀BULKMAIL🗂️</h1>
        <div className="text-xs md:text-base flex gap-3 font-semibold ">
          <button className="underline">Log in</button>
          <button className="bg-green-500 p-2 rounded-lg">Sign Up</button>
        </div>
  </div>

  );
}

export default Header;