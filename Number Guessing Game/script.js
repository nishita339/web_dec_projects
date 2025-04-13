const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const userGuess = document.getElementById('guess').value;
    attempts++;
    let message = '';

    if (userGuess == randomNumber) {
        message = `Congratulations! You guessed the right number in ${attempts} attempts.`;
        document.getElementById('message').innerText = message;
        document.getElementById('guess').disabled = true;
        document.getElementById('celebration').style.display = 'block';
        confetti();
    } else if (userGuess < randomNumber) {
        message = 'Too low! Try again.';
    } else {
        message = 'Too high! Try again.';
    }

    document.getElementById('message').innerText = message;
}

function confetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
        const timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        const particleCount = 50 * (timeLeft / duration);
        const defaults = { spread: 360, ticks: 60, gravity: 0.5, decay: 0.9, colors: ['#bb0000', '#ffffff'] };

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
        requestAnimationFrame(frame);
    }());
}