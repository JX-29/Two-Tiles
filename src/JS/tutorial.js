const question = document.querySelector('.tutorial__question');
const cross = document.querySelector('.tutorial__cross');
const tutorial = document.querySelector('.tutorial');


question.addEventListener('click', () => {
    tutorial.classList.add('tutorial_active')
})

cross.addEventListener('click', () => {
    tutorial.classList.remove('tutorial_active')
})