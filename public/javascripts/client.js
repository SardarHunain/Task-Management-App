const { raw } = require("express")

const publicVapidKey = "BB_eoy2XCfrMzaAmj8K1oP4-wcHYt9cDnuJTOpjPm82EVeXnJuq11McITReIkQI5a8To_A7JjRyVWoilSmhOQTM"

if('serviceWorker' in Navigator){
    send().catch(err=>{console.error(err)})
}

async function send(){
    const register = await navigator.serviceWorker.register('./worker.js',{
        scope:'/'
    })
    console.log("serviceWorker registered")

    const pushSubscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey),
    })
}

function urlBase64ToUint8Array(base64String){
    const padding='='.repeat((4-base64String.length%4)%4)
    const base64 = (base64String + padding).replace(/\-/g,'+').replace(/_/g,'/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for(let i = 0;i<rawData.length;++i){
        outputArray[i]=rawData.charCodeAt(i);
    }
    return outputArray;

}