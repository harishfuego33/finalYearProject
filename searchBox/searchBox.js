'use strict';
const inputField = document.querySelector('.input-field');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const searchIcon = document.querySelector('.btn');
const container = document.querySelector('.container');
const Output = document.querySelector('.output');
const closeModal=function ()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    container.classList.remove('hidden');
}
const openModalWithConfirm =function (flag)
{
    if(flag == 'no')
    {
        console.log('no');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden');
        modal.style.background="linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)";
        Output.textContent = 'PLEASE ENTER URL📝';


    }
    else if(flag==1)
    {
        console.log(1);
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden');
        modal.style.background="linear-gradient(to top left, #28b487, #7dd56f)";
        Output.textContent = 'LOOKS LIKE GOOD😀🚀';

    }
    else if(flag==0)
    {
        console.log(0);
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden')
        modal.style.background="linear-gradient(326deg, #bd4f6c 0%, #d7816a 74%)";
        Output.textContent = 'LOOKS LIKE SUSPICIOUS🧐';   
    }
}
function seachEvent()
{
    if(inputField.value=='')
        openModalWithConfirm('no');
    else
        openModalWithConfirm(inputField.value);
}
close.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);
searchIcon.addEventListener('click',function()
{
    seachEvent();
});

document.addEventListener('keydown',function(event)
{
    if(event.key==="Escape"&&!modal.classList.contains('hidden'))
    {
        console.log(event.key);
        event.preventDefault();
        closeModal();
    }
    else if(event.key==='Enter')
    {
        event.preventDefault();
        seachEvent();
    }
});
