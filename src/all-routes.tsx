import {Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/home-page";
import {DonationsPage} from "./pages/donations-page";
import {MyDonationsPage} from "./pages/my-donations-page";
import {AddDonationPage} from "./pages/add-donation-page";
import { CauseProvider } from './shared/CauseProvider';
import {UpdateDonationPage} from "./pages/update-donation-page";

export const AllRoutes=()=>{
    return(
        <CauseProvider>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/donations'} element={<DonationsPage />} />
                <Route path={'/mydonations'} element={<MyDonationsPage />} />
                <Route path={'/add'} element={<AddDonationPage />} />
                <Route path={'/update/:causeId'} element={<UpdateDonationPage />} />

            </Routes>
        </CauseProvider>
    )
}