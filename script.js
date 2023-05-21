

typeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<h2>${this.txt}</h2>`;

    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    // Chama a si mesma novamente após um intervalo de tempo
    setTimeout(() => {
        this.type();
        // Se chegou ao final da lista de palavras, reinicia o efeito de digitação
        if (this.wordIndex === this.words.length && this.isDeleting) {
            this.wordIndex = 0;
            this.isDeleting = false;
            setTimeout(() => this.type(), this.wait);
        }
    }, typeSpeed);
}


document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewriter');
    const words = ['Desenvolvedor Web', 'Front-end', 'Back-end', 'Full-stack'];
    const wait = 3000;
    new typeWriter(txtElement, words, wait);
}
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    loader.className += ' hidden';
});



