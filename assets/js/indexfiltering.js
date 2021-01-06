var filterlist = "";

// add filters to the list
function addFilter(_this, tag) {
    if (_this.classList.contains("active")) {
        _this.classList.remove("active");
        fulltag = tag + ' ';
        filterlist = filterlist.replace(fulltag, '');
    }
    else {
        _this.classList += " active";
        filterlist += tag;
        filterlist += " ";
    }
}

async function filter() {
    var resultcount = 0;
    // can't have both m4f and m4a, bfe and f2l, script fill and improv
    if ((filterlist.search('M4A') != -1 && filterlist.search('M4F') != -1) ||
        (filterlist.search('BFE') != -1 && filterlist.search('Friends-to-Lovers') != -1) ||
        (filterlist.search('Script-Fill') != -1 && filterlist.search('Improv') != -1)) {
        console.log('bruh');
        hideAll();
        resultcount = 0;
    }
    else {
        var tags = filterlist.split(" ");
        tags.pop();
        resetShow();
        var audios = document.getElementsByClassName('audiocard');
        resultcount = audios.length;
        for (var i = 0; i < audios.length; i++) {
            var audiotags = audios[i].classList;
            for (var j = 0; j < tags.length; j++) {
                if (!audiotags.contains(tags[j])) {
                    audios[i].classList += " hide";
                    resultcount--;
                    break;
                }
            }
        }
    }
    // see if there's anything to show
    if (resultcount == 0) {
        var nonefound = document.getElementById('none-found');
        nonefound.style.display = "block";
    }
    return;
}

function hideAll() {
    var audios = document.getElementsByClassName('audiocard');
    for (var i = 0; i < audios.length; i++) {
        audios[i].classList += " hide";
    }
}

function showAll() {
    resetShow();
    resetTags();
    document.getElementById('search-box').value = "";
    filterlist = "";
}

function resetShow() {
    // show all audios
    var hidden = document.getElementsByClassName('hide');
    while(hidden.length > 0) {
        hidden[0].classList.remove('hide');
    }
    // if none-found is showing, make it not
    var nonefound = document.getElementById('none-found');
    if (nonefound.style.display === "block") {
        nonefound.style.display = "none";
    }
}

// reset the tag display
function resetTags() {
    var activetags = document.getElementsByClassName('active');
    while(activetags.length > 0) {
        activetags[0].classList.remove('active');
    }
}

async function filterAll() {
    await redisplaySort();
    filter();
    if (!isEmpty(document.getElementById('search-box').value)) {
        search();
    }
    return;
}

function isEmpty(input) {
    return !input.trim().length;
}