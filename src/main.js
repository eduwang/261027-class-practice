import './style.css'

document.documentElement.classList.add('js')

const menuButton = document.querySelector('.menu-button')
const navigation = document.querySelector('.site-nav')
const menuLabel = menuButton.querySelector('.sr-only')

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false')
  menuLabel.textContent = '메뉴 열기'
  navigation.classList.remove('is-open')
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!isOpen))
  menuLabel.textContent = isOpen ? '메뉴 열기' : '메뉴 닫기'
  navigation.classList.toggle('is-open', !isOpen)
})

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu)
})

document.querySelector('#current-year').textContent = new Date().getFullYear()

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.classList.add('is-visible')
  })
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.16 },
  )

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    revealObserver.observe(element)
  })
}
