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
import { classMap } from "https://unpkg.com/lit@2.4.1/directives/class-map.js?module";
import "https://unpkg.com/@material/mwc-button@0.27.0/mwc-button.js?module";
import "https://unpkg.com/@material/mwc-textfield@0.27.0/mwc-textfield.js?module";
import "https://unpkg.com/@material/mwc-textarea@0.27.0/mwc-textarea.js?module";
import "https://unpkg.com/@material/mwc-fab@0.27.0/mwc-fab.js?module";
import "https://unpkg.com/@material/mwc-drawer@0.27.0/mwc-drawer.js?module";
import "https://unpkg.com/@material/mwc-top-app-bar@0.27.0/mwc-top-app-bar.js?module";
import "https://unpkg.com/@material/mwc-icon-button@0.27.0/mwc-icon-button.js?module";

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
      /* ... */
      :host {
        display: block;
      }
      :host,
      .demo {
        font-family: sans-serif;
        min-height: 100vh;
      }
      .demo {
        /* Blues */
        --blue-10: #c5dbff;
        --blue-20: #82b1ff;
        --blue-30: #448aff;
        --blue-40: #1a73e8;
        --blue-50: #0065d3;
        --blue-60: #0254c2;
        /* Grays */
        --gray-10: #efefef;
        --gray-20: #dddddd;
        --gray-30: #bfbfbf;
        --gray-40: #80868b;
        --gray-50: #646a6d;
        --gray-60: #3f4244;
        /* Indigos */
        --indigo-60: #1d3ba9;
        --indigo-70: #0c2b77;
        --indigo-80: #091742;
        /* Purples */
        --purple-30: #9961e2;
        --purple-40: #6c27a8;
        --purple-50: #47127f;
        /* Pinks */
        --pink-20: #ff8dd6;
        --pink-30: #ef4fa6;
        --pink-40: #ee0290;
        --pink-50: #bf087e;
        /* Greens */
        --green-20: #b2dfdb;
        --green-30: #5eccbe;
        --green-40: #4db6ac;
        --green-50: #26998B;
      }
      .demo {
        background: 
          radial-gradient(circle, var(--indigo-70), var(--indigo-80)) 0 0 / 50vw 100vh no-repeat fixed,
          var(--indigo-80);
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
        --mdc-theme-primary: var(--pink-40);
        --mdc-button-outline-color: var(--pink-40);
      }
      .submit.success {
        --mdc-theme-primary: var(--blue-40);
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
        display: block;
        margin: 0 auto;
        max-width: 350px;
        padding: 0;
      }
      legend,
      .legend {
        display: block;
        font-family: "Press Start 2P", monospace;
        margin: 0;
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
      mwc-drawer {
        --mdc-drawer-width: 50vw;
      }
      mwc-drawer[open] mwc-top-app-bar {
        /* Default width of drawer is 256px. See CSS Custom Properties below */
        --mdc-top-app-bar-width: calc(100% - var(--mdc-drawer-width, 50vw));
      }
      mwc-top-app-bar {
        --mdc-theme-primary: transparent;
      }
      a {
        color: var(--blue);
        display: block;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
      }
      p,
      h1,
      h2,
      h3 {
        margin: 0;
        padding: 0;
      }
      /* Form */
      /* TODO */
      /* Guide */
      .h1 {
        font-family: "Press Start 2P", monospace;
        font-size: 1rem;
        margin: 0;
        padding: 0;
      }
      /* Menu */
      nav.mode {
        --mdc-theme-on-secondary: black;
        --mdc-theme-secondary: white;
      }
      nav.mode ul {
        display: flex;
      }
      img.mode {
        width: 24px;
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
      @keyframes game-fade {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .game {
        background: rgba(180, 180, 180, 0.33);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      .game.enabled {
        opacity: 1;
        z-index: 4;
      }
      .game.fading {
        animation: 1s ease-out 0s 1 normal forwards running game-fade;
      }
      .game.disabled {
        display: none;
        z-index: -1;
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
      .grade {
        align-items: center;
        background: var(--gray-10);
        color: #000;
        display: flex;
        padding: 24px;
      }
      .grade img {
        margin-right: 24px;
      }
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
    drawerOpen: { type: Boolean, state: true, attribute: false },
    game: { type: String, state: true, attribute: false },
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
    this.drawerOpen = true;
    this.game = "on";
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

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  goToBotMode() {
    this.mode = "bot";
    this.game = "on";
  }

  goToHumanMode() {
    this.mode = "human";
    this.game = "on";
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

  fullyCapture(event) {
    console.log("fullycapture", event);
    if (
      ["shadow-capture", "castle-destroy"].includes(event.animationName) &&
      this.captured
    ) {
      this.game = "fade";
    }
    if (event.animationName === "game-fade") {
      this.game = "off";
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
      <nav class="mode" slot="actionItems">
        <ul class="unstyled">
          <li>
            <mwc-icon-button
              @click=${this.goToHumanMode}
              aria-description="Pose as a human"
              aria-label="Human Mode"
              class="${this.mode === "human" ? "current" : ""}"
            >
              <img
                alt="Magnifying Glass Icon"
                class="mode magnifier"
                src="../static/images/magnifier-unoptimized.svg"
              />
            </mwc-icon-button>
          </li>
          <li>
            <mwc-icon-button
              @click=${this.goToBotMode}
              aria-description="Pose as a bot"
              aria-label="Bot Mode"
              class="${this.mode === "bot" ? "current" : ""}"
            >
              <img
                alt="Castle Icon"
                class="mode castle"
                src="../static/images/castle-unoptimized.svg"
              />
            </mwc-icon-button>
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
        <h2 class="legend">Example products</h2>
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
        <fieldset>
          <legend class="legend">Example check out</legend>
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
        <fieldset>${BUTTON}</fieldset>
      `,
      login: html`
        <fieldset>
          <legend class="legend">Example log in</legend>
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
        <fieldset>${BUTTON}</fieldset>
      `,
      review: html`
        <fieldset>
          <legend class="legend">Example leave review</legend>
          <mwc-textarea label="Review" value="Good job."></mwc-textarea>
        </fieldset>
        <fieldset>${BUTTON}</fieldset>
      `,
      signup: html`
        <fieldset>
          <legend class="legend">Example sign up</legend>
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
        <fieldset>${BUTTON}</fieldset>
      `,
    };

    const OVERLAYS = {
      human: html`
        <div
          @animationend=${this.fullyCapture}
          class="game ${classMap({
            enabled: this.game === "on",
            disabled: this.game === "off",
            fading: this.game === "fade",
          })}"
        >
          <ul class="shadows unstyled">
            <li>
              <button
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
        </div>
      `,
      bot: html`
        <div
          @animationend=${this.fullyCapture}
          class="game ${classMap({
            enabled: this.game === "on",
            disabled: this.game === "off",
            fading: this.game === "fade",
          })}"
        >
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
              type="button"
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
        </div>
      `,
    };

    const GRADE = {
      celebrate: html`
        <div class="grade celebrate" slot="subtitle">
          <img
            ${ref(this.goodCelebrate)}
            alt="Celebrate"
            src="../static/images/celebrate-unoptimized.svg"
          />
          <p>Message about winning by successfully letting humans through.</p>
        </div>
      `,
      warning: html`
        <div class="grade warning ${this.mode}" slot="subtitle">
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
        <div class="grade stop" slot="subtitle">
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
        <div class="grade mugshot" slot="subtitle">
          <img
            ${ref(this.badMugshot)}
            alt="Bot Caught"
            src="../static/images/mugshot-unoptimized.svg"
          />
          <p>Message about winning by successfully blocking a bot.</p>
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
        <h1 class="h1" slot="title">Using...</h1>
        ${GRADE[this.grade]}
        <ul>
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
        <h1 class="h1" slot="title">Using...</h1>
        ${GRADE[this.grade]}
        <ul>
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
        <h1 class="h1" slot="title">Using...</h1>
        ${GRADE[this.grade]}
        <ul>
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
        <h1 class="h1" slot="title">Using...</h1>
        ${GRADE[this.grade]}
        <ul>
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
        <h1 class="h1" slot="title">Using...</h1>
        ${GRADE[this.grade]}
        <ul>
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

    return html`
      <mwc-drawer
        class="demo"
        hasheader
        type="dismissible"
        ?open=${this.drawerOpen}
      >
        ${GUIDES[this.step]} ${SCORE}
        <form slot="appContent">
          <mwc-top-app-bar>
            <mwc-icon-button
              slot="navigationIcon"
              icon="menu"
              @click=${this.toggleDrawer}
            ></mwc-icon-button>
            <legend slot="title" class="legend">Title</legend>
            ${MENU}
          </mwc-top-app-bar>
          <div>${FORMS[this.step]}</div>
          <div>${OVERLAYS[this.mode]}</div>
        </form>
      </mwc-drawer>
    `;
  }
}

customElements.define("recaptcha-demo", RecaptchaDemo);