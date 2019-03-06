
interface WindowKiwi extends Window {
  kiwi: { sw: string }
}

const W = window as WindowKiwi

if("serviceWorker" in navigator) {
  window.addEventListener("load", () => {

    navigator.serviceWorker.onmessage = message => {
      console.log("message", message)
    }

    navigator.serviceWorker.register(W.kiwi.sw).then(() => {
      return navigator.serviceWorker.ready
    }).then(() => {
      console.log("#CLIENT READY")

      if(navigator.serviceWorker.controller !== null) {
        navigator.serviceWorker.controller.postMessage("client -> sw")
      }

    })
  })
}
