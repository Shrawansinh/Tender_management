import { Route, Routes } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import AddTender from "./pages/Addtender";
import BidPage from "./pages/BidPage";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import EditTender from "./pages/EditTender";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Managevendors from "./pages/Managevendors";
import Reports from "./pages/Reports";
import Tenders from "./pages/Tenders";
import ViewTender from "./pages/Viewtender";
function App() {
  return (

    <>
      <Routes future={{ v7_relativeSplatPath: true }}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<PrivateRoute>
          <Dashboard /></PrivateRoute>} />
        <Route path="/AddTender" element={<AddTender />} />
        <Route path="/ViewTender" element={<ViewTender />} />
        <Route path="/update/:id" element={<EditTender />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Tenders" element={<Tenders />} />
        <Route path="/bid/:id" element={<BidPage />} />
        <Route path="/Managevendors" element={<Managevendors />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </>
  );
};

export default App;
