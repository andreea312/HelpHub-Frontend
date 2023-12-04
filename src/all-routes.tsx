import {Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/home-page";
import {RegisterPage} from "./pages/register-page";
import {DonationsPage} from "./pages/donations-page";
import {MyDonationsPage} from "./pages/my-donations-page";
import {AddDonationPage} from "./pages/add-donation-page";
import { CauseProvider } from './shared/CauseProvider';
import {UpdateDonationPage} from "./pages/update-donation-page";
import { AuthProvider } from './auth/AuthProvider';
import { UserProvider } from './auth/RegisterProvider';

export const AllRoutes=()=>{
    return(
        <CauseProvider>
            <AuthProvider>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/donations'} element={<DonationsPage />} />
                <Route path={'/mydonations'} element={<MyDonationsPage />} />
                <Route path={'/add'} element={<AddDonationPage />} />
                <Route path={'/update/:causeId'} element={<UpdateDonationPage />} />
            </Routes>
            </AuthProvider>
            <UserProvider>
                <Routes>
                <Route path={'/register'} element={<RegisterPage />} />
                </Routes>
            </UserProvider>
        </CauseProvider>
    )
}