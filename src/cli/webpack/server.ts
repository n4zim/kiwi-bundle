import { EventEmitter } from "events"

const m: any = module

if(m.hot) {
  let lastHash: string
  const upToDate = function upToDate() {
    return lastHash.indexOf(__webpack_hash__) >= 0
  }
  const check = function check() {
    if(typeof m.hot !== "undefined") {
      m.hot.check()
        .then(function(updatedModules: any) {
          if(!updatedModules) {
            console.log("[HMR] Cannot find update. Need to do a full reload!")
            console.log("[HMR] (Probably because of restarting the webpack-dev-server)")
            return
          }

          return m.hot
            .apply({
              ignoreUnaccepted: true,
              ignoreDeclined: true,
              ignoreErrored: true,
              onUnaccepted: function(data: any) {
                console.log("Ignored an update to unaccepted module " + data.chain.join(" -> "))
              },
              onDeclined: function(data: any) {
                console.log("Ignored an update to declined module " + data.chain.join(" -> "))
              },
              onErrored: function(data: any) {
                console.log(data.error)
                console.log(
                  "Ignored an error while updating module " +
                  data.moduleId +
                  " (" +
                  data.type +
                  ")"
                )
              }
            })
            .then(function(renewedModules: any) {
              if(!upToDate()) {
                check()
              }

              console.log(updatedModules, renewedModules)

              if(upToDate()) {
                console.log("[HMR] App is up to date.")
              }
            })
        })
        .catch(function(err: any) {
          const status = m.hot.status()
          if(["abort", "fail"].indexOf(status) >= 0) {
            console.log("[HMR] Cannot check for update. Need to do a full reload!")
            console.log("[HMR] " + (err.stack || err.message))
          } else {
            console.log("[HMR] Update check failed: " + (err.stack || err.message))
          }
        })

      }

    const hotEmitter = new EventEmitter()
    hotEmitter.on("webpackHotUpdate", function(currentHash: any) {
      lastHash = currentHash
      if(!upToDate()) {
        const status = m.hot.status()
        if(status === "idle") {
          console.log("[HMR] Checking for updates on the server...")
          check()
        } else if(["abort", "fail"].indexOf(status) >= 0) {
          console.log(
            "[HMR] Cannot apply update as a previous update " +
              status +
              "ed. Need to do a full reload!"
          )
        }
      }
    })

  }

}
