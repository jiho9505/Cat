export default class Body {
    constructor() {
      
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
              <main class="main">
                  <div class="main_up"></div>
                  <div class="main_down"></div>
              </main>
              `
      
      this.element = TEMPLATE.content.firstElementChild
      
      this.main_up = this.element.querySelector('.main_up')

      this.main_down = this.element.querySelector('.main_down')
    
    }
  
    attachTo(parent) {
      parent.appendChild(this.element)
    }
  }
  
  