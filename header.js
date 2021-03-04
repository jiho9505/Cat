export default class Header {
    constructor() {
      
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
              <header class="header">
                <div class="header__up"></div >
                <div class="header__down"></div >
              </header>
              `

      this.element = TEMPLATE.content.firstElementChild
      this.uptag = this.element.querySelector('.header__up')
      this.downtag = this.element.querySelector('.header__down') 
   
    
    }
  
    attachTo(parent) {
      parent.appendChild(this.element)
    }
  }
  
  