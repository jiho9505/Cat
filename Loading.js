export default class Loading {
    constructor($target) {
        this.loaderWrapper = document.createElement("div");
        this.loaderWrapper.className = "loader-wrapper";
        $target.appendChild(this.loaderWrapper);
        const loader = document.createElement("div");
        loader.className = "loader";
        loader.innerText = "로딩중...";
        this.loaderWrapper.appendChild(loader);
    }

    closeLoader() {
        this.loaderWrapper.style.display = 'none';
    }

    openLoader() {
        this.loaderWrapper.style.display = 'block';
    }

}