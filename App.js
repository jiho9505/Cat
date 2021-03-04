import Header from './components/LandingPage/header/header.js'
import Body from './components/LandingPage/body/body.js'
import SearchInput from './components/LandingPage/header/items/SearchInput.js'
import SearchResult from './components/LandingPage/body/items/SearchResult.js'
import RandomCatBanner from './components/LandingPage/body/items/RandomCatBanner.js'
import ImageInfo from './components/LandingPage/dialog/ImageInfo.js'
import { api } from './api/api.js'
import RandomButton from './components/LandingPage/header/items/RandomButton.js'
import { getItem, setItem } from './utils/SessionStorage.js'
import RecentKeywords from './components/LandingPage/header/items/RecentKeywords.js'
import DarkMode from './components/common/ChangeMode.js'
import Loading from './components/common/Loading.js'


console.log("app is running!");

export default class App {
  $target = null;
  data = getItem('data') ? getItem('data') : [];
  keyword = getItem('key') ? getItem('key') : '';
  recentkeys = [];
  
  constructor($target) {
    this.$target = $target;

    this.header = new Header();
    this.header.attachTo($target)
    
    const uptag = this.header.uptag
    const downtag = this.header.downtag
    const keyword = this.keyword

    this.searchInput = new SearchInput({
      uptag,
      onSearch: async keyword => {
        
        this.loading.openLoader()
        const data = await api.fetchCats(keyword)
        if(data.success){
          setItem('key', keyword)
          setItem('data', data.data)
          this.setState(data.data,keyword)
          this.putKeywords(keyword)
        }
        else{
          alert(data.message)
        }
        this.loading.closeLoader()
        
      },
      keyword
    });

    
    this.RandomButton = new RandomButton({
      uptag,
      onClick: async () => {
        this.loading.openLoader()
        const data = await api.randomCats()
        if(data.success){
          setItem('key', '')
          setItem('data', data.data)
          this.setState(data.data,'')
        }
        else{
          alert(data.message)
        }
        this.loading.closeLoader()
          
      }
    });

    this.recentKeyword = new RecentKeywords({
      downtag,
      onClick: async (keyword) => {
        this.loading.openLoader()
        const data = await api.fetchCats(keyword)
        if(data.success){
          setItem('key', keyword)
          setItem('data', data.data)
          this.setState(data.data,keyword)
        }
        else{
          alert(data.message)
        }
        this.loading.closeLoader()
       
      }
    });

    

    this.body = new Body();
    this.body.attachTo($target)
    
    const maintag = this.body.main_down
    const mainuptag = this.body.main_up

    this.searchResult = new SearchResult({
      maintag,
      initialData: this.data,
      onClick: async image => {
        const data = await api.fetchDetailCat(image.id)
        if(data.success){
          this.imageInfo.setState({
            visible: true,
            image: data.data
          });
        }
        else{
          alert(data.message)
        }
      },
      keyword,
      open: () => this.loading.openLoader(),
      close: () => this.loading.closeLoader()
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.darkmode = new DarkMode($target);
    this.loading = new Loading(maintag);

   

    const randomCatBanner = async () => {
      const data = await api.randomCats()
      if(data.success){
        this.Banner = new RandomCatBanner(data.data)
        this.Banner.attachTo(mainuptag)
      }
      else{
        alert(data.message)
      } 
    }

    randomCatBanner()
  }

  setState(nextData,keyword) {
    console.log(this);
    this.searchInput.$searchInput.value = keyword;
    this.data = nextData;
    this.searchResult.setState(nextData,keyword);
  }

  putKeywords(key) {
    if(this.recentkeys.length < 5){
      this.recentkeys.push(key)
      this.recentKeyword.render(this.recentkeys)
    }
    else{
      this.recentkeys.splice(0,1)
      this.recentkeys.push(key)
      this.recentKeyword.render(this.recentkeys)
    }
  }

}
