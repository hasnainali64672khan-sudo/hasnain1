import { Component } from '@theme/component';

export class AnnouncementBar extends Component {
  connectedCallback() {
    super.connectedCallback();

    const track = this.querySelector('.announcement-bar__track');
    if (!track) return;

    const contents = track.querySelectorAll('.announcement-bar__content');
    if (contents.length < 2) return;

    const original = contents[0];
    const clone = contents[1];

    let scrollSpeed = this.getAttribute('data-speed') || 1;
    let animationId = null;
    let paused = false;

    const getTotalWidth = () => {
      return original.scrollWidth;
    };

    let pos = 0;

    const step = () => {
      if (!paused) {
        pos -= scrollSpeed;
        const totalWidth = getTotalWidth();

        if (Math.abs(pos) >= totalWidth) {
          pos = 0;
        }

        track.style.transform = `translateX(${pos}px)`;
      }
      animationId = requestAnimationFrame(step);
    };

    this.addEventListener('mouseenter', () => { paused = true; });
    this.addEventListener('mouseleave', () => { paused = false; });
    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
    });

    animationId = requestAnimationFrame(step);

    this.disconnectedCallback = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
  }
}

if (!customElements.get('announcement-bar-component')) {
  customElements.define('announcement-bar-component', AnnouncementBar);
}
