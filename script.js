// 버튼 클릭 시 맨 위로 이동 //
const topBtn = document.querySelector(".back-to-top");

topBtn.onclick = ()=>{
  window.scrollTo({ 
    top: 0, behavior: "smooth" 
    });  
}