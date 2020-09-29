
export interface GoogleMapsOptionsBounds {
  west: number
  east: number
  south: number
  north: number
}

export interface GoogleMapsOptionsStyle {
  elementType?: any
  stylers: { [property: string]: any }[]
  featureType?: any
}

export interface GoogleMapsOptions {
  apiKey: string
  bounds: GoogleMapsOptionsBounds
  style: GoogleMapsOptionsStyle[]
}
