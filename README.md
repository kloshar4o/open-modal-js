# JSModal

## Description

Vanilla JS modal, that simply adds a `.open` class to show the modal.

## Quick start

-> **Without package manager**

Download source files
- css from _assets/css/default-modal-styles.css_ (feel free to use your own style)
- js from _dist/open-modal.es.js_

HTML:
```html

<div id="some-element-id" class="modal open">
    <div class="modal-overlay"></div>
    <div class="modal-card">
      
        <div class="modal-body">
          Modal Content
        </div>
      
        <div class="modal-footer">
          <button class="modal-close">Close</button>
        </div>
      
    </div>
</div>
```
JavaScript:
```javascript
new Modal('some-element-id')
```

## Details

<details>

<summary> 
Default template 
</summary>

Include like in the example from /example/index.html

```html
<link rel="stylesheet" href="default-modal-styles.css">
<script src="open-modal.es.js"></script>
<script> const modal = new Modal('modal', true) </script>
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
new Modal()
</summary>

```javascript
new Modal(modalId, config, callback)
```


###`modalId` HTML id Attribute (required)
### `config` Modal configurations

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
new Modal(
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
Open close modal
</summary>

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

-> **Hot reload:**
```npm
npm run dev
```

-> **Cypress:**
```npm
npm run cy:open
```
Cypress uses the dist folder,
you can reload build on change via:
```npm
npm run build:watch
```


