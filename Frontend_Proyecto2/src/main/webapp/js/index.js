var backend="http://localhost:8080/Backend_Proyecto2/api";

var scriptTag = document.createElement('script');
scriptTag.src = 'https://kit.fontawesome.com/b4a24ab8a1.js';
scriptTag.crossOrigin = 'anonymous';

document.head.appendChild(scriptTag);


function errorMessage(code){
    alert(`Error. Status: ${code}`);
}