import './scss/ui.scss'

var $ = require('jQuery')

$('#setApiKey').on('submit', e => {
    e.preventDefault()
    parent.postMessage({
        pluginMessage: $('#apiKey').val()
    }, '*')
});

window.onmessage = async (event: MessageEvent) => {
    if (event.data.pluginMessage.type == 'key') {
        $('#apiKey').val(event.data.pluginMessage.apikey || '')
    }
    if (event.data.pluginMessage.type == 'run') {

        let data = new FormData();

        data.append('image', new Blob([event.data.pluginMessage.bytes]), `Figma-${new Date().toLocaleString().replace(/\W+/g, "-")}`)
        data.append("format", "result");
        // data.append("test", "true");

        fetch('https://clippingmagic.com/api/v1/images', {
            method: 'POST',
            headers: {'Authorization': event.data.pluginMessage.apikey},
            body: data
        }).then((response: Response) => {
            switch (response.status) {
                case 400:
                    response.json().then(res => {
                        parent.postMessage({
                            pluginMessage: res
                        }, '*')
                    })
                    break;

                case 200:
                    response.arrayBuffer().then((res: ArrayBuffer) => {
                        parent.postMessage({
                            pluginMessage: new Uint8Array(res)
                        }, '*')
                    })
                    break;

                default:
                    throw response;
            }
        }).catch(response => {
            if (typeof response.json == "function") {
                response.json().then(res => {
                    parent.postMessage({
                        pluginMessage: res
                    }, '*')
                }).catch(() => {
                    parent.postMessage({
                        pluginMessage: `Exception: ${response}`
                    }, '*')
                })
            } else {
                parent.postMessage({
                    pluginMessage: `Exception: ${response}`
                }, '*')
            }
        })
    }
}
