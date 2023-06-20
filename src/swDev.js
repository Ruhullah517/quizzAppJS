export default function swDev() {

    function determineAppServerKey() {
        var vapidPublicKey = "BG-7M6F3HyItWINvyZelLTE6z31XZ_Of_-r-Z7tYEjnYy2TEuL6qLysh5UOXqmBZvVlpDqYAFfMxBQdDAZwYpjY";
        return urlBase64ToUint8Array(vapidPublicKey);
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray;
    }

    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    // if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(swUrl)
        .then((response) => {
            console.log("SW registered successfully", response);
            // return response.pushManager.getSubscription()
            //     .then((subscription) => {
            //         return response.pushManager.subscribe({
            //             userVisibleOnly: true,
            //             applicationServerKey: determineAppServerKey()
            //         })
            //     })
        })
    // }
}