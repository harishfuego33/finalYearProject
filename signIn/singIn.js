const EmailField = document.querySelector('.EmailField');
const passwordField = document.querySelector('.passwordField');

EmailField.addEventListener('focus', function(){
  EmailField.removeAttribute('placeholder');
});
if(EmailField==null)
EmailField.addAttribute('placeholder');

passwordField.addEventListener('focus',function(){
    passwordField.removeAttribute('placeholder');
})
