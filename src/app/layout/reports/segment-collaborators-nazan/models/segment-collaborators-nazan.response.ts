export class SegmentCollaboratorsNazanResponse {
  store_id: string | null = null;
  segment: number | null = null;
  membership: string | null = null;
  client_id: string | null = null;
  first_name: string | null = null;
  second_name: string | null = null;
  last_name: string | null = null;
  second_last_name: string | null = null;
  cellphone_number: string | null = null;
  mail: string | null = null;
  birthday: string | null = null;
  gender: string | null = null;
  marital_status: string | null = null;
  signup_date: string | null = null;
}

export const segmentCollaboratorsNazanResponseName = {
  store_id: 'Tienda',
  segment: '',
  membership: 'Numero socio',
  client_id: 'Id cliente',
  first_name: 'Primer nombre',
  second_name: 'Segundo nombre',
  last_name: 'Primer apellido',
  second_last_name: 'Segundo apellido',
  cellphone_number: 'Numero celular',
  mail: 'Email ',
  birthday: 'Fecha nacimiento',
  gender: 'Género',
  marital_status: 'Estado civil',
  signup_date: 'Fecha de registro ',
};
