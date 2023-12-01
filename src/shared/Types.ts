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
    poze:Array<string>;
}

