// Patient type
export type PatientType = {
    id: number;
    patientName: string;
    patientOwnerName: string;
    patientOwnerEmail: string;
    patientOwnerPhone: string;
    date: Date;
    patientSymptoms: string;
};

export type PatientsType = PatientType[]