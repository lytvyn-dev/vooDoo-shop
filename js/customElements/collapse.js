export class MyCollapseElement extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
					font-family: Space Grotesk;
        }
        #header {
          cursor: pointer;
        }
        #content {
          display: ${this.isOpen ? 'block' : 'none'}; 
					padding: 24px ;
					background-color: white;
				}
        #toggleButton {
					display: flex;
					justify-content: space-between;
					align-items: center;
          background-color: black;
          color: white;
          border: none;
          cursor: pointer;
					padding: 24px ;
        }
				#toggleButton > div {
					display: flex;
					gap: 24px;
					
					@media (min-width: 768px) {
						gap: 48px;
					}
				}
				#warning-text {
					font-size: 16px;
					font-weight: 700;
					display: flex;
					align-items: center;
					gap: 6px;
				}
				#text{
					margin: 0;
					font-size: 14px;
					font-weight: 500;
					align-self: center;
					overflow: hidden;
					max-width: 100px;
					white-space: nowrap;

					@media (min-width: 768px) {
						max-width: 100%;
					}
				}
				#arrow {
					align-self: center;
					transform: rotate(${this.isOpen ? '180deg' : '0deg'});
				}
      </style>
      <div id="header">
        <div role='button' id="toggleButton">
					<div>
						<div id='warning-text'> 
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FCF7E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M12 8V12" stroke="#FCF7E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M12 16H12.01" stroke="#FCF7E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						ALPHA
						</div>
						<p id='text'>Important info regarding our service </p>
					</div>
					<span id='arrow'>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M6 9L12 15L18 9" stroke="#FCF7E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot
      .getElementById('toggleButton')
      .addEventListener('click', () => {
        this.toggleCollapse();
      });
  }

  toggleCollapse() {
    this.isOpen = !this.isOpen;
    const contentElement = this.shadowRoot.getElementById('content');
    contentElement.style.display = this.isOpen ? 'block' : 'none';
    const arrow = this.shadowRoot.getElementById('arrow');
    arrow.style.rotate = this.isOpen ? '180deg' : '0deg';
  }
}

if (!customElements.get('my-collapse')) {
  customElements.define('my-collapse', MyCollapseElement);
}
