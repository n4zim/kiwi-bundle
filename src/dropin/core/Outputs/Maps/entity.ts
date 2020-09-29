import { ModelEntity } from "../../Formats/Models/Entity"
import { MapId, MapData } from "./data"

export class Map extends ModelEntity<MapId, MapData> implements MapData {
  options: MapData["options"]
  lines: MapData["lines"]

  constructor(data: MapData) {
    super(data)
    this.options = data.options
    this.lines = data.lines
  }

  save(): Promise<any> {
    throw new Error("Method not implemented.")
  }

  delete(): Promise<any> {
    throw new Error("Method not implemented.")
  }

  toJS(): MapData {
    throw new Error("Method not implemented.")
  }

  validate(): Promise<any> {
    throw new Error("Method not implemented.")
  }

}
