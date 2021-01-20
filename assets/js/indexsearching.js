function search() {
    var input = document.getElementById('search-box').value;
    input = input.trim();
    input = input.toLowerCase();
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var found = false;
        // is the input in the title
        if (list[i].title.toLowerCase().includes(input)) {
            found = true;
        }
        // is the input in the description
        else if (!found) {
            for (var j = 0; j < list[i].desc.length; j++) {
                if (list[i].desc[j].toLowerCase().includes(input)) {
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            result.push(list[i].id);
        }
    }
    searchDisplay(result)
}

function searchDisplay(hidevalues) {
    if (hidevalues.length == list.length) {
        hideAll();
        var nonefound = document.getElementById('none-found');
        nonefound.style.display = "block";
    }
    else {
        for (var i = 0; i < hidevalues.length; i++) {
            var element = document.getElementById(hidevalues[i])
            if (!element.classList.contains("hide")) {
                element.classList += " hide";
            }
        }
    }
}