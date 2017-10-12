import { inject } from 'aurelia-framework';

@inject(Element)
export class WookmarkCustomAttribute {
    constructor(element) {
        this.element = $('#' + element.id);
        this.container = new Wookmark(element, {
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: this.element.parentNode, // Optional, used for some extra CSS styling
            offset: 20, // Optional, the distance between grid items
            itemWidth:280 // Optional, the width of a grid item
        });

        this.applyLayout = () => {
            this.element.imagesLoaded(function() {
                // Destroy the old handler
                if ($handler.wookmarkInstance) {
                    $handler.wookmarkInstance.clear();
                }

                // Create a new layout handler.
                $handler = $('li', $tiles);
                $handler.wookmark(options);
            });
        }
    }

    valueChanged(newValue, oldValue) {
        console.log("nv", newValue);
        console.log("ov", oldValue);
    }
}

