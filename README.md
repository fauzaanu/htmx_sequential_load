# HTMX Sequential Load

This small script is for a very specefic situation.

1. You are loading in htmx load trigger events through a loop from a backend framework
2. You are using sqlite3 which doesnt have great concurrency
3. You have a lot of data being loaded at once and implementing pagination is impossible due to the nature of the data
4. You dont want to really let the loop handle adding delays
5. So you can add this script and change the load events to sqload events
6. The script collects all the events with `sqload` and ques them (staggers them) with a delay with minimal JS

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


[LICENSE](https://github.com/fauzaanu/sqload/blob/main/LICENSE)

