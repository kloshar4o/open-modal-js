# JSModal

## Description

Vanilla JS modal, that simply adds a `.open` class to show the modal.

## Quick start

Download source files
- css from _assets/css/default-modal-styles.css_ (feel free to use your own style)
- js from _dist/open-modal-js.umd.js_

HTML:
```html

<div id="modal" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-card">
    <div class="modal-body">
      <div class="modal-content">Content</div>
      <div class="modal-footer">
        <button class="modal-close">Close</button>
      </div>
    </div>
  </div>
</div>
```
JavaScript:
```javascript
new OpenModalJs('modal')
```

## Details

<details>

<summary> 
Template 
</summary>

Include like in the example from /example/index.html

```html
<link rel="stylesheet" href="default-modal-styles.css">
<script src="open-modal-js.umd.js"></script>
<script> const modal = new OpenModalJs('modal', true) </script>
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

<details>
<summary>
Arguments
</summary>

```javascript
new OpenModalJs(modalId, config, callback)
```


###`modalId` HTML id Attribute (required)
### `config` OpenModalJs configurations

| Property           | Type      | Default           | Description                                                                                                                                       |
|--------------------|-----------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `openOnInit`       | `boolean` | `false`           | _Make the modal open by default_                                                                                                                  |
| `openClass`        | `string`  | `"open"`          | _The css class that will be added and removed when opening closing modal_                                                                         |
| `overlayClass`     | `string`  | `"modal-overlay"` | _CSS class for the overlay which will close the modal on click by default. <br/> Set to empty string if you want to disable close on click_       |
| `closeButtonClass` | `string`  | `"modal-close"`   | _CSS class for the close buttons which will close the modal on click by default. <br/> Set to empty string if you want to disable close on click_ |

### `Callback`

Object of callbacks, which are fired when
- `callback.onOpening` - .open css class added ("transitionstart")
- `callback.onOpened` - opening css transition end or canceled ("transitionend" or "transitioncancel")
- `callback.onClosing` - .open css class removed ("transitionstart")
- `callback.onClosed` - closing css transition end ("transitionend" or "transitioncancel")

if the modal doesn't have css `transition-duration`both events will fire  
`onOpening` with `onOpened` or  
`onClosing` with `onClosed`

All props example:
```javascript
new OpenModalJs(
  'some-id', 
  {
    openOnInit: false,
    openClass: "open",
    overlayClass: "modal-overlay",
    closeButtonClass: "modal-close",
  }, 
  {
    onOpening: () => {},
    onOpened: () => {},
    onClosing: () => {},
    onClosed: () => {},
  }
)

```
</details>


<details>
<summary>
Open/Close
</summary>

```javascript
const modal = new OpenModalJs('some-element-id')

//Open the modal
modal.openModal()
//or
modal.isOpen = true

//Close modal
modal.closeModal()
//or
modal.isOpen = false
```
</details>

<details>
<summary>
Events
</summary>

**Listen for events**
```javascript
const handler = (event) => {
  const modal = event.detail; //<- access the modal object
    
  if(modal.modalId === 'some-element-id'){
    //Do something
  }
}

document.addEventListener('opening:modal', handler) // .open css class added ("transitionstart")
document.addEventListener('opened:modal', handler) // opening css transition end or canceled ("transitionend" or "transitioncancel")
document.addEventListener('closing:modal', handler) // .open css class removed ("transitionstart")
document.addEventListener('closed:modal', handler) // closing css transition end ("transitionend" or "transitioncancel")
```
if the modal doesn't have css `transition-duration`both events will fire  
`opening:modal` with `opened:modal` or  
`closing:modal` with `closed:modal`

</details>

## Dev env
Clone/download repo and install dependencies
```npm
npm i
```

### **Hot reload:**
```npm
npm run dev
```
Since we are using the build inside index.html,  
we need to run `build:watch` as well
```npm
npm run build:watch
```
Thats because we want the index.html, be usable with cypress test driven development

### **Cypress:**
```npm
npm run cy:open
```
Cypress uses the build folder, use `build:watch` to rebuild the lib on every change
```npm
npm run build:watch
```
Cypress will reload on every rebuild, thanks to `cypress-watch-and-reload`


