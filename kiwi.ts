import { serve } from "https://deno.land/std/http/server.ts"
import { exists, readFileStr } from "https://deno.land/std/fs/mod.ts"
import { join } from "https://deno.land/std/path/mod.ts"

interface Options {
  port: number
}

export default async function KiwiBundle(options: Options = { port: 8080 }) {
  const server = serve({ port: options.port })
  console.log("Kiwi Bundle for Deno started on port", options.port)
  const root = new URL(".", import.meta.url).pathname
  for await (const request of server) {
    const path = join(root, "src", request.url)
    exists(path).then(exists => {
      if(exists) {
        readFileStr(path).then(body => {
          request.respond({ body })
        })
      } else {
        request.respond({ status: 404, body: "Not found" })
      }
    })
  }
}
