
const ENABLE_LOGGER = true

export const log = (title: string, ...args: any) => {
  if(ENABLE_LOGGER) {
    console.log(`ServiceWorker (${title})`, ...args)
  }
}

export const getSplitedPath = (request: string) => {
  const path = /^https?\:\/\/(?:.*?)\/(.*)$/.exec(request)
  if(path !== null && path.length === 2) {
    return path[1].split("/")
  } else {
    return []
  }
}

export const isRessourceAccepted = (splitedPath: string[]) => {
  return splitedPath.length >= 1
    && splitedPath[0] !== "sockjs-node"
    && !/^.*\.hot-update.js(on)?$/.test(splitedPath[0])
}

const getAssetNameWithHash = (splitedPath: string[]) => {
  const data = /^(.*?)\.[0-9a-z]+\.js$/.exec(splitedPath[1])
  if(data !== null && data.length === 2) {
    return data[1]
  } else {
    return null
  }
}

export const cleanCache = (cache: Cache, splitedPath: string[]) => {
  if(splitedPath.length === 2 && splitedPath[0] === "static") {
    const hashAssetName = getAssetNameWithHash(splitedPath)
    if(hashAssetName !== null) {
      cache.matchAll().then(results => {
        results.forEach(result => {
          const resultSplitedPath = getSplitedPath(result.url)
          if(
            resultSplitedPath.length === 2
            && splitedPath[1] !== resultSplitedPath[1]
            && resultSplitedPath[0] === "static"
            && new RegExp(`^${hashAssetName}\.[0-9a-z]+\.js$`).test(resultSplitedPath[1])
          ) {
            cache.delete(result.url)
          }
        })
      })
    }
  }
}
