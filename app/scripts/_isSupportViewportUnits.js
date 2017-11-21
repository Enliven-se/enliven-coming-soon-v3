export default function($) {
    // modernizr implementation
    var $elem = $(
        '<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">'
    ).appendTo("body");
    var elem = $elem[0];
    var height = parseInt(window.innerHeight / 2, 10);
    var compStyle = parseInt(
        (window.getComputedStyle ?
            getComputedStyle(elem, null) :
            elem.currentStyle)["height"],
        10
    );
    $elem.remove();
    return compStyle == height;
}