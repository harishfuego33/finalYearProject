'use strict';
const about = document.querySelector('.about');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const closeModal=function ()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
const openModal =function ()
{
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');  
}
about.addEventListener('click',openModal);
close.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal)
document.addEventListener('keydown',function(event)
{
    if(event.key&&!modal.classList.contains('hidden'))
        closeModal();

});
function singInPage(){
    window.location.href="signIn/signIn.html";
}
