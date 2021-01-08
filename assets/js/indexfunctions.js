// scroll to the top of the page
var scroll = document.getElementById("scroll-btn")

window.onscroll = function() {
    scrollToggle()
};

// filter on enter
window.onkeypress = function(event) {
    if (event.keyCode == 13) {
        filterAll();
    }
}

// make the button appear after scrolling down a bit
function scrollToggle() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scroll.style.display = "block";
    }
    else {
        scroll.style.display = "none";
    }
}

// scroll to top
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// dropdown menus
function dropdownPanels(_this, type) {
    var box = document.getElementById("filter-index");
    if (box.style.display === "block") {
        box.style.display = "none";
    }
    else {
        box.style.display = "block";
    }
    _this.classList.toggle("activedrop");
}

// select dropdown menus
document.querySelector('.select-wrapper').addEventListener('click', function() {
    this.querySelector('.drop-select').classList.toggle('open');
    if (this.querySelector('.drop-select').classList.contains('open')) {
        this.querySelector('.select-trigger').style.borderRadius = "4px 4px 0 0";
    }
    else {
        this.querySelector('.select-trigger').style.borderRadius = "4px";
    }
})

for (const option of document.querySelectorAll(".option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.drop-select').querySelector('.select-trigger').textContent = this.textContent;
        }
    })
}
