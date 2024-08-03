# HTMX Sequential Load

A lightweight, drop-in solution for HTMX to manage sequential loading of multiple requests. 

`sqload` introduces a custom event that allows you to easily control the timing and sequence of HTMX requests.
By using the `sqload` event, you can effortlessly implement controlled, sequential loading without modifying individual HTMX elements to control their timing. 
`sqload` is more of a convenience, especially when adding htmx `load` event items through a loop and not wanting to add custom delays for each element of the loop.

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
- Initial delay: Time in milliseconds before starting the sequence (default: 100, set in the last line of the script)

Modify these values according to your specific needs and server capabilities.

## Why Use HTMX Sequential Load?

- Prevents overwhelming your server with simultaneous requests
- Improves performance for databases with limited concurrency (e.g., SQLite)
- Allows heavy processes to execute sequentially without interference
- Simplifies management of multiple HTMX requests on a single page

By using the `sqload` event, you can easily control the timing of your HTMX requests without modifying each individual element's logic.
