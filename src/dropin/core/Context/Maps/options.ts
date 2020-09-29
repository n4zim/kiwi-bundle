import { MapType } from "../Types/MapType"
import { GoogleMapsOptions } from "./Google"

export type MapOptions = ({ type: MapType.GoogleMaps } & GoogleMapsOptions)
