const novidades = document.querySelectorAll('.novidadeimg');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

// Função para exibir o modal com animação
function openModal(imgSrc, title, price) {
    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = `Este é o ${title}, disponível por ${price}. Aproveite a oferta e leve o seu!`;

    // Exibe o modal com classe de animação
    modal.classList.add('show');
}

// Adiciona evento de clique em cada novidade
novidades.forEach((novidade) => {
    novidade.addEventListener('click', (event) => {
        const item = event.currentTarget.closest('.novidade');
        const title = item.querySelector('h2').textContent;
        const price = item.querySelector('.NovidadePreco').textContent;
        const imgSrc = item.querySelector('img').src;

        openModal(imgSrc, title, price);
    });
});

// Fechar o modal ao clicar no 'X' ou fora dele
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});