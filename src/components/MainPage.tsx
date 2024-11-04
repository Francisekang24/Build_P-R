import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


export default function MainPage() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Add your main content here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}