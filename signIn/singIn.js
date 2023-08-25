const EmailField = document.querySelector('.EmailField');
const passwordField = document.querySelector('.passwordField');
const eyePng = document.querySelector('.eye-btn');
const checker = document.querySelector('.checker');
const submitBtn= document.querySelector('.submit-btn');
const inputBox = document.querySelector('.input-box')
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
submitBtn.addEventListener('click',function()
{
  if(EmailField.value=='harishkumar.ct20@bitsathy.ac.in'&&passwordField.value =='mayil@123')
  {
    window.location.href = '/searchBox/searchBox.html';
  }
  else
  {
    checker.classList.remove('hidden');
    inputBox.classList.add('incorrect');
    
  }
})


