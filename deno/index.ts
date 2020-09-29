import { serve } from "https://deno.land/std/http/server.ts"
import { join } from "https://deno.land/std/path/mod.ts"
import { exists, readFileStr } from "https://deno.land/std/fs/mod.ts"

const Server = async (name: string, port: number) => {
  const server = serve({ port })
  console.log(`Kiwi Bundle for "${name}" started on port ${port}`)
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

const WaitForURL = (url: string) => fetch(url).then(() => {
  return Promise.resolve()
}).catch(() => new Promise(resolve => {
  console.log(`"${url}" not available, waiting...`)
  setTimeout(() => {
    resolve(WaitForURL(url))
  }, 1000)
}))

const name = Deno.env.get("KIWI_BUNDLE_NAME")
Promise.resolve().then((): any => {
  if(typeof name === "undefined" || name.length === 0) {
    console.error(`Missing "KIWI_BUNDLE_NAME" environment variable`)
    Deno.exit(1)
  }
}).then((): any => {
  const wait = Deno.env.get("KIWI_BUNDLE_WAIT")
  if(typeof wait !== "undefined") {
    return Promise.all(wait.split(",").map(url => WaitForURL(url)))
  }
  return Promise.resolve()
}).then(() => {
  const port = Deno.env.get("KIWI_BUNDLE_PORT")
  Server(name as string, typeof port === "undefined" ? 80 : parseInt(port))
})
