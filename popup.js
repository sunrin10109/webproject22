const modals = document.getElementsByClassName("modal");
const contents = document.getElementsByClassName("content");
const closes = document.getElementsByClassName("close");
var func = [];

function Modal(num) {
    return function () {
        contents[num].onclick = function () {
            modals[num].style.display = "block";
        };
        closes[num].onclick = function () {
            modals[num].style.display = "none";
        };
    };
}
for (var i = 0; i < contents.length; i++) {
    func[i] = Modal(i);
}
for (var j = 0; j < contents.length; j++) {
    func[j]();
}


