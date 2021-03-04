export default class SearchInput {
    constructor({ uptag, onSearch, keyword }) {
      const $searchInput = document.createElement("input");
      this.$searchInput = $searchInput;
      this.$searchInput.placeholder = "고양이를 검색해보세요.";
      this.$searchInput.autofocus = 'autofocus';
      this.$searchInput.value = keyword;
      
      $searchInput.className = "SearchInput";
      uptag.appendChild($searchInput);
  
      $searchInput.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          onSearch(e.target.value);
        }
      });
  
      $searchInput.addEventListener("click", e => {
        e.target.value = "";
      });
  
      console.log("SearchInput created.", this);
    }
    render() {}
  }
  