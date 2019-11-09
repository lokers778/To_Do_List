"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var task = function task(name, description, color, value) {
    _classCallCheck(this, task);

    this.name = name;
    this.description = description;
    this.color = color;
    this, value = value;
};

var formInputs = {
    newTaskButton: document.querySelector("button[type='submit']"),
    title: document.querySelector("input[type='text']"),
    bgColor: document.querySelector("input[type='text']"),
    importantRange: document.querySelector("select"),
    description: document.querySelector("textarea")
};
var tasks = [];
console.log(formInputs);