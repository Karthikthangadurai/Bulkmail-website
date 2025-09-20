import React from 'react'
import { useState } from 'react'
import axios from "axios"
import * as XLSX from "xlsx"

const Body = () => {

  const [msg, setmsg] = useState("")
  const [status,setstatus] = useState(false)
  const [emailList,setEmailList ] = useState([])

  function handlemsg(event)
  {
    setmsg(event.target.value)
  }

  function handlefile(event)
  {
    const file = event.target.files[0]
    console.log(file)

    const reader = new FileReader();
    reader.onload = function(event){
        const data = event.target.result;
        const workbook = XLSX.read(data,{type: 'binary'})
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail = emailList.map(function(item){return item.A})
        console.log(totalemail)
        setEmailList(totalemail)
    }
    reader.readAsBinaryString(file);
  }

  function send()
  {
    setstatus(true)
    axios.post("https://bulkmail-website-backend.onrender.com/sendemail",{msg:msg,emailList:emailList})
    .then(function(data)
{
    if(data.data === true)
    {
      
        alert("Email Sent Successfully✅")
        setstatus(false)
    }
    else{
        alert("Email Sent Failed❌")
    }
})
  }


  return (
        <div className="bg-blue-300 px-6 sm:px-24 md:46 lg:px-72 py-16">
          <div className="bg-green-500 flex flex-col items-center text-black border-4 border-blue-800 shadow-2xl rounded-xl">
          <h1 className="text-gray-100 font-semibold text-base md:text-lg mt-2 mb-2">Email Content📝</h1>
      <textarea onChange={handlemsg} value={msg} className="w-72 md:w-[55%] h-28 md:h-32 py-2 outline-none px-2 border-2 border-yellow-500 rounded-md" placeholder="Write your email content here....."></textarea>
    
      <div>
        <input type="file" onChange={handlefile} className=" border-2 border-dashed py-3 px-1 md:p-4 mt-5 mb-5 text-sm md:text-base" />
      </div>

      <p className="font-semibold text-gray-100">Total Emails in the File: {emailList.length}</p>

      <button onClick={send} className="bg-purple-900 text-white font-semibold rounded-lg pl-7 pr-7 p-3 mt-3 mb-5 hover:bg-purple-950">{status?"Sending...":"Send emails📧"}</button>
    </div>
    </div>
  );
}

export default Body;
