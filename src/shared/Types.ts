export interface Cause {
    id?: number;
    descriere: string;
    titlu: string;
    locatie: string;
    sumaMinima: number;
    sumaStransa: number | null;
    moneda: string;
    image: string | null;
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

