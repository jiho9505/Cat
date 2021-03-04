export default class RandomCatBanner {
    constructor(array) {
      this.index = 25;
      this.array = array;
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
              <section class="random_sec">
                <div class="front"><button class="frontbtn">left</button></div >
                <div class="mid"></div >
                <div class="back"><button class="backbtn">right</button></div >
              </section>
              `

      this.element = TEMPLATE.content.firstElementChild
      this.frontbtn = this.element.querySelector('.frontbtn')
      this.backbtn = this.element.querySelector('.backbtn') 
      this.mid = this.element.querySelector('.mid') 

      this.frontbtn.addEventListener("click", (e) => {
          this.index -= 1;
          if(this.index === 0) {
            this.frontbtn.style.display = 'none';
          }
          if(this.index === 44) {
            this.backbtn.style.display = 'block';
          }
          this.render()
      });

      this.backbtn.addEventListener("click", (e) => {
          this.index += 1;
          if(this.index === 1) {
            this.frontbtn.style.display = 'block';
          }
          if(this.index === 45) {
            this.backbtn.style.display = 'none';
          }
          this.render()
      });
      
      this.render()
    
    }
  
    attachTo(parent) {
      parent.appendChild(this.element)
    }

    render() {
      let i = 0;
      this.mid.innerHTML = ''; 
      let current = this.index;
      while (i<5) {
        
        this.mid.innerHTML +=  
          `
        <article class="item" >
          <img src=${this.array[current].url} alt=${this.array[current].name} />
        </article>
        `
        i++;
        current++;
        console.log(current)
      }
    }
  }
  
  