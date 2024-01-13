export interface Cause {
    id?: number;
    descriere: string;
    titlu: string;
    locatie: string;
    sumaMinima: number;
    sumaStransa: number | null;
    moneda: string;
    poze?: File[];
}

export interface CauseUpdate {
    id: number;
    descriere: string;
    titlu: string;
    locatie: string;
    sumaMinima: number;
    sumaStransa: number | null;
    moneda: string;
    nrSustinatori: number;
    poze?:File[];
}

export interface User {
    id?: number;
    username?: string;
    email?: string;
    parola?: string;
    fullName?: string;
    gender?: number;
    points?: number;
    nrDonations?: number;
}

export interface RegisteredUser {
    id?: number;
    username?: string;
    email?: string;
    parola?: string;
    fullName?: string;
    gender?: number;
    points?: number;
    nrDonations?: number;
}

export interface UserDetails {
    username?: string;
    email?: string;
    parola?: string;
    fullName?: string;
    gender?: number;
    points?: number;
    nrDonations?: number;
    achievements: Achievement[]
}

export interface Achievement {
    id?: number;
    nr_donations_required?: number;
    points_required?: number;
    url?: string;
}

export const InitialUserDetails: UserDetails = {
    username: "",
    email: "",
    parola: "",
    fullName: "",
    gender: 1,
    points: 0,
    nrDonations: 0,
    achievements: []
}