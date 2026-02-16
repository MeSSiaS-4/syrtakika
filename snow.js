/*!
// Snow.js - v0.0.3
// kurisubrooks.com
// Modified for syrtakika.de
*/

// --- DATE LOGIC START ---
var now = new Date();
var month = now.getMonth() + 1; // January is 0
var day = now.getDate();
var snowEntity = "";
var snowColor = ["#DDD", "#EEE"]; // Default snowflake colors

// Period 1: December 1st to February 4th (Snowflakes)
if ((month === 12) || (month === 1) || (month === 2 && day <= 4)) {
    snowEntity = "&#x2744;";
    snowColor = ["#DDD", "#EEE", "#FFF"]; // White/Silver tones
} 
// Period 2: February 5th to February 13th (Hearts)
else if (month === 2 && day >= 5 && day <= 13) {
    snowEntity = "&#x2764;&#xfe0f;";
    snowColor = ["#FF0000", "#DC143C"]; // Red tones for hearts
}
// --- DATE LOGIC END ---

// Amount of Snowflakes
var snowMax = 50;

// Falling Velocity
var snowSpeed = 0.75;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

// Refresh Rate (in milliseconds)
var snowRefresh = 50;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

// Check if we should even run the script
if (snowEntity !== "") {

    var snow = [],
        pos = [],
        coords = [],
        lefr = [],
        marginBottom,
        marginRight;

    function randomise(range) {
        rand = Math.floor(range * Math.random());
        return rand;
    }

    function initSnow() {
        var snowSize = snowMaxSize - snowMinSize;
        marginBottom = document.body.scrollHeight - 5;
        marginRight = document.body.clientWidth - 15;

        for (i = 0; i <= snowMax; i++) {
            coords[i] = 0;
            lefr[i] = Math.random() * 15;
            pos[i] = 0.03 + Math.random() / 10;
            snow[i] = document.getElementById("flake" + i);
            snow[i].style.fontFamily = "inherit";
            snow[i].size = randomise(snowSize) + snowMinSize;
            snow[i].style.fontSize = snow[i].size + "px";
            snow[i].style.color = snowColor[randomise(snowColor.length)];
            snow[i].style.zIndex = 1000;
            snow[i].sink = snowSpeed * snow[i].size / 5;
            snow[i].posX = randomise(marginRight - snow[i].size);
            snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
            snow[i].style.left = snow[i].posX + "px";
            snow[i].style.top = snow[i].posY + "px";
        }

        moveSnow();
    }

    function resize() {
        marginBottom = document.body.scrollHeight - 5;
        marginRight = document.body.clientWidth - 15;
    }

    function moveSnow() {
        for (i = 0; i <= snowMax; i++) {
            coords[i] += pos[i];
            snow[i].posY += snow[i].sink;
            snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
            snow[i].style.top = snow[i].posY + "px";

            if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
                snow[i].posX = randomise(marginRight - snow[i].size);
                snow[i].posY = 0;
            }
        }

        setTimeout("moveSnow()", snowRefresh);
    }

    for (i = 0; i <= snowMax; i++) {
        document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
    }

    window.addEventListener('resize', resize);
    window.addEventListener('load', initSnow);
}
