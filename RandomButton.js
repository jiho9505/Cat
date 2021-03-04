export default class RandomButton {
    constructor({ uptag, onClick }) {
      const $randomBtn = document.createElement("button");
      $randomBtn.textContent = "RandomButton"
      this.$randomBtn = $randomBtn;
  
      $randomBtn.className = "randomBtn";
      uptag.appendChild($randomBtn);
  
      this.onClick = onClick
      
      $randomBtn.addEventListener("click", e => {
        this.onClick()
      });
  
    }
  }
  