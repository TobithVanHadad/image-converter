let selectedFile = null

const uploadInput = document.getElementById("upload")
const preview = document.getElementById("preview")
const dropArea = document.getElementById("drop-area")

if(uploadInput){

uploadInput.addEventListener("change", function(){
handleFile(this.files[0])
})

}

if(dropArea){

dropArea.addEventListener("dragover", function(e){
e.preventDefault()
dropArea.style.borderColor="#6366f1"
})

dropArea.addEventListener("dragleave", function(){
dropArea.style.borderColor="#475569"
})

dropArea.addEventListener("drop", function(e){
e.preventDefault()

let file = e.dataTransfer.files[0]

handleFile(file)
})

}

function handleFile(file){

selectedFile = file

let img = new Image()

img.src = URL.createObjectURL(file)

img.onload = function(){

if(preview){
preview.src = img.src
preview.style.display="block"
}

}

}

function convertImage(){

if(!selectedFile){
alert("Upload an image first")
return
}

let format=document.getElementById("format").value

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=img.width
canvas.height=img.height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0)

let converted=canvas.toDataURL(format)

let link=document.getElementById("download")

link.href=converted
link.download="converted-image"
link.style.display="block"
link.innerText="Download Image"

}

}

function compressImage(){

if(!selectedFile){
alert("Upload an image first")
return
}

let quality=document.getElementById("quality").value

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=img.width
canvas.height=img.height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0)

let compressed=canvas.toDataURL("image/jpeg",quality)

let link=document.getElementById("download")

link.href=compressed
link.download="compressed-image.jpg"
link.style.display="block"
link.innerText="Download Image"

}

}

function applyPreset(){

let preset=document.getElementById("preset").value

if(!preset) return

let parts=preset.split("x")

document.getElementById("width").value=parts[0]
document.getElementById("height").value=parts[1]

}

function resizeImage(){

if(!selectedFile){
alert("Upload an image first")
return
}

let width=document.getElementById("width").value
let height=document.getElementById("height").value

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=width
canvas.height=height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0,width,height)

let resized=canvas.toDataURL("image/jpeg")

let link=document.getElementById("download")

link.href=resized
link.download="resized-image.jpg"
link.style.display="block"
link.innerText="Download Image"

}

}
