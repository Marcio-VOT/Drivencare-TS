export type Pacient = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Doctor = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type DoctorDataById = {
  role_id: number;
  state_id: number;
  city_id: number;
};
export type DoctorDataByName = {
  role: string;
  state: string;
  city: string;
};

export type DoctorAppointment = {
  id: number;
  date: string;
  patient: string;
  doctor: string;
  role: string;
  status: string;
};

export type RawAppointment = {
  id: number;
  patient_id: string;
  doctor_id: string;
  date: string;
  status_id: string;
};

export type AppointmentsList = {
  id: number;
  name: string;
  role: string;
  date: string | Date;
  status: string;
};
