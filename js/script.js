const btn = document.getElementById("searchbutton");
const searchBox = document.getElementById("searchBox");
const quantityBox = document.getElementById("quantityBox");

const size = document.getElementsByClassName("selectClass")[0];


searchBox.addEventListener('keyup', (e) => {

    return searchBox.value;
});

quantityBox.addEventListener('keyup', (e) => {

    return quantityBox.value;
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    removeImg();
    searchFunction();
});


function searchFunction() {

    if (searchBox.value == "" || quantityBox == "") {
        console.error("Error")
        alert("You haven't filled in the search box yet, try again.")
    } else {

        getImg(searchBox.value, quantityBox.value, size.value);
    }
};

function getImg(searchText, searchQ) {


    const KEY = 'fa0c9defa8a25e258b82245caf31e82a';

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=${searchQ}&page=1`;


    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                const promise = response.json();

                return promise;
            }
            else {
                throw 'Sorry, API not working';
            }
        }
    ).then(
        function (data) {
            console.log(data);
            if (data.photos.photo.length == 0) {
                alert("Sorry, no photos match your search query, try using different words.");
            } else { getImageUrl(data); }
        }
    ).catch(
        function (error) {
            console.log(error);
            alert("Api not responding.");
        }
    );
};
function getImageUrl(photoObject) {
    for (const iterator of photoObject.photos.photo) {

        let imgUrl = `https://live.staticflickr.com/${iterator.server}/${iterator.id}_${iterator.secret}_${size.value}.jpg`;


        displayImg(imgUrl);
    }
}
function displayImg(url) {
    let img = document.createElement("img");
    img.src = url;

    document.querySelector(".gallery").appendChild(img);
    img.onclick = function () {
        window.open(url);
    }
}
function removeImg() {
    const img = document.querySelectorAll("img");

    for (const iterator of img) {
        iterator.remove();
    }
}