//alerte() replace alert()
document.getElementById("alertCloseButton").addEventListener("click", ()=> {
    document.getElementById("alert").style.display="none";
})
function alerte(text) {
    document.getElementById("alertText").innerHTML=text;
    document.getElementById("alert").style.display="flex";
}
function clickId (id, operation) {
    document.getElementById(id).addEventListener("click", ()=> {
        eval(operation);
    })
}