export default class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("dialog");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
      this.$target = $target
  
      this.data = data;
  
      window.addEventListener("keyup", e => {
        if(e.keyCode === 27){
        this.$imageInfo.style.display = 'none'
        }
      });
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <div class="overlay">
          </div>
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
  
        const closebtn = this.$imageInfo.querySelector('.close')
        const overlay = this.$imageInfo.querySelector('.overlay')
  
  
        closebtn.addEventListener("click", e => {
          this.$imageInfo.style.display = 'none'
        });
        overlay.addEventListener("click", e => {
          this.$imageInfo.style.display = 'none'
        });
        this.$imageInfo.style.display = 'block'
        // this.$imageInfo.classList.toggle('.visible');
      } else {
        this.$imageInfo.style.display = 'none'
      }
    }
  }