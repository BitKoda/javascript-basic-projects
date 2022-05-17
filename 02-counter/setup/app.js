// set initial count
let count = 0;

// select value an buttons
const value = document.getElementById('value');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(function (button) {
    button.addEventListener('click', function(e) {
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')) {
            count--;
        }
        else if(styles.contains('increase')) {
            count++;
        }
        else {
            count = 0;
        }
        if(count > 0) {
            value.style.color = 'green';
        }
        if(count < 0) {
            value.style.color = 'red';
        }
        if(count === 0) {
            value.style.color = 'black';
        }
        value.textContent = count;
    })
})
