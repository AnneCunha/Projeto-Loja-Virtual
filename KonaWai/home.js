 
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
            modalDescription.innerHTML = "Este é o <strong>" + title + "</strong>, disponível por <strong>" + price + "</strong>. Aproveite a oferta e leve o seu!";


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

     
        const menuToggle = document.querySelector('.menu-toggle');
        const buttons = document.querySelectorAll('.ButtonHome');

        menuToggle.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.toggle('active'));
        });
    
   
const input = 
document.getElementById("Tpesquisa");
const botao =
document.getElementById("btbuscar");
const resultado =
document.getElementById("resultado");

botao.addEventListener("click",() =>{ 
 const texto = input.value; 
 resultado.textContent = "Resultado: "+ texto;   
})

input.addEventListener("keydown", (evento)=>{ 
    if (evento.key === "Enter"){
        const texto = input.value;
        resultado.textContent= "Resultado"+ texto;
    }
    } );



