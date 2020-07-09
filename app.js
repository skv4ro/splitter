import { Splitter } from "./src/splitter";
import { Mover } from "./src/mover";
import AttachedItem from "./src/attacheditem";

var element = document.querySelector("#app");

var config = {
    numOfPanes: 4
}

var splitter = new Splitter(element, config);
splitter.panes[0].element.style.backgroundColor = "#567";
splitter.panes[1].element.style.backgroundColor = "#675";
splitter.panes[2].element.style.backgroundColor = "#756";
if(splitter.panes[3] != undefined) splitter.panes[3].element.style.backgroundColor = "#576";

window.test = function test() {
    console.log("Ahoj svet");
}

let line = new AttachedItem();
line.offset = -1;
line.element.style.width = "2px";
line.element.style.height = "100%";
line.element.style.background = "black";
element.appendChild(line.element);

splitter.panes[1].attachItem(splitter.movers[0]);
splitter.panes[2].attachItem(splitter.movers[1]);
splitter.panes[3].attachItem(splitter.movers[2]);
splitter.panes[1].attachItem(line);

splitter.panes[0].minWidth = 50;
splitter.panes[1].minWidth = 55;
splitter.panes[2].minWidth = 60;
splitter.panes[3].minWidth = 65;

splitter.panes[0].updateLimits();
splitter.panes[1].updateLimits();
splitter.panes[2].updateLimits();
splitter.panes[3].updateLimits();
