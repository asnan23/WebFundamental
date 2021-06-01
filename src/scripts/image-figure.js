class ImageFigure extends HTMLElement {

    connectedCallback() {
        this.src = this.getAttribute("src") || null;
        this.alt = this.getAttribute("alt") || null;
        this.caption = this.getAttribute("caption") || null;


        this.innerHTML = `
        <style>
        figure {
            border: thin #c0c0c0 solid;
            display: flex;
            flex-flow: column;
            padding: 5px;
            max-width: 200px;
            margin: auto;
        }
      
        figure > img {
            max-width: 200px;
            max-height: 220px;
        }
      
        figure > figcaption {
            background-color: #F4D03F;
            color: #17202A;
            font: italic smaller sans-serif;
            padding: 3px;
            text-align: center;
        }
        </style>
        <figure>
          <img src="${this.src}"
              alt="${this.alt}">
          <figcaption>${this.caption}</figcaption>
        </figure>
      `;
    }
}


customElements.define("image-figure", ImageFigure);