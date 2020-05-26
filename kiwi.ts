import { serve } from "https://deno.land/std/http/server.ts"
import { exists, readFileStr } from "https://deno.land/std@0.51.0/fs/mod.ts"
import { join } from "https://deno.land/std/path/mod.ts"

const port = 8080

const server = serve({ port })
console.log("Kiwi Bundle for Deno started on port", port)
for await (const request of server) {
  const path = join(new URL(".", import.meta.url).pathname, "src", request.url)
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
