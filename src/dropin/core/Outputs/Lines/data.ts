import { ModelResponse, ModelResponseUpdatable } from "../../Formats/Models/Response"

export type LineId = string

export type LineData<Data = any> = {
  data: Data
}

export type LineResponse = ModelResponse<LineId> & LineData & ModelResponseUpdatable
