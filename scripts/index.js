const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)



function changeColor() {
  const custom_color = document.querySelector('#colorpicker').value
  document.body.style.backgroundColor = custom_color;
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
}

animate()