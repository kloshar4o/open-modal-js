# JSModal

## Description

Vanilla JS modal, that simply adds a `.open` class to show the modal.

## Quick start

-> **Without package manager**

Download source files
- css from _public/css/default-modal-styles.css_
- js from _dist/js-modal.es.js_
<details>

<summary> 
Include like in the example from /example/index.html 
</summary>

```html
<link rel="stylesheet" href="default-modal-styles.css">
<script src="js-modal.es.js"></script>
<script> const modal = new ModalController('modal', true) </script>
<button onclick="modal.openModal()">Open modal</button>

<div id="modal" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-card">
        <div class="modal-body">
            <div class="modal-header">ModalController</div>
            <div class="modal-content">Content</div>
            <div class="modal-footer">
                <button class="modal-close">Close</button>
            </div>
        </div>
    </div>
</div>
```
</details>

**Create new modal:**
```javascript
new Modal('some-element-id')
```
**Open close modal**
```javascript
const modal = new Modal('some-element-id')

//Open the modal
modal.openModal()
//or
modal.isOpen = true

//Close modal
modal.closeModal()
//or
modal.isOpen = false
```

**Listen for events**
```javascript
const handler = (event) => {
    event.detail //<- access the modal object
}
document.addEventListener('opening:modal', handler) // .open css class added
document.addEventListener('opened:modal', handler) // openning css transition end ("transitionend")
document.addEventListener('closing:modal', handler) // .open css class removed 
document.addEventListener('closed:modal', handler) // closing css transition end ("transitionend")
```
