// traversing the DOM
// const qBtns = document.querySelectorAll('.question-btn');

// qBtns.forEach(function (btn) {
//     btn.addEventListener('click', function(e) {
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     })
// })

// using selectors inside element
const questions = document.querySelectorAll('.question');

questions.forEach(function (question) {
    const btn = question.querySelector('.question-btn');
    
    btn.addEventListener('click', function () {
        questions.forEach(function (others) {
            if (others !== question) { others.classList.remove('show-text') };
        });
        
        question.classList.toggle('show-text');
    });
});

