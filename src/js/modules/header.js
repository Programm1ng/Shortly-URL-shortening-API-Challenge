export default class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.openMenuBtn = document.querySelector('.openMenuButton');
    this.closeMenuBtn = document.querySelector('.closeMenuButton');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.isMenuVisible = false;
    this.events();
  }

  events() {
    if (this.openMenuBtn != null) {
      this.openMenuBtn.addEventListener('click', this.handleMenu.bind(this));
    }

    if (this.openMenuBtn != null) {
      this.closeMenuBtn.addEventListener('click', this.handleMenu.bind(this));
    }

    if (this.header != null) {
      window.addEventListener('scroll', this.handleHeaderWhileScroll.bind(this));
    }
  }

  handleMenu() {
    if (this.isMenuVisible) {
      this.openMenuBtn.classList.remove('hidden');
      this.closeMenuBtn.classList.add('hidden');
      this.mobileMenu.classList.add('hidden');
      this.mobileMenu.classList.remove('flex');
      this.mobileMenu
    } else {
      this.mobileMenu.classList.remove('hidden');
      this.mobileMenu.classList.add('flex');
      this.openMenuBtn.classList.add('hidden');
      this.closeMenuBtn.classList.remove('hidden');
    }

    this.isMenuVisible = !this.isMenuVisible;
  }

  handleHeaderWhileScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('shadow-lg');
    } else {
      this.header.classList.remove('shadow-lg');
    }
  }
}