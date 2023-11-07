import {Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/home-page";
import {DonationsPage} from "./pages/donations-page";

export const AllRoutes=()=>{
    return(
        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/donations'} element={<DonationsPage />} />
        </Routes>
    )
}