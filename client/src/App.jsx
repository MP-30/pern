import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Updatepage from "./routes/Updatepage";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import Home from "./routes/home";
import { RestaurantsContextProvider } from "./context/restaurantsContext";

const App = () => {

    return (
        <RestaurantsContextProvider>    
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurant/:id" element={<RestaurantdetailPage />} />
                    <Route path="/restaurant/:id/update" element={<Updatepage />} />
                </Routes>
            </Router>
        </div>
        </ RestaurantsContextProvider>
        
    );
};

export default App;
