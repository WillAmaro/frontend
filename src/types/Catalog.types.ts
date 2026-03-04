export interface CompanyDTO {
  id: number;
  reasonSocial: string;
  ruc: string;
  status: string;
}

export interface ProjectDTO {
  id: number;
  name: string;
  companyIds: number[]; 
  startDate: string;
  endDate: string;
  status: string;
}

export interface CatalogDTO {
  companies: CompanyDTO[];
  projects: ProjectDTO[];
}