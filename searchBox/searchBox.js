'use strict';
const inputField = document.querySelector('.input-field');
const inputBox = document.querySelector('.input-box');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const searchIcon = document.querySelector('.btn');
const container = document.querySelector('.container');
const positiveOutput = document.querySelector('.positive');
const negativeOutput = document.querySelector('.negative');
const noOutput = document.querySelector('.no-Output');
const closeModal=function ()
{
    if(modal.classList.contains('positive-output'))
        modal.classList.remove('positive-output');
    if(modal.classList.contains('negative-output'))
        modal.classList.remove('negative-output');
    if(modal.classList.contains('empty-ouput'))
        modal.classList.remove('empty-ouput');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    container.classList.remove('hidden');
    negativeOutput.classList.add('hidden');
    positiveOutput.classList.add('hidden');
    noOutput.classList.add('hidden');

    
}
const openModalWithConfirm =function (flag)
{

    if(flag == 'no')
    {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden');
        modal.classList.add('empty-ouput');
        noOutput.classList.remove('hidden');

    }
    else if(flag==1)
    {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden');
        modal.classList.add('positive-output');
        positiveOutput.classList.remove('hidden');
    }
    else if(flag==0)
    {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        container.classList.add('hidden');
        modal.classList.add('negative-output');
        negativeOutput.classList.remove('hidden');   
    }
}

close.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);
searchIcon.addEventListener('click',function()
{
    if(inputField.value=='')
    {
        openModalWithConfirm('no');
    }
    else
    {
        openModalWithConfirm(inputField.value);
    }
});

document.addEventListener('keydown',function(event)
{
    if(event.key&&!modal.classList.contains('hidden'))
        closeModal();
});