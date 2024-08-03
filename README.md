# HTMX Sequential Load

A lightweight, drop-in solution for HTMX to manage sequential loading of multiple requests while looping htmx content with `load` trigger.

Instead of using `load` within a loop use `sqload` and it just works. This is only nessesary if your server cannot reliably handle a loop triggering many htmx load events all at once.

`sqload` is a custom event and is more of a convenience. (there are other ways to handle this situation for sure)

## Usage

1. Add the `hx-trigger="sqload"` attribute to your HTMX elements:

   ```html
   <div hx-get="/api/data" hx-trigger="sqload" hx-swap="outerHTML"></div>
   ```

2. Include the following JavaScript in your page:

   ```javascript
   document.addEventListener("DOMContentLoaded", function() {
     const delay = 1000; // Delay between requests in milliseconds
     const items = document.querySelectorAll('[hx-trigger="sqload"]');
     
     function triggerNextLoad(index) {
       if (index < items.length) {
         const item = items[index];
         item.dispatchEvent(new Event('sqload'));
         setTimeout(() => triggerNextLoad(index + 1), delay);
       }
     }

     // Start the sequence after a short initial delay
     setTimeout(() => triggerNextLoad(0), 100);
   });
   ```

3. Or use sqload.js 

```html
<script src="sqload.js"></script>
<script>
  HTMXSqLoad.init({
    delay: 1500,  // Optional: custom delay in ms (default is 1000)
    initialDelay: 200  // Optional: custom initial delay in ms (default is 100)
  });
</script>
```


## Configuration

You can adjust two main parameters in the script:

- `delay`: Time in milliseconds between each request (default: 1000)
- `Initial delay`: Time in milliseconds before starting the sequence (default: 100, set in the last line of the script)

Modify these values according to your specific needs and server capabilities.

