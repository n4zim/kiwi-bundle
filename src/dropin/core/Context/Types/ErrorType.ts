
export enum ErrorType {
  "UNAUTHORIZED", // No access allowed
  "UNFINDABLE",   // No element
  "INCOMPATIBLE", // Wrong format
  "INCOMPLETE",   // Has missing elements
  "UNEXPECTED",   // Has unwanted elements
  "OFFLINE",      // Requires Internet access
  "UNKNOWN",      // None of these errors
}
