import { load_image_data } from "./util.js"


function open_image(id) {
    window.location.href = "image.html?id="+id
}

async function make_image(id) {
    var img_template = document.getElementById("img-template")
    var content_grid = document.getElementById("content-grid")

    var data = await load_image_data(id)

    var img = img_template.cloneNode(true);
    img.id = id;
    img.removeAttribute('style'); // Removes the entire inline style attribute
    img.onclick = function() {
        open_image(id)
    };

    var caption = img.querySelector("#caption")
    caption.innerHTML = data.name;

    var real_img = img.querySelector("#preview-img")
    real_img.src = "imgs/"+data.link

    content_grid.appendChild(img); 
}

window.onload = async function() {
    await make_image("checksrc");
    await make_image("famf");
    await make_image("books");
    await make_image("adif");
    await make_image("diploma");
    await make_image("child");
    await make_image("dream");
    await make_image("peac");
    await make_image("stayfocused");
    await make_image("dollargen");
    await make_image("starbies");
    await make_image("pidgeon");
    await make_image("seagull");
    await make_image("beauty");
    await make_image("advertisement");
}