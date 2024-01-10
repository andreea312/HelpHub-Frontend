import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {HomePage} from "./pages/home-page";
import {RegisterPage} from "./pages/register-page";
import {CausesPage} from "./pages/causes-page";
import {MyCausesPage} from "./pages/my-causes-page";
import {AddCausePage} from "./pages/add-cause-page";
import { CauseProvider } from './shared/CauseProvider';
import {UpdateCausePage} from "./pages/update-cause-page";
import { AuthProvider } from './auth/AuthProvider';
import { UserProvider } from './auth/RegisterProvider';

export const AllRoutes=()=>{
    return(
        <CauseProvider>
            <AuthProvider>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/mycauses'} element={<MyCausesPage />} />
                <Route path={'/causes'} element={<CausesPage />} />
                <Route path={'/add'} element={<AddCausePage />} />
                <Route path={'/update/:causeId'} element={<UpdateCausePage />} />
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