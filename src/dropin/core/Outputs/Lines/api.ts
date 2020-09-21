import { ModelAPI } from "../../Formats/Models/API"
import { LineId, LineData, LineResponse } from "./data"
import { Line } from "./entity"
import { API, FetchMethod } from "../../Code/API"

export const Lines = ModelAPI<LineId, LineData, LineResponse, Line>([ "lines" ], data => new Line(data), {
  search: (query: string) => API.request<Line[]>(FetchMethod.GET, [ "search" ], { q: query }),
})
