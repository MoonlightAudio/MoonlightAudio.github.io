var list;

fetch('../assets/js/audios.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        list = data;
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("audios");
    for (var i = 0; i < data.length; i++) {
        // create the card div
        var audiocard = document.createElement("div");
        audiocard.classList += "audiocard ";
        audiocard.id = data[i].id;
        var tagstring = data[i].tags;
        audiocard.classList += tagstring;

        // create the embed video div
        var embedvid = document.createElement("div");
        embedvid.classList += "embedvid";
        // var embedstring = "<img src='https://img.youtube.com/vi/";
        // embedstring += data[i].link;
        // embedstring += "/hqdefault.jpg'/>";
        var embedstring = "<iframe src='"
        embedstring += data[i].link;
        embedstring += "' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
        embedvid.innerHTML = embedstring;

        // create the info container div
        var vidinfo = document.createElement("div");
        vidinfo.classList += "vidinfo";

        // create the description div
        var viddesc = document.createElement("div");
        viddesc.classList += "viddesc";
        // title
        var title_elem = document.createElement("H3");
        var title_text = document.createTextNode(data[i].title);
        title_elem.appendChild(title_text);
        viddesc.appendChild(title_elem);
        // description
        var desc_array = data[i].desc;
        for (var j = 0; j < desc_array.length; j++) {
            var desc_elem = document.createElement("P")
            var desc_text = document.createTextNode(data[i].desc[j]);
            desc_elem.appendChild(desc_text);
            viddesc.appendChild(desc_elem);
        }

        // create the tags div
        var vidtags = document.createElement("div");
        vidtags.classList += "vidtags";
        var tagsplit = tagstring.split(" ");
        for (var j = 0; j < tagsplit.length; j++) {
            var tagdiv = document.createElement("button");
            tagdiv.classList += "cardtag";
            tagdiv.innerHTML = tagsplit[j].replaceAll("-", " ");
            vidtags.appendChild(tagdiv);
        }

        // add the components to the info container div
        vidinfo.appendChild(viddesc);
        vidinfo.appendChild(vidtags);

        // add the components to the card div
        audiocard.appendChild(embedvid);
        audiocard.appendChild(vidinfo);

        // add the panel to the container div
        mainContainer.appendChild(audiocard);
    }
}
