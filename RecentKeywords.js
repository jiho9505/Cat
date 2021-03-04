export default class RecentKeywords {
    constructor({ downtag, onClick }) {
      const $buttons = document.createElement("ul");
      $buttons.className = "buttons";
      this.$buttons = $buttons;
      downtag.appendChild($buttons);
  
      this.onClick = onClick
      
     
    }

    render(array) {
        this.$buttons.innerHTML = `<span> Recent Keywords : </span>`
        this.$buttons.innerHTML += array
            .map(
        key => `
          <li class="btnlist">
            <button class="btn">${key}</button>
          </li>
        `
      )
      .join("");

        this.$buttons.addEventListener("click", e => {
          if(e.target.className === 'btn'){
            this.onClick(e.target.innerText)
          }
        
      });
    }
  }
  