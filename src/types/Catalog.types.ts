export interface CompanyDTO {
  id: number;
  reasonSocial: string;
  ruc: string;
  status: string;
}

export interface ProjectDTO {
  id: number;
  name: string;
  companyId: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface DataCatalogoDTO {
  companies: CompanyDTO[];
  projects: ProjectDTO[];
}

export interface CatalogDTO {
  success: boolean;
  data: DataCatalogoDTO;
  message: string;
}