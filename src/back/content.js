import "./styles/style.scss";
// let articleEle = document.querySelector('.article');
// articleEle.addEventListener('dblclick',function(e){
//     let currentElement = e.target as HTMLElement;
//     currentElement.contentEditable = 'true';
//     currentElement.focus();
// })
let modal = document.querySelector('.modal');
loadHtml();
function loadHtml(){
    // Send the update content to the server to be saved
    function onStateChange(ev) {
        // Check if the request is finished
        if (ev.target.readyState == 4) {
            if (ev.target.status == '200') {
                console.log(ev)
                let attr = 'main-content';
                let html = JSON.parse(ev.target.response)[attr];
                document.querySelector(`[data-name="${attr}"]`).innerHTML = html;

                // Save was successful, notify the user with a flash
            } else {
                // Save failed, notify the user with a flash
               
            }
        }
    };

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', onStateChange);
    xhr.open('GET','http://localhost:3000/file');
    xhr.send();
}
window.addEventListener('load', function () {
    var editor;
    // ContentTools.StylePalette.add([
    //     new ContentTools.Style('Author', 'author', ['p'])
    // ]);
    editor = ContentTools.EditorApp.get();
    let ignition = new ContentTools.IgnitionUI();
    ignition.addEventListener('edit', function (e) {
        console.log(e)
    })
    ignition.edit()
    console.log(ignition)
    editor.init('*[data-editable]', 'data-name');
    editor.addEventListener('start', () => {
        console.log('start');
        modal.classList.add('full');
    })

    editor.addEventListener('stop', () => {
        console.log('stop');
        modal.classList.remove('full');
    })
    editor.addEventListener('tool-apply', () => {
        console.log('tool-apply');
    })
    editor.addEventListener('tool-applied', () => {
        this.console.log('toll-applied')
    })
    editor.addEventListener('saved', function (ev) {
        var name, payload, regions, xhr;
        console.log(ev.detail())
        // Check that something changed
        regions = ev.detail().regions;
        if (Object.keys(regions).length == 0) {
            return;
        }

        // Set the editor as busy while we save our changes
        this.busy(true);

        // Collect the contents of each region into a FormData instance
        payload = {};
        for (name in regions) {
            if (regions.hasOwnProperty(name)) {
                payload[name] = regions[name];
            }
        }

        // Send the update content to the server to be saved
        function onStateChange(ev) {
            // Check if the request is finished
            if (ev.target.readyState == 4) {
                editor.busy(false);
                if (ev.target.status == '201') {
                    // Save was successful, notify the user with a flash
                    new ContentTools.FlashUI('ok');
                } else {
                    // Save failed, notify the user with a flash
                    new ContentTools.FlashUI('no');
                }
            }
        };

        xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', onStateChange);
        xhr.open('POST', 'http://localhost:3000/file');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(payload));
    });
});

document.querySelector('#update').addEventListener('click', function (e) {
    modal.classList.add('full');
})
