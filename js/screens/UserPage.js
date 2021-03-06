import { getCurrentUser } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>     
        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }

        profile-link {
            position: absolute;
            top: 30px;
            right: 30px;
        }

        #btn-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        }

        #btn-container button {
        width: 250px;
        min-width: 100px;
        min-height: 100px;
        text-align: center;
        
        margin: 10px 50px;
        font-size: 36px;
        background-color: #3057a6;
        border-radius: 15px;
        outline: none;
        cursor: pointer;
        color: #ebeaef;
        }
        #back-link{
          font-size: 28px;
          position: absolute;
          top: 30px;
          left: 30px;
        }
        
        #back-link:hover {
          cursor: pointer;
          font-weight: bold;  
        }

    </style>
    <span id="back-link">Back</span>    
    <profile-link></profile-link>    
    <h1 id="header">Hello User!</h1>
    <div id="btn-container">
        <button id="profile-btn">Profile</button></a>
        <button>Storage Unit</button></a>
    </div>
`;

export default class UserPage extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$header = this.shadowRoot.getElementById("header");
    this.$profileBtn = this.shadowRoot.getElementById("profile-btn");
    this.$profileLink = this.querySelector("profile-link");
    this.$backLink = this.shadowRoot.getElementById("back-link")

    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      this.$header.innerHTML = `Hello, ${JSON.parse(newValue).name}!`;
    }
  }

  connectedCallback() {
    this.$profileBtn.onclick = () => {
      const currentUser = getCurrentUser();
      router.navigate("/profile/" + currentUser.id);
    };

    this.$backLink.onclick = () => {        
        router.navigate("/");
      };
  }
}

window.customElements.define("user-page", UserPage);
