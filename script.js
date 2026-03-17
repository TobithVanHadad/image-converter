function convertImage(){

let file=document.getElementById("upload").files[0]

if(!file){
alert("Upload an image first")
return
}

let format=document.getElementById("format").value

let img=new Image()

img.src=URL.createObjectURL(file)

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

let file=document.getElementById("upload").files[0]

if(!file){
alert("Upload an image first")
return
}

let quality=document.getElementById("quality").value

let img=new Image()

img.src=URL.createObjectURL(file)

img.onload=function(){

let canvas=document.createElement("canvas")

canvas.width=img.width
canvas.height=img.height

let ctx=canvas.getContext("2d")

ctx.drawImage(img,0,0)

let compressed=canvas.toDataURL("image/jpeg",quality)

let link=document.getElementById("download")

link.href=compressed
link.download="compressed-image"
link.style.display="block"
link.innerText="Download Image"

}

}
