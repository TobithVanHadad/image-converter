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

function cropImage(){

if(!selectedFile){
alert("Upload an image first")
return
}

let x=document.getElementById("cropX").value
let y=document.getElementById("cropY").value
let width=document.getElementById("cropWidth").value
let height=document.getElementById("cropHeight").value

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=width
canvas.height=height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,x,y,width,height,0,0,width,height)

let cropped=canvas.toDataURL("image/jpeg")

let link=document.getElementById("download")

link.href=cropped
link.download="cropped-image.jpg"
link.style.display="block"
link.innerText="Download Image"

}

}

function rotateImage(){

if(!selectedFile){
alert("Upload an image first")
return
}

let rotation=document.getElementById("rotation").value

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")
let ctx=canvas.getContext("2d")

if(rotation == 90 || rotation == 270){
canvas.width = img.height
canvas.height = img.width
}else{
canvas.width = img.width
canvas.height = img.height
}

ctx.translate(canvas.width/2,canvas.height/2)
ctx.rotate(rotation*Math.PI/180)

ctx.drawImage(img,-img.width/2,-img.height/2)

let rotated=canvas.toDataURL("image/jpeg")

let link=document.getElementById("download")

link.href=rotated
link.download="rotated-image.jpg"
link.style.display="block"
link.innerText="Download Image"

}

}

function pngToJpg(){

if(!selectedFile){
alert("Upload an image first")
return
}

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=img.width
canvas.height=img.height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0)

let converted=canvas.toDataURL("image/jpeg",0.9)

let link=document.getElementById("download")

link.href=converted
link.download="converted-image.jpg"
link.style.display="block"
link.innerText="Download JPG"

}

}

function webpToJpg(){

if(!selectedFile){
alert("Upload an image first")
return
}

let img=new Image()

img.src=URL.createObjectURL(selectedFile)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=img.width
canvas.height=img.height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0)

let converted=canvas.toDataURL("image/jpeg",0.9)

let link=document.getElementById("download")

link.href=converted
link.download="converted-image.jpg"
link.style.display="block"
link.innerText="Download JPG"

}

}

let cropper
let image = document.getElementById("image")
let upload = document.getElementById("upload")

upload.addEventListener("change", function(e){

let file = e.target.files[0]

if(!file.type.startsWith("image/")){
alert("Please upload an image")
return
}

let url = URL.createObjectURL(file)

image.src = url
image.style.display = "block"

if(cropper){
cropper.destroy()
}

cropper = new Cropper(image,{
viewMode:1,
dragMode:"move",
autoCropArea:0.8,
})

})

function cropImage(){

if(!cropper){
alert("Upload an image first")
return
}

let canvas = cropper.getCroppedCanvas()

let link = document.getElementById("download")

link.href = canvas.toDataURL("image/jpeg")
link.download = "cropped-image.jpg"
link.style.display = "block"
link.innerText = "Download Cropped Image"

}

