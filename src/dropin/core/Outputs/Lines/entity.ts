import { ModelEntity } from "../../Formats/Models/Entity"
import { LineId, LineData } from "./data"

export class Line extends ModelEntity<LineId, LineData> implements LineData {
  data: LineData["data"]

  constructor(data: LineData) {
    super(data)
    this.data = data.data
  }

  save(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  delete(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  toJS(): LineData<any> {
    throw new Error("Method not implemented.")
  }
  validate(): Promise<import("../..").Issue[]> {
    throw new Error("Method not implemented.")
  }
}
