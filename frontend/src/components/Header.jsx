import React from 'react'

const Header = () => {
  return (
     <div className="bg-blue-950 flex justify-between  text-white items-center text-center p-6">
      <div>
        <h1 className="font-medium hover:text-green-300 cursor-pointer">Email Sender📩</h1>
        </div>
        <h1 className="text-2xl font-bold">🚀BULKMAIL🗂️</h1>
        <div className="flex gap-3 font-semibold ">
          <button className="underline">Log in</button>
          <button className="bg-green-500 p-2 rounded-lg">Sign Up</button>
        </div>
  </div>

  );
}

export default Header;