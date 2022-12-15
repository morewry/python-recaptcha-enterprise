import {
  LitElement,
  css,
  html,
} from "https://unpkg.com/lit@2.4.1/index.js?module";
import {
  ref,
  createRef,
} from "https://unpkg.com/lit@2.4.1/directives/ref.js?module";
import { asyncReplace } from "https://unpkg.com/lit@2.4.1/directives/async-replace.js?module";
import "https://unpkg.com/@material/mwc-button@0.27.0/mwc-button.js?module";
import "https://unpkg.com/@material/mwc-textfield@0.27.0/mwc-textfield.js?module";
import "https://unpkg.com/@material/mwc-textarea@0.27.0/mwc-textarea.js?module";
import "https://unpkg.com/@material/mwc-fab@0.27.0/mwc-fab.js?module";

const STEPS = ["buy", "signup", "login", "checkout", "review"];

async function* countTime(count) {
  // TODO: legitimate while condition
  while (count < 60) {
    yield count++;
    await new Promise((r) => setTimeout(r, 1000));
  }
}

class RecaptchaDemo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host,
      .demo {
        font-family: sans-serif;
        min-height: 100vh;
      }
      .demo {
        --blue: rgb(56, 113, 224);
        --pink: rgb(219, 52, 146);
        --teal: rgb(112, 184, 117);
      }
      .demo {
        background: linear-gradient(
              45deg,
              transparent calc(50% - 0.5px),
              #bbb 50%,
              transparent calc(50% + 1px)
            )
            5vw 0 / 5vw 5vw no-repeat fixed,
          linear-gradient(
              -45deg,
              transparent calc(50% - 0.5px),
              #bbb 50%,
              transparent calc(50% + 1px)
            )
            5vw 0 / 5vw 5vw no-repeat fixed,
          linear-gradient(180deg, #bbb 1px, transparent 1px) -1px -1px / auto
            5vw repeat fixed,
          linear-gradient(90deg, #bbb 1px, transparent 1px) -1px -1px / 5vw auto
            repeat fixed,
          linear-gradient(90deg, #ccc, #ccc) 40vw 25vw / 15vw 5vw no-repeat
            fixed,
          linear-gradient(90deg, #ddd, #ddd) 0 25vw / 45vw 25vw no-repeat fixed,
          linear-gradient(90deg, #ddd, #ddd) 15vw 20vw / 20vw 60vw no-repeat
            fixed,
          linear-gradient(90deg, #ddd, #ddd) 5vw 55vw / 60vw 20vw no-repeat
            fixed,
          linear-gradient(90deg, #ddd, #ddd) 5vw 10vw / 80vw 10vw no-repeat
            fixed,
          linear-gradient(90deg, #ddd, #ddd) 15vw 0 / 30vw 10vw no-repeat fixed,
          linear-gradient(90deg, #ccc, #ccc) 80vw 0 / 5vw 10vw no-repeat fixed,
          linear-gradient(
              45deg,
              #ccc 25%,
              transparent 25%,
              transparent 75%,
              #ccc 75%
            )
            0 0 / 10vw 10vw repeat fixed,
          linear-gradient(
              45deg,
              #ccc 25%,
              transparent 25%,
              transparent 75%,
              #ccc 75%
            )
            5vw 5vw / 10vw 10vw repeat fixed,
          #ddd;
      }
      .demo {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 1fr;
      }
      /* Slotted */
      ::slotted(.g-recaptcha) {
        display: block;
      }
      ::slotted(div.g-recaptcha) {
        display: block;
        margin-top: 24px;
      }
      ::slotted(button) {
        pointer-events: none;
      }
      ::slotted(button[onclick]),
      ::slotted(button.g-recaptcha) {
        cursor: pointer;
        pointer-events: auto;
      }
      /* Button */
      button.target,
      .shadows button,
      ::slotted(button) {
        appearance: none;
        background: transparent;
        border: 0;
        color: inherit;
        display: block;
        font: inherit;
        margin: 0;
        outline: 0;
        padding: 0;
      }
      ::slotted(button) {
        padding: 24px 0;
        width: 100%;
      }
      .submit.danger {
        --mdc-theme-primary: var(--pink);
        --mdc-button-outline-color: var(--pink);
      }
      .submit.success {
        --mdc-theme-primary: var(--blue);
      }
      /* Generic */
      ul.unstyled {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      img {
        height: auto;
        max-width: 5vw;
      }
      fieldset {
        border: 0;
        margin: 0;
        padding: 0;
      }
      legend {
        display: block;
        font-weight: bold;
        margin: 0 0 36px 0;
        padding: 0;
        text-align: center;
      }
      mwc-textfield {
        margin-bottom: 24px;
        width: 100%;
      }
      mwc-textarea {
        display: block;
        margin-bottom: 24px;
      }
      mwc-button {
        margin-bottom: 24px;
      }
      a {
        color: var(--blue);
        display: block;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
      }
      /* Form */
      section.form {
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: safe center;
        left: 0;
        position: fixed;
        top: 0;
        width: 50%;
      }
      .form-content {
        background: #fff;
        border-radius: 50px 0;
        box-shadow: 10px 10px 30px -10px rgba(0, 0, 0, 0.4);
        margin: auto;
        max-width: 400px;
        padding: 36px;
        position: relative;
        width: 100%;
        z-index: 2;
      }
      .form-overlay {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 3;
      }
      .form-overlay.enabled {
        z-index: 1;
      }
      /* Guide */
      section.guide {
        background: #fff;
        box-shadow: -8px 0 12px -8px rgba(0, 0, 0, 0.4);
        min-height: 100vh;
      }
      .guide-content {
        padding: 36px;
        height: 200vh; /* TODO: remove, for testing scroll during dev */
      }
      .guide-overlay {
        background: #fff;
        bottom: 0;
        box-sizing: border-box;
        padding: 12px 36px;
        position: fixed;
        width: 50%;
      }
      .guide h1 {
        margin: 0 0 36px 0;
        padding: 0;
      }
      .guide p,
      .guide ul {
        margin-bottom: 24px;
      }
      /* Menu */
      nav.mode {
        --mdc-theme-on-secondary: black;
        --mdc-theme-secondary: white;
        margin-left: 24px;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
      }
      img.mode {
        width: 24px;
      }
      nav.mode li + li {
        margin-top: 24px;
      }
      nav.mode .current {
        --mdc-theme-on-secondary: black;
        --mdc-theme-secondary: var(--teal);
      }
      /* Products */
      ul.products {
        align-items: end; /* TODO: may not be needed after asset cleanup */
        display: grid;
        gap: 24px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
      ul.products img {
        display: block;
        margin: 0 auto 24px auto;
      }
      /* Shadows */
      @keyframes shadow-enter {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes shadow-drift {
        0% {
          transform: rotate(0deg) translateX(-6px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(-6px) rotate(-360deg);
        }
      }
      @keyframes shadow-shake {
        0% {
          transform: translateX(4px);
        }
        100% {
          transform: translateX(-4px);
        }
      }
      @keyframes shadow-capture {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      ul.shadows {
        display: block;
      }
      ul.shadows li {
        --delay: 500ms;
        animation: 1s ease-out 0s 1 normal both running shadow-enter;
        position: absolute;
        opacity: 0;
      }
      ul.shadows li:nth-child(1) {
        animation-delay: calc(1 * var(--delay));
        left: calc(1 * 5vw - 5vw);
        top: calc(1 * 5vw - 5vw);
      }
      ul.shadows li:nth-child(2) {
        animation-delay: calc(2 * var(--delay));
        left: calc(3 * 5vw - 5vw);
        top: calc(2 * 5vw - 5vw);
      }
      ul.shadows li:nth-child(3) {
        animation-delay: calc(3 * var(--delay));
        bottom: 0;
        left: 0;
        margin-bottom: -10px;
      }
      ul.shadows li:nth-child(4) {
        animation-delay: calc(4 * var(--delay));
        right: calc(2 * 5vw - 5vw);
        bottom: calc(2 * 5vw - 5vw);
      }
      ul.shadows li:nth-child(5) {
        animation-delay: calc(5 * var(--delay));
        right: calc(3 * 5vw - 5vw);
        top: calc(2 * 5vw - 5vw);
      }
      ul.shadows li:nth-child(6) {
        animation-delay: calc(6 * var(--delay));
        right: calc(1 * 5vw - 5vw);
        top: calc(1 * 5vw - 5vw);
      }
      ul.shadows img {
        animation: 2s ease-in-out 0s infinite normal both running shadow-drift;
        height: auto;
        width: 100px;
      }
      ul.shadows img.flame {
        width: 46px;
      }
      ul.shadows li:nth-child(1) img {
        animation-delay: calc(1 * var(--delay));\
      }
      ul.shadows li:nth-child(2) img {
        animation-delay: calc(2 * var(--delay));\
      }
      ul.shadows li:nth-child(3) img {
        animation-delay: calc(3 * var(--delay));\
      }
      ul.shadows li:nth-child(4) img {
        animation-delay: calc(4 * var(--delay));\
      }
      ul.shadows li:nth-child(5) img {
        animation-delay: calc(5 * var(--delay));\
      }
      ul.shadows li:nth-child(6) img {
        animation-delay: calc(6 * var(--delay));\
      }
      ul.shadows button {
        cursor: url("../static/images/magnifier-unoptimized.svg") 32 32, auto;
      }
      ul.shadows button:focus img,
      ul.shadows button:hover img {
        animation: 150ms ease-in-out 0s infinite normal both running shadow-shake;        
      }
      ul.shadows button.captured {
        animation: 500ms ease-out 0s 1 normal forwards running shadow-capture;
      }
      /* Castle */
      @keyframes shadow-hop {
        0% {
          transform: rotate(-24deg) translateY(0);
        }
        100% {
          transform: rotate(-18deg) translateY(-6px);
        }
      }
      @keyframes shadow-travel {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(35vw);
        }
      }
      @keyframes castle-destroy {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        25% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1);
        }
        75% {
          opacity: 0.5;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      @keyframes castle-shake {
        0% {
          transform: translateY(-2px);
        }
        100% {
          transform: translateY(2px);
        }
      }
      .destroy {}
      .destroy .target {
        cursor: url("../static/images/magnifier-unoptimized.svg") 32 32, auto;
        position: absolute;
        right: 5vw;
        top: 0;
      }
      .destroy .castle {
        margin-top: 9px; /* TODO: remove after asset cleanup */
        width: 100px;
      }
      .destroy .shadow {
        left: 5vw;
        margin-top: -7px;
        position: absolute;
        top: 0;
        transform: rotate(-24deg);
        width: 75px;
      }
      .destroy.free .target:focus,
      .destroy.free .target:hover {
        animation: 150ms ease-in-out 0s infinite normal both running castle-shake;        
      }
      .destroy.captured .target {
        animation: 400ms linear 3.5s 1 normal forwards running castle-destroy;
      }
      .destroy.captured .destroyer {
        animation: 4s ease-in 0s 1 normal forwards running shadow-travel;
      }
      .destroy .shadow {
        animation: 1s linear 0s infinite alternate both running shadow-hop;
      }
      /* Grade */
      .grade.warning p {
        display: none;
      }
      .grade.warning.human p.human,
      .grade.warning.bot p.bot {
        display: block;
      }
      /* Score */
      ul.score {
        align-items: center;
        display: inline-flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-bottom: 0;
        white-space: nowrap;
      }
      .score li {
        align-items: center;
        display: flex;
        flex: 1 0 auto;
        flex-wrap: nowrap;
        margin-right: 36px;
      }
      .score img {
        margin-right: 12px;
        width: 24px;
      }
    `;
  }

  static properties = {
    capturedCastles: { type: Array, state: true, attribute: false },
    capturedShadows: { type: Array, state: true, attribute: false },
    step: { type: String },
    mode: { type: String },
    timer: { type: Number, state: true, attribute: false },
    done: { type: Boolean, state: true, attribute: false },
    captured: { type: Boolean, state: true, attribute: false },
    grade: { type: String, state: true, attribute: false },
    /* TODO: update score/verdict when payload is standardized */
    score: { type: String },
    verdict: { type: String },
  };

  badMugshot = createRef();
  badStop = createRef();
  badWarning = createRef();
  button = createRef();
  goodCastle = createRef();
  goodCelebrate = createRef();
  goodMagnifier = createRef();
  goodShield = createRef();
  shadowArrow = createRef();
  shadowBlob = createRef();
  shadowCreeper = createRef();
  shadowFlame = createRef();
  shadowGhost = createRef();
  shadowSkull = createRef();

  constructor() {
    super();
    this.step = "buy";
    this.mode = "human";
    this.score = undefined;
    this.verdict = undefined;
    this.capturedShadows = [];
    this.capturedCastles = [];
    this.timer = countTime(this.timer || 0);
    this.captured = false;
    this.done = false;
    this.grade = "warning";
  }

  willUpdate() {
    if (this.score && this.verdict) {
      if (this.mode === "human") {
        this.done = this.capturedShadows.length >= 6;
      } else {
        this.done = this.capturedCastles.length >= 1;
      }
    }
    if (this.mode === "human") {
      this.captured = this.capturedShadows.length >= 6;
    } else {
      this.captured = this.capturedCastles.length >= 1;
    }
    this.gradeStep();
  }

  updated() {
    setTimeout(() => {
      if (this.button.value) {
        const button = this.button.value.shadowRoot.querySelector("button");
        const slot = button.querySelector(".slot-container");
        button.style.height = "auto";
        slot.style.flexDirection = "column";
      }
    }, 0);
  }

  goToBotMode() {
    this.mode = "bot";
  }

  goToHumanMode() {
    this.mode = "human";
  }

  goToNextStep() {
    const nextIndex = STEPS.indexOf(this.step) + 1;
    const nextStep = STEPS[nextIndex];
    if (nextStep) {
      // this.step = nextStep;
      window.location.assign(`${window.location.origin}\\${nextStep}`);
    }
  }

  handleSlotchange() {
    // TODO: remove if not needed
  }

  handleSubmit() {
    if (this.score && this.verdict) {
      this.goToNextStep();
      return;
    }
    this.gradeStep();
    // TODO: interrogate slotted button for callback?
  }

  gradeStep() {
    console.log("gradestep");
    // TODO
    if (this.done && this.mode === "human") {
      this.grade = "celebrate";
      return;
    }
    if (this.done && this.mode === "bot") {
      this.grade = "mugshot";
      return;
    }
    if (!this.done && !this.captured) {
      this.grade = "warning";
      return;
    }
    if (!this.done && this.captured) {
      this.grade = "stop";
      return;
    }
  }

  captureShadow(event) {
    this.capturedShadows = [
      ...this.capturedShadows,
      event.currentTarget.dataset.shadowId,
    ];
  }

  captureCastle(event) {
    this.capturedCastles = [
      ...this.capturedCastles,
      event.currentTarget.dataset.shadowId,
    ];
  }

  render() {
    const MENU = html`
      <nav class="mode">
        <ul class="unstyled">
          <li>
            <mwc-fab
              @click=${this.goToHumanMode}
              aria-description="Pose as a human"
              aria-label="Human Mode"
              class="${this.mode === "human" ? "current" : ""}"
            >
              <img
                alt="Magnifying Glass Icon"
                class="mode magnifier"
                slot="icon"
                src="../static/images/magnifier-unoptimized.svg"
              />
            </mwc-fab>
          </li>
          <li>
            <mwc-fab
              @click=${this.goToBotMode}
              aria-description="Pose as a bot"
              aria-label="Bot Mode"
              class="${this.mode === "bot" ? "current" : ""}"
            >
              <img
                alt="Castle Icon"
                class="mode castle"
                slot="icon"
                src="../static/images/castle-unoptimized.svg"
              />
            </mwc-fab>
          </li>
        </ul>
      </nav>
    `;

    const BUTTON = html`
      <mwc-button
        ${ref(this.button)}
        @click=${this.handleSubmit}
        fullwidth
        class="submit ${this.done ? "success" : "danger"}"
        ?disabled=${!this.captured}
        ?outlined=${!this.done}
        ?unelevated=${this.done}
      >
        <slot @slotchange=${this.handleSlotchange}></slot>
      </mwc-button>
    `;

    const FORMS = {
      buy: html`
        <h2 id="legend" class="mdc-typography--headline5">Example products</h2>
        <ul class="unstyled products">
          <li class="item">
            <img
              alt="Demo Product Shield"
              src="../static/images/shield-unoptimized.svg"
            />
            <div>
              <mwc-button
                @click=${this.handleSubmit}
                fullwidth
                class="submit ${this.done ? "success" : "danger"}"
                ?disabled=${!this.captured}
                ?outlined=${!this.done}
                ?unelevated=${this.done}
              >
                Buy
              </mwc-button>
            </div>
          </li>
          <li class="item">
            <img
              alt="Demo Product Arrow"
              src="../static/images/shadow-arrow-unoptimized.svg"
            />
            <div>
              <mwc-button
                @click=${this.handleSubmit}
                fullwidth
                class="submit ${this.done ? "success" : "danger"}"
                ?disabled=${!this.captured}
                ?outlined=${!this.done}
                ?unelevated=${this.done}
              >
                Buy
              </mwc-button>
            </div>
          </li>
        </ul>
      `,
      checkout: html`
        <form>
          <fieldset>
            <legend id="legend" class="mdc-typography--headline5">
              Example check out
            </legend>
            <dl class="unstyled cart">
              <dt>
                <img
                  alt="Demo Product Shield"
                  src="../static/images/shield-unoptimized.svg"
                />
              </dt>
              <dd>1</dd>
            </dl>
            <mwc-textfield
              label="Address"
              type="text"
              value="123 Address Street City, ST 00000"
            ></mwc-textfield>
            <mwc-textfield
              label="Credit card"
              type="number"
              value="7777-8888-3333-2222"
            ></mwc-textfield>
          </fieldset>
          <div>${BUTTON}</div>
        </form>
      `,
      login: html`
        <form>
          <fieldset>
            <legend id="legend" class="mdc-typography--headline5">
              Example log in
            </legend>
            <mwc-textfield
              label="Email"
              type="email"
              value="user@example.com"
            ></mwc-textfield>
            <mwc-textfield
              label="Password"
              type="password"
              value="password"
            ></mwc-textfield>
          </fieldset>
          <div>${BUTTON}</div>
        </form>
      `,
      review: html`
        <form action="/submit">
          <fieldset>
            <legend id="legend" class="mdc-typography--headline5">
              Example leave review
            </legend>
            <mwc-textarea label="Review" value="Good job."></mwc-textarea>
          </fieldset>
          <div>${BUTTON}</div>
        </form>
      `,
      signup: html`
        <form>
          <fieldset>
            <legend id="legend" class="mdc-typography--headline5">
              Example sign up
            </legend>
            <mwc-textfield
              label="Email"
              type="email"
              value="user@example.com"
            ></mwc-textfield>
            <mwc-textfield
              label="Password"
              type="password"
              value="password"
            ></mwc-textfield>
            <mwc-textfield
              label="Confirm Password"
              type="password"
              value="password"
            ></mwc-textfield>
          </fieldset>
          <div>${BUTTON}</div>
        </form>
      `,
    };

    const OVERLAYS = {
      human: html`
        <ul class="shadows unstyled">
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("arrow")
                ? "captured"
                : "free"}"
              data-shadow-id="arrow"
            >
              <img
                ${ref(this.shadowArrow)}
                alt="The Arrow Bot"
                class="shadow arrow"
                src="../static/images/shadow-arrow-unoptimized.svg"
              />
            </button>
          </li>
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("blob")
                ? "captured"
                : "free"}"
              data-shadow-id="blob"
            >
              <img
                ${ref(this.shadowBlob)}
                alt="The Blob Bot"
                class="shadow blob"
                src="../static/images/shadow-blob-unoptimized.svg"
              />
            </button>
          </li>
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("creeper")
                ? "captured"
                : "free"}"
              data-shadow-id="creeper"
            >
              <img
                ${ref(this.shadowCreeper)}
                alt="The Creeper Bot"
                class="shadow creeper"
                src="../static/images/shadow-creeper-unoptimized.svg"
              />
            </button>
          </li>
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("flame")
                ? "captured"
                : "free"}"
              data-shadow-id="flame"
            >
              <img
                ${ref(this.shadowFlame)}
                alt="The Flame Bot"
                class="shadow flame"
                src="../static/images/shadow-flame-unoptimized.svg"
              />
            </button>
          </li>
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("ghost")
                ? "captured"
                : "free"}"
              data-shadow-id="ghost"
            >
              <img
                ${ref(this.shadowGhost)}
                alt="The Ghost Bot"
                class="shadow ghost"
                src="../static/images/shadow-ghost-unoptimized.svg"
              />
            </button>
          </li>
          <li>
            <button
              @click=${this.captureShadow}
              class="${this.capturedShadows.includes("skull")
                ? "captured"
                : "free"}"
              data-shadow-id="skull"
            >
              <img
                ${ref(this.shadowSkull)}
                alt="The Skull Bot"
                class="shadow skull"
                src="../static/images/shadow-skull-unoptimized.svg"
              />
            </button>
          </li>
        </ul>
      `,
      bot: html`
        <div
          class="destroy ${this.capturedCastles.includes("castle")
            ? "captured"
            : "free"}"
        >
          <div class="destroyer">
            <img
              ${ref(this.shadowGhost)}
              alt="The Ghost Bot"
              class="shadow ghost"
              src="../static/images/shadow-ghost-unoptimized.svg"
            />
          </div>
          <button
            @click=${this.captureCastle}
            class="target"
            data-shadow-id="castle"
          >
            <img
              ${ref(this.goodCastle)}
              alt="The Castle"
              class="castle"
              src="../static/images/castle-unoptimized.svg"
            />
          </button>
        </div>
      `,
    };

    const SCORE = html`
      <ul class="score unstyled">
        <li>
          <img
            alt="Shadows Captured"
            class="shadow skull"
            src="../static/images/shadow-skull-unoptimized.svg"
          />
          ${this.capturedShadows.length}
        </li>
        <li>
          <img
            alt="Castles Captured"
            class="target castle"
            src="../static/images/castle-unoptimized.svg"
          />
          ${this.capturedCastles.length}
        </li>
        <li>Score: ${this.score}</li>
        <li>Verdict: ${this.verdict}</li>
        <li>Time: ${asyncReplace(this.timer)}</li>
      </ul>
    `;

    const GUIDES = {
      buy: html`
        <h1 id="h1" class="mdc-typography--headline4">Using...</h1>
        <ul class="mdc-typography--body1">
          <li>
            What is this an example of? (Answer: invisible score on page load)
          </li>
          <li>Why would you verify when the page loads?</li>
          <li>What kind of key? Why? How would you create?</li>
          <li>How would you load JS API?</li>
          <li>How would you set up the challenge?</li>
          <li>How would you fetch the token?</li>
          <li>How would you create an assessment?</li>
          <li>How would you interpret the score?</li>
          <li>How would you handle the final score?</li>
        </ul>
      `,
      checkout: html`
        <h1 id="h1" class="mdc-typography--headline4">Using...</h1>
        <ul class="mdc-typography--body1">
          <li>
            What is this an example of? (Answer: invisible score on programmatic
            user action)
          </li>
          <li>
            Why would you use an invisible score programmatically on user
            interaction?
          </li>
          <li>What kind of key? Why? How would you create?</li>
          <li>How would you load JS API?</li>
          <li>How would you set up the challenge?</li>
          <li>How would you fetch the token?</li>
          <li>How would you create an assessment?</li>
          <li>How would you interpret the score?</li>
          <li>How would you handle the final score?</li>
        </ul>
      `,
      login: html`
        <h1 id="h1" class="mdc-typography--headline4">Using...</h1>
        <ul class="mdc-typography--body1">
          <li>
            What is this an example of? (Answer: invisible score auto bind html
            button)
          </li>
          <li>
            Why would you use an invisible score auto bound to an html button?
          </li>
          <li>What kind of key? Why? How would you create?</li>
          <li>How would you load JS API?</li>
          <li>How would you set up the challenge?</li>
          <li>How would you fetch the token?</li>
          <li>How would you create an assessment?</li>
          <li>How would you interpret the score?</li>
          <li>How would you handle the final score?</li>
        </ul>
      `,
      review: html`
        <h1 id="h1" class="mdc-typography--headline4">Using...</h1>
        <ul class="mdc-typography--body1">
          <li>
            What is this an example of? (Answer: checkbox automatically
            rendered)
          </li>
          <li>Why would you use a checkbox and automatically render it?</li>
          <li>What kind of key? Why? How would you create?</li>
          <li>How would you load JS API?</li>
          <li>How would you set up the challenge?</li>
          <li>How would you fetch the token?</li>
          <li>How would you create an assessment?</li>
          <li>How would you interpret the score?</li>
          <li>How would you handle the final score?</li>
        </ul>
      `,
      signup: html`
        <h1 id="h1" class="mdc-typography--headline4">Using...</h1>
        <ul class="mdc-typography--body1">
          <li>
            What is this an example of? (Answer: checkbox explicitly rendered)
          </li>
          <li>Why would you use a checkbox and explicitly render it?</li>
          <li>What kind of key? Why? How would you create?</li>
          <li>How would you load JS API?</li>
          <li>How would you set up the challenge?</li>
          <li>How would you fetch the token?</li>
          <li>How would you create an assessment?</li>
          <li>How would you interpret the score?</li>
          <li>How would you handle the final score?</li>
        </ul>
      `,
    };

    const GRADE = {
      celebrate: html`
        <div class="grade celebrate">
          <img
            ${ref(this.goodCelebrate)}
            alt="Celebrate"
            src="../static/images/celebrate-unoptimized.svg"
          />
          <p>Message about winning by successfully letting humans through.</p>
        </div>
      `,
      warning: html`
        <div class="grade warning ${this.mode}">
          <img
            ${ref(this.badWarning)}
            alt="Warning"
            src="../static/images/warning-unoptimized.svg"
          />
          <p class="human">Prompt about capturing the shadows.</p>
          <p class="bot">Prompt about capturing the castle.</p>
        </div>
      `,
      stop: html`
        <div class="grade stop">
          <img
            ${ref(this.badStop)}
            alt="Stop"
            src="../static/images/stop-unoptimized.svg"
          />
          <p>
            Warning about needing to verify if the user is a human or a bot.
          </p>
        </div>
      `,
      mugshot: html`
        <div class="grade mugshot">
          <img
            ${ref(this.badMugshot)}
            alt="Bot Caught"
            src="../static/images/mugshot-unoptimized.svg"
          />
          <p>Message about winning by successfully blocking a bot.</p>
        </div>
      `,
    };

    return html`
      <style>
        @import "https://unpkg.com/@material/typography@14.0.0/dist/mdc.typography.min.css";
      </style>
      <main class="demo">
        <div class="column from">
          <section class="form" aria-labelledby="legend">
            <div class="form-content">${FORMS[this.step]}</div>
            <div class="form-overlay ${this.captured ? "enabled" : ""}">
              <div>${OVERLAYS[this.mode]}</div>
              <div>${MENU}</div>
            </div>
          </section>
        </div>
        <div class="column guide">
          <section class="guide" aria-labelledby="h1">
            <div class="guide-content">
              <div>${GUIDES[this.step]}</div>
              <div>${GRADE[this.grade]}</div>
            </div>
            <div class="guide-overlay">${SCORE}</div>
          </section>
        </div>
      </main>
    `;
  }
}

customElements.define("recaptcha-demo", RecaptchaDemo);
