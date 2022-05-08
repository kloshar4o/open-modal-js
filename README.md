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
      <a href="#" class="modal-close x-icon"></a>
      <div class="modal-content">
        Content
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

<summary> Template </summary>

Full template example in index.html

Disclaimer:
None of the css classes or semantic structure bellow are required for the modal to work,
you can use your own classes, styles and semantics.

Although if you want to have all accessibility features,
it is recommended to keep the semantics and attributes,
except the class attributes, they are only for styling

Accessibility attributes info https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html

```html
<!--head-->
<link rel="stylesheet" href="/assets/css/default-modal-styles.css" />
<script src="/dist/open-modal-js.umd.js"></script>
```

```html
<!--body-->
<button class="open-main-modal">Open Main Modal</button>

<div id="main-modal" class="modal">
  <!--Modal should close on .modal-overlay click-->
  <div class="modal-overlay"></div>

  <!--Prevents from focusing outside the modal via TAB press-->
  <div tabindex="0"></div>

  <!--Must have wrapper, for the content scroll to work properly-->
  <div
    class="modal-card"
    role="dialog"
    aria-modal="true"
    aria-labelledby="main-modal-label"
    aria-describedby="main-modal-description"
  >
    <!--Adds background, wraps elements, keeps max. height/width to fit the screen-->
    <div class="modal-body">
      <!--.modal-close elements close the modal-->
      <a href="#" role="button" aria-label="Close modal" class="modal-close x-icon"></a>

      <!-- .modal-header Keeps the content sticky on top-->
      <div id="main-modal-label" class="modal-header">
        <h3>Modal Title</h3>
      </div>

      <!-- .modal-content Scrollable content-->
      <div id="main-modal-description" class="modal-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda,
          blanditiis expedita facere, facilis neque nesciunt officiis optio perspiciatis
          quibusdam quidem sed. Dignissimos dolorum inventore magnam repellat sed, velit
          voluptatum.
        </p>
      </div>

      <!-- .modal-footer Keeps the content sticky on bottom-->
      <div class="modal-footer">
        <!--.modal-close elements close the modal-->
        <div>
          <button class="modal-close">Close Modal</button>
        </div>

        <b>Modal Footer</b>
      </div>
    </div>
  </div>

  <!--Prevents from focusing outside the modal via TAB press-->
  <div tabindex="0"></div>
</div>

<script>
  const OpenModalJs = window.OpenModalJs;
  const mainModal = new OpenModalJs("main-modal");
  const openButton = document.querySelector(".open-main-modal");
  openButton.addEventListener("click", mainModal.openModal.bind(mainModal));
</script>
```

</details>

<details>

<summary> Arguments </summary>

All arguments example with its default values:

```javascript
new OpenModalJs(
  'some-id', // required
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

Arguments Details:

```javascript
new OpenModalJs(modalId, config, callback)
```

### `modalId` - HTML id Attribute of the modal
### `config` -  Configurations

| Property           | Type      | Default           | Description                                                                                                                                       |
|--------------------|-----------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `openOnInit`       | `boolean` | `false`           | _Make the modal open by default_                                                                                                                  |
| `openClass`        | `string`  | `"open"`          | _The css class that will be added and removed when opening closing modal_                                                                         |
| `overlayClass`     | `string`  | `"modal-overlay"` | _CSS class for the overlay which will close the modal on click by default. <br/> Set to empty string if you want to disable close on click_       |
| `closeButtonClass` | `string`  | `"modal-close"`   | _CSS class for the close buttons which will close the modal on click by default. <br/> Set to empty string if you want to disable close on click_ |

### `callback` - Object of callbacks
- `callback.onOpening` - .open css class added ("transitionstart")
- `callback.onOpened` - opening css transition end or canceled ("transitionend" or "transitioncancel")
- `callback.onClosing` - .open css class removed ("transitionstart")
- `callback.onClosed` - closing css transition end ("transitionend" or "transitioncancel")

if the modal doesn't have css `transition-duration`,  
both events will fire at the same time
`onOpening` with `onOpened` or  
`onClosing` with `onClosed`

</details>

<details>

<summary> Open/Close </summary>

```javascript
const modal = new OpenModalJs('some-element-id')

//Open modal
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

<summary> Events </summary>

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

if the modal doesn't have css `transition-duration`,  
both events will fire at the same time  
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
Since we are using the build source inside index.html,  
we need to run `build:watch` as well
```npm
npm run build:watch
```
That's because we want the index.html, be usable with cypress test driven development

### **Cypress:**
```npm
npm run cy:open
```
Cypress uses the build source, use `build:watch` to rebuild the lib on every change
```npm
npm run build:watch
```
Cypress will reload on every rebuild, thanks to `cypress-watch-and-reload`


