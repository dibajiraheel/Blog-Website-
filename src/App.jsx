import { Outlet } from "react-router-dom"





function App({authenticationRequired}) {

  return (
    <>
      <div className="bg-gray-700  w-full min-h-screen text-white py-2 px-2">
        <Outlet />
      </div>
    </>
  )
}

export default App
