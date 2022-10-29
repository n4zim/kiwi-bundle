
export type KeysObject<Content, Data = { [index: string]: Content }> = {
  [index in keyof Data]: Content
}
