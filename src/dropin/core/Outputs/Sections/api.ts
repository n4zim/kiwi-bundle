import { ModelAPI } from "../../Formats"
import { SectionId, SectionData, SectionResponse } from "./data"
import { Section } from "./entity"

export const Sections = ModelAPI<SectionId, SectionData, SectionResponse, Section>([ "sections" ], data => new Section(data))
