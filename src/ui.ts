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

        let base64 = btoa(new Uint8Array(event.data.pluginMessage.bytes).reduce((data, byte) => {
            return data + String.fromCharCode(byte)
        }, ''));
        data.append('image.base64', base64);

        data.append("format", "result");
        data.append("test", "true");

        fetch('https://clippingmagic.com/api/v1/images', {
            method: 'POST',
            headers: {'Authorization': event.data.pluginMessage.apikey},
            body: data
        }).then((response: Response) => {
            if (!response.ok) {
                throw response
            }
            return response
        }).then((response: Response) => {
            response.arrayBuffer().then((res: ArrayBuffer) => {
                parent.postMessage({
                    pluginMessage: new Uint8Array(res)
                }, '*')
            })
        }).catch(response => {
            if (response.hasOwnProperty("json")) {
                response.json().then(res => {
                    parent.postMessage({
                        pluginMessage: res
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
