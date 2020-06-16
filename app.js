import { Splitter } from "./src/splitter";
import { Mover } from "./src/mover";

var element = document.querySelector("#app");

var config = {
    numOfPanes: 4
}

var splitter = new Splitter(element, config);
splitter.panes[1].element.style.backgroundColor = "#567";
splitter.panes[2].element.style.backgroundColor = "#675";
splitter.panes[3].element.style.backgroundColor = "#756";
if(splitter.panes[4] != undefined) splitter.panes[4].element.style.backgroundColor = "#576";

window.test = function test() {
    console.log("Ahoj svet");
}

splitter.panes[2].attachItem(splitter.movers[0]);
splitter.panes[3].attachItem(splitter.movers[1]);
splitter.panes[4].attachItem(splitter.movers[2]);


splitter.panes[1].minWidth = 25;
splitter.panes[2].minWidth = 30;
splitter.panes[3].minWidth = 35;
splitter.panes[4].minWidth = 40;

//splitter.panes[2].moveCallbacks.push(window.test);