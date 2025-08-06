
import { load_image_data } from "./util.js"

function add_metadata_line(item, data, container) {
    var line = document.createElement("a");
    line.innerHTML = `${item}: \t${data}`

    var br = document.createElement("br");

    container.appendChild(line)
    container.appendChild(br)
}

window.onload = async function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id")

    var data = await load_image_data(id);

    var title = document.getElementsByClassName("overview-title")[0]
    title.innerHTML = data.name

    var desc = document.getElementsByClassName("overview-description")[0]
    desc.innerHTML = data.statement

    var img = document.getElementById("preview-img");
    img.src = "imgs/"+data.link
    img.onload = function() {
        EXIF.getData(img, function() {
            var data_container = document.getElementById("img-data")

            add_metadata_line("Camera Model",EXIF.getTag(this, "Make")+" "+EXIF.getTag(this, "Model"),data_container)
            add_metadata_line("ISO",EXIF.getTag(this, "ISOSpeedRatings"),data_container)
            add_metadata_line("Focal Length",EXIF.getTag(this, "FocalLength")+"mm",data_container)
            add_metadata_line("Aperture","f/"+EXIF.getTag(this, "FNumber"),data_container)
            add_metadata_line("Shutter Speed","1/"+(1/EXIF.getTag(this, "ExposureTime")),data_container)
            add_metadata_line("Taken",EXIF.getTag(this, "DateTimeOriginal"),data_container)
        });
    }
}