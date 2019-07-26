import "./editor.scss";
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

import { fromEvent } from "rxjs";

declare var FroalaEditor;


function initBlockToolbar(document) {
    let blockElms = document.querySelectorAll('.fdb-block');
    let blockToolbar: HTMLElement = document.querySelector('.fp-block-toolbar');
    let removeBtn = blockToolbar.querySelector('.fp-remove-btn');
    let moveUpBtn = blockToolbar.querySelector('.fp-moveUp-btn');
    removeBtn.addEventListener('click', function (e) {
        console.log('remove');
        let activeBlock = document.querySelector('.fp-active');
        activeBlock.parentElement.removeChild(activeBlock);
    })

    moveUpBtn.addEventListener('click', function () {
        console.log('up');
        let activeBlock = document.querySelector('.fp-active');
        activeBlock.parentElement.insertBefore(activeBlock, activeBlock.previousElementSibling);
        activeBlock.scrollIntoView({
            behavior: "smooth"
        });

    })

    function getToolbarTop(top) {
        if (top < 0) {
            return 0;
        } else {
            return top;
        }
    }

    function getElementClientTop(element) {
        let top = element.getBoundingClientRect().top;
        return getToolbarTop(top) + 'px';
    }

    function updateToolbarTop(activeBlockElement) {
        blockToolbar.classList.add('fp-visible');
        blockToolbar.style.top = getElementClientTop(activeBlockElement);
        let activeBlock = document.querySelector('.fp-active');
        if (activeBlock.parentElement.firstElementChild === activeBlock) {
            moveUpBtn.setAttribute('disabled', 'disabled');
            moveUpBtn.classList.add('fp-disabled');
        } else {
            moveUpBtn.removeAttribute('disabled');
            moveUpBtn.classList.remove('fp-disabled');
        }
    }

    for (let i = 0; i < blockElms.length; i++) {
        let blockElm = blockElms[i];
        blockElm.addEventListener('mouseenter', function (e) {
            console.log('mouseent')
            let activeBlock = document.querySelector('.fp-active');
            if (activeBlock) {
                activeBlock.classList.remove('fp-active');
                this.classList.add('fp-active');
                updateToolbarTop(this);
            } else {
                this.classList.add('fp-active');
                updateToolbarTop(this);
            }

        })
    }




    let containerScroll$ = fromEvent(document.querySelector('#example'), 'scroll');

    containerScroll$
        .subscribe(e => {
            let activeBlock = document.querySelector('.fp-active');
            if (activeBlock) {
                updateToolbarTop(activeBlock)
            } else {

            }
        })
}
function initEditor() {
    let dataList = JSON.parse(localStorage.getItem('dataList'));
    let mapDataList;
    if (dataList) {
        mapDataList = dataList.slice();
    } else {
    }
    var editor = new FroalaEditor('#example .row > div', {
        toolbarInline: true,
        charCounterCount: false,
        toolbarVisibleWithoutSelection: true,
        events: {
            'initialized': function () {
                // Do something here.
                // this is the editor instance.
                // loadData(editor);
                console.log(this);
                if (mapDataList) {
                    this.html.set(dataList.shift());
                } else {

                }
            }
        }
    })


    let saveButton = document.querySelector('[title="Download"]');
    let loadButton = document.querySelector('[title="Load"]');
    saveButton.addEventListener('click', function () {
        let dataList = [];
        dataList = editor.map(ins => ins.html.get());
        localStorage.setItem('dataList', JSON.stringify(dataList));

    })
    loadButton.addEventListener('click', function () {
        loadData(editor);
    })


    function loadData(editors) {
        let dataList = [];
        dataList = JSON.parse(localStorage.getItem('dataList'));
        editors.forEach((ins, i) => {
            ins.html.set(dataList[i]);
        })
    }

}

