import "../styles/style.scss";
import { fromEvent } from "rxjs";
function initBlockToolbar(document, parentDocument) {
    let blockElms = document.querySelectorAll('.fdb-block');
    let blockToolbar: HTMLElement = parentDocument.querySelector('.fp-block-toolbar');
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
        // activeBlock.scrollIntoView({
        //     behavior: "smooth"
        // });

    })

    function getTop(top) {
        if (top < 0) {
            return 0;
        } else {
            return top * 0.25 + 19;
        };
    }

    function getLeft(left) {
        if (left < 0) {
            return 0;
        } else {
            return left * 0.25 + 19;
        };
    }

    function getToolbarPositionNumber(clientRect: ClientRect) {
        let { top, left } = clientRect;
        return { top: getTop(top), left: getLeft(left) }
    }

    function getToolbarPosition(element: HTMLElement) {
        let clientRect = element.getBoundingClientRect();
        let { left, top } = getToolbarPositionNumber(clientRect);
        return { left: left + 'px', top: top + 'px' };
    }

    function updateToolbarTop(activeBlockElement) {
        blockToolbar.classList.add('fp-visible');
        let position = getToolbarPosition(activeBlockElement);
        blockToolbar.style.top = position.top;
        blockToolbar.style.left = position.left;
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




    // let containerScroll$ = fromEvent(document.querySelector('#example'), 'scroll');

    // containerScroll$
    //     .subscribe(e => {
    //         let activeBlock = document.querySelector('.fp-active');
    //         if (activeBlock) {
    //             updateToolbarTop(activeBlock)
    //         } else {

    //         }
    //     })
}

let iframe = document.querySelector('iframe');
let iframeDoc = iframe.contentDocument;
initBlockToolbar(iframeDoc, document);