var curselect = 'chrono';

async function redisplaySort() {
    var selected = document.getElementsByClassName("selected");
    var selectval = selected[0].dataset.value;

    // only do something if the sort is different
    try {
        if (selectval != curselect) {
            console.log('yeah sure');
            curselect = selectval;
            var sorteddata;
            const response = await fetch('../assets/js/audios.json');
            const data = list;
            if (selectval === 'chrono') {
                // if chrono, just reset the list, it's chrono by default
                sorteddata = await response.json();
            }
            else if (selectval === 'r-chrono') {
                // sort by upload
                sorteddata = data.sort(function(a, b) {
                    if(a.uploaded > b.uploaded) {
                        return 1;
                    }
                    else if(a.uploaded < b.uploaded) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (selectval === 'ls') {
                // sort by length - longest to shortest
                sorteddata = data.sort(function(a, b) {
                    if (a.length < b.length) {
                        return 1;
                    }
                    else if(a.length > b.length) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (selectval === 'sl') {
                // sort by length - shortest to longest
                sorteddata = data.sort(function(a, b) {
                    if (a.length > b.length) {
                        return 1;
                    }
                    else if(a.length < b.length) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                sorteddata = data;
                console.log('dude how did you even get here - management');
            }
            list = sorteddata;
            clearDisplay();
            appendData(sorteddata);
        }
        else {
            console.log('nah');
        }
        return;
    }
    catch (err) {
        console.log('error: ' + err);
    }
}

// removes audiocards from column to redisplay
function clearDisplay() {
    var audios = document.getElementsByClassName('audiocard');
    while (audios.length > 0) {
        audios[0].parentNode.removeChild(audios[0]);
    }
}
