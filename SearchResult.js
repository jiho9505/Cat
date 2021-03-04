import { api } from '../../../../api/api.js'

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ maintag, initialData, onClick, keyword , open, close}) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    maintag.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.keyword = keyword;

    this.open = open;
    this.close = close;
    this.render();
  }

  setState(nextData,keyword) {
    this.keyword = keyword
    this.data = nextData;
    this.render();
  }

  obs() {
    const observerCallback = (entries, observer) => {
      entries.forEach( async (entry) => {
          
        if (entry.isIntersecting) {
          console.log(entry.target.id)
          if(entry.target.id === 'end'){
            observer.unobserve(entry.target)
            this.open();
            const data = await api.randomCats()
            if(data.success){
              this.setState([...this.data,...data.data])
            }
            else{
              alert(data.message)
            }
            this.close();
            
          }
          else{
            observer.unobserve(entry.target)
          }
            
        }
      });
    };
    const items = this.$searchResult.querySelectorAll('.item')
    const observer = new IntersectionObserver(observerCallback);
    items.forEach( item => observer.observe(item));
  }

  view() {
    this.$searchResult.innerHTML = this.data
    .map(
      (cat,index) => `
      <article class="item" >
        <img src=${cat.url} alt=${cat.name} />
        <div class="catname" data-index=${index}>${cat.name}</div>
      </article>
      `
    )
    .join("");

    this.$searchResult.innerHTML += `<div id="end" class="item"></div>`
  
      this.$searchResult.addEventListener("click", (e) => {
        
        if(e.target.className = "catname"){
          const index = e.target.dataset.index
          this.onClick(this.data[index]);
        }
         
        
      });
  }

  render() {
    console.log(this.keyword)
    if(this.keyword && this.keyword.length > 0){
      if(this.data && this.data.length > 0)
      {
        this.view()
        this.obs()     
      }
      else{
        this.$searchResult.innerHTML = '<div class="notfind">검색된 정보를 찾을수 없습니다.</div>'
      }
    }
    else if(this.data && this.data.length > 0){ 
        this.view()
        this.obs()     
      }
  }
}