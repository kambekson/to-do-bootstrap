import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import {Outlet} from "react-router-dom";

function App() {

  return (
      <div className="d-flex min-vh-100 flex-column flex-lg-row">
          <Sidebar/>
          <div className="flex-grow-1">
              <Header/>
              <div className="p-4">
                <Outlet/>
              </div>
          </div>
      </div>
  )
}

export default App
