var refresh_input = document.querySelector('input[name=refresh_freq]')
var refresh_info = document.querySelector('span')
var form = document.querySelector('form')
form.onsubmit = () => {
  window.localStorage.setItem('refresh_freq', parseInt(refresh_input.value, 10))
  return false;
}

refresh_input.onchange = () => {
  refresh_info.innerHTML = refresh_input.value
}

(() => {
  refresh_input.value = window.localStorage.getItem('refresh_freq') || 3
  refresh_info.innerHTML = refresh_input.value
})()