export default function() {
    var scrollbarWidth = 0,
        originalMargin,
        touchHandler = function(event) {
            event.preventDefault();
        };

    function getScrollbarWidth() {
        if (scrollbarWidth) return scrollbarWidth;
        var scrollDiv = document.createElement("div");
        $.each({
                top: "-9999px",
                width: "50px",
                height: "50px",
                overflow: "scroll",
                position: "absolute"
            },
            function(property, value) {
                scrollDiv.style[property] = value;
            }
        );
        $("body").append(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $("body")[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }
}