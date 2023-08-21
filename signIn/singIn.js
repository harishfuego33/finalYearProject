const EmailField = document.querySelector('.EmailField');
const passwordField = document.querySelector('.passwordField');
const eyePng = document.querySelector('.eye-btn');
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
// if(passwordField.value.length==0&&!flag);
// {
//     document.addEventListener('click',function()
//     {
//       eyePng.classList.add('hidden'); 
//     })
// }


