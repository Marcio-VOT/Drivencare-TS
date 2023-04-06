export type Pacient = {
  id: number;
  name: string;
  email: string;
  passwor: string;
};

export type Doctor = {
  id: number;
  name: string;
  email: string;
  passwor: string;
  role_id: number;
  state_id: number;
  city_id: number;
};

export type DoctorAppointment = {
  id: number;
  date: string;
  patient: string;
  doctor: string;
  role: string;
  status: string;
};
