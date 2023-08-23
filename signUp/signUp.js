const EmailField = document.querySelector('.EmailField');
const passwordField = document.querySelector('.passwordField');
const eyePng = document.querySelector('.eye-btn');
const signUp =document.querySelector('.signUp');
let flag = true;
passwordField.addEventListener('focus',function(){
  eyePng.classList.remove('hidden');
  flag = false;
})
eyePng.addEventListener('click',function()
{
  let img_src = document.querySelector(".eye-btn").src;
  let src=img_src.split('/')[4]
  let value = passwordField.value;
  if(src ==='eye-close.png' && value.length>0)
  {
      eyePng.src = 'eye-open.png';
      passwordField.type = 'text';  
    }
    else
    {
      eyePng.src = 'eye-close.png';
      passwordField.type = 'password';
    }
})
signUp.addEventListener('click',function()
{
  console.log(passwordField.value);
  if(passwordField.value=='harish@03'&&EmailField.value=='harishkumar.ct20@bitsathy.ac.in')
  {
    alert("log in sussesfully🤩");
  }

})