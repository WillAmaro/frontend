export interface IUser {
  id:number;
  name:string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  type_per_id: number;
  type_doc_id: number;
  document_number: string;
  phone: string;
  ubigeo: string;
  address: string;
  password: string;
  password_confirmation: string;
  tenant_id: number;
}