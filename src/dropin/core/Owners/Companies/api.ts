import { ModelAPI } from "../../Formats/Models/API"
import { CompanyData, CompanyId, CompanyResponse } from "./data"
import { Company } from "./entity"

export const Companies = ModelAPI< CompanyId, CompanyData, CompanyResponse, Company>([ "companies" ], data => new Company(data))
