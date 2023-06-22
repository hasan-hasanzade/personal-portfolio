import * as flsFunctions from "./modules/functions.js";
import gsap from 'gsap';
import * as transitions from "./modules/transition.js";

flsFunctions.isWebp();
transitions.transition();








const cursor = document.getElementById('cursor'),
      follower = document.getElementById('follower'),
      links = document.getElementsByTagName('a')

let mouseX = 0, mouseY = 0, posX = 0, posY = 0

function mouseCords(e) {


   mouseX = e.clientX
   mouseY = e.clientY


}

gsap.to({}, .01, {

   repeat: -1,

   onRepeat:() => {
      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5

      gsap.set(cursor, {
         css: {
            left: mouseX,
            top: mouseY
         }
      })

      gsap.set(follower, {
         css: {
            left: posX - 24,
            top: posY -24
         }
      })
   }

})

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    })

    links[i].addEventListener('mouseout', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    })
}

const body = document.querySelector('body')

body.addEventListener('mousemove', e => {
   mouseCords(e);
   cursor.classList.remove('hidden');
    follower.classList.remove('hidden');
})

body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
 })


 const menuBar = document.querySelector('.bar');
 const menuBody = document.querySelector('.menu__body');
 const allSpan = document.querySelectorAll("#line");
 const hBody = document.querySelector(".header__menu");

 


 menuBar.addEventListener('click', () => {
    allSpan.forEach(item => {
       item.classList.toggle('active')
    })
    menuBody.classList.toggle('active');
    hBody.classList.toggle('active');
 })




document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('form');
    form.addEventListener('submit',formSend);
 
    async function formSend(e) {
       e.preventDefault();
 
       let error = formValidate(form);
 
       const token = "5879564298:AAEbn5ptI_ag259AQgvYluVFxU7eLG1MZhk";
       const chatID = "-1001982687976";
       const urlApi = `https://api.telegram.org/bot${token}/sendMessage`;
 
       if (error === 0) {
 
         let message = `<b>Message</b>\n`;
         message += `<b>Name:</b> ${this.name.value}\n`;
         message += `<b>Email:</b> ${this.email.value}\n`;
         message += `<b>Text:</b> ${this.message.value}\n`;
         message += `<b>Subject:</b> ${this.subject.value}\n`;
         
 
         form.classList.add('_sending');
 
         axios.post(urlApi, {
            chat_id: chatID,
            parse_mode: 'html',
            text:message
           })
           .then((res)=>{
            this.name.value = "";
            this.email.value = "";
            this.message.value = "";
            this.subject.value = "";
           })
         .catch((err)=> {
          Swal.fire({
             icon: 'error',
             title: 'Ошибка...',
             text: 'Что-то пошло не так',
             width: '18em',
           })
         })
         .finally(() => {
          Swal.fire({
             icon: 'success',
             title: 'Заявка отправлена',
             showConfirmButton: false,
             timer: 2500,
             width: '18em',
             timerProgressBar: true,
             color: '#fff',
             confirmButtonColor: '#6398FF',
             background: '#141414'
           })
         })
 
       }else {
          Swal.fire({
             icon: 'error',
             title: 'Ошибка...',
             text: 'Заполните обязательные поля',
             width: '28em',
             color: '#fff',
             confirmButtonColor: '#6398FF',
             background: '#141414',
             showCloseButton: true,
          });
       }
    }
 
    function formValidate(form) {
       let error = 0;
       let formReq = document.querySelectorAll("._req");
 
       for (let index = 0; index < formReq.length; index++) {
          const input = formReq[index];
          formRemoveError(input);
 
             if (input.value === '') {
                formAddError(input);
                error++;
             }
       }
       return error;
    }
 
    function formAddError(input) {
       input.parentElement.classList.add('_error');
       input.classList.add('_error');
    }
    function formRemoveError(input) {
       input.parentElement.classList.remove('_error');
       input.classList.remove('_error');
    }
 
 });





 const headerElement = document.querySelector('.header');

 const headerObserver = new IntersectionObserver(function(entries) {
     if(entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
     } else {
         headerElement.classList.add('_scroll');
     }
 });
 headerObserver.observe(headerElement);


