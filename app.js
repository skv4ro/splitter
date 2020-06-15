import { Splitter } from "./src/splitter";

var element = document.querySelector("#app");

var config = {
    numOfPanes: 4
}

var splitter = new Splitter(element, config.numOfPanes);
splitter.panes[1].element.style.backgroundColor = "#567";
splitter.panes[2].element.style.backgroundColor = "#675";
splitter.panes[3].element.style.backgroundColor = "#756";
if(splitter.panes[4] != undefined) splitter.panes[4].element.style.backgroundColor = "#576";

splitter.panes[0].element.style.height = "100%";
splitter.panes[1].element.style.height = "75%";
splitter.panes[2].element.style.height = "50%";

window.test = function test() {
    splitter.panes[2].initPosition();
    splitter.panes[2].move(-5);
}