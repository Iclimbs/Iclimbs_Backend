import formElements from "./formElements.js";
export default class captcha extends formElements {
    correctque = "";
    questions = [
        "bike",
        "boat",
        "bus",
        "car",
        "crosswalk",
        "mountain",
        "ship",
        "taxi",
        "traffic-lights"
    ];
    selectQuestion() {
        return this.questions[Math.floor(Math.random() * (this.questions.length + 1)) % this.questions.length];
    }
    selectOptions(que = "") {
        let Options = [];
        if (que == "")
            que = this.selectQuestion();
        let wrongOptions = this.questions.filter(q => q != que);
        Options.push(`${que}-1`)
        Options.push(`${que}-2`)
        while (Options.length < 9) {
            let option = wrongOptions[Math.floor(Math.random() * wrongOptions.length) % wrongOptions.length] + "-" + (Math.floor((Math.random() * 1000)) % 2 + 1)
            if (Options.indexOf(option) == -1)
                Options.push(option);
        }
        // console.table(Options);
        for (let index = 0; index < Options.length; index++) {
            // console.table({
            //     Options
            // })
            const element = Options[index];
            const swapwith = (Math.floor(Math.random() * Options.length) % Options.length);
            Options[index] = Options[swapwith];
            Options[swapwith] = element;
        }
        return Options;
    }
    attributes = {};
    static get observedAttributes() {
        return ["path"]
    }
    attributeChangedCallback(name, old, current) {
        this.attributes[name] = current;
    }
    connectedCallback() {
        this.render();
    }
    stylesheet() {
        let temp = super.stylesheet();
        temp += `<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" as="style" onload="this.onload=null;this.rel='stylesheet'" />`
        return temp;
    }
    render() {
        this.shadowRoot.innerHTML = `
        ${this.stylesheet()}
        <div class=captcha>
            <div>
                <i class="fa-regular fa-circle"></i> I am not a robot
            </div>
        </div>       
        `;
        this.eventSetup();
    }
    isValid() {
        this.setValidity({});
        this.removeError();
        let icon = this.shadowRoot.querySelector("i");
        icon.classList.remove("fa-circle");
        icon.classList.add("fa-check-circle");
        let captcha = this.shadowRoot.querySelector(".captcha");
        captcha.removeEventListener("click", e => { this.open() });

    }
    eventSetup() {
        this.setValidity({
            valueMissing: true
        }, "Please validate you are not a robot");
        let domelm = this.shadowRoot.querySelector(".captcha");
        domelm.addEventListener("click", e => {
            this.open();
        })
    }
    setValidity(status, message) {
        this.internals.setValidity(status, message);
    }
    removeError(){
        this.classList.remove("error");
        let err=this.shadowRoot.querySelector(".error");
        if(!!err)
        err.remove();
    }
    open() {
        if(this.validity.valid)return;
        this.removeError()
        let que = this.selectQuestion();
        let options = this.selectOptions(que);
        let path = this.attributes["path"] || "/captcha/";
        let imageHTML = options.reduce((a, c) => {
            return a + `<div class="images">
                <img src="${path}${c}.jpg" alt="${c}">
            </div>`

        }, "");
        this.correctque = que;
        let popup = document.createElement("div");
        popup.classList.add("captcha-wrap");
        popup.innerHTML = `
            <div class="captcha-overlay" close></div>
	        <div class="captcha-body">
	        	<div class="captcha-title">
	        		<span>select all</span>
	        		<span class="get-name">${que}</span>
	        		<div class="icon" close>
                    <i class="fa-solid fa-xmark"></i>
	        		</div>
	        	</div>
	        	<div class="captcha-images">
                ${imageHTML}
	        	</div>
	        	<div class="captcha-button">
	        		<div class="icon" refresh>
                    <i class="fa-solid fa-arrows-rotate"></i>
	        		</div>
	        		<button type="button" verify>verify</button>
	        	</div>
	        </div>
                `
        document.body.appendChild(popup);
        this.popupEventsSetup();
    }
    popupEventsSetup() {
        const popup = document.querySelector(".captcha-wrap");
        const DOM = {
            close: popup.querySelectorAll("[close]"),
            images: popup.querySelectorAll(".images"),
            refresh: popup.querySelectorAll("[refresh]"),
            verify: popup.querySelectorAll("[verify]")
        }

        DOM.close.forEach(btn => {
            btn.addEventListener("click", e => {
                let target = e.target.closest(".captcha-wrap");
                target.remove();
            })
        })
        DOM.images.forEach(img => {
            img.addEventListener("click", e => {
                let img = e.target;
                let target = img.closest(".images");
                target.classList.toggle("active")
            })
        })
        DOM.refresh.forEach((elm) => {
            elm.addEventListener("click", e => {
                this.refresh(e);
            })
        })
        DOM.verify.forEach((elm) => {
            elm.addEventListener("click", e => {
                this.verify(e);
            })
        })
    }
    refresh(e) {
        let popup = e.target.closest(".captcha-wrap");
        popup.remove();
        this.open();
    }
    verify(e) {
        let popup = e.target.closest(".captcha-wrap");
        let activeImages = popup.querySelectorAll(".images.active");
        if (activeImages.length != 2) {
            this.refresh(e);
            return;
        }
        let status = Array.from(activeImages).reduce((a, c) => {
            let img = c.querySelector("img");
            let name = img.alt.split("-");
            name.pop();
            return a && (name.join("-") == this.correctque)
        }, true);
        if (!status) {
            this.refresh(e);
            return;
        }
        this.isValid();
        popup.remove();
    }
    
}