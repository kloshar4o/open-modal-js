# JSModal

## Description

Vanilla JS modal, that uses single `.open` class to show or hide the modal.

## Quick start

-> **Without npm**

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
    