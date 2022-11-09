
type Without<A, B> = {
  [R in Exclude<keyof A, keyof B>]?: never
}

export type XOR<A, B> = (A | B) extends object ? (Without<A, B> & B) | (Without<B, A> & A) : A | B
