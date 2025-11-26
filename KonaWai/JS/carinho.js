document.addEventListener("DOMContentLoaded", () => {
    
    // --- PARTE 1: LÓGICA DA PÁGINA DE PRODUTOS (Modal e Adicionar) ---
    // Verificamos se o modal existe para saber se estamos na página de produtos
    const modal = document.getElementById('productModal');

    if (modal) {
        const novidades = document.querySelectorAll('.novidade');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const closeModal = document.querySelector('.close');
        const btnAdicionar = document.getElementById('adicionarAoCarrinho');
        
        let produtoSelecionado = null;

        // Abrir Modal
        function openModal(imgSrc, title, price) {
            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = `Este é o ${title}, disponível por ${price}.`;
            
            produtoSelecionado = {
                nome: title,
                precoTexto: price,
                imagem: imgSrc
            };
            document.getElementById('quantity').value = 1;
            modal.classList.add('show');
        }

        // Eventos de clique nos cards
        novidades.forEach((item) => {
            const imgElement = item.querySelector('.novidadeimg');
            imgElement.addEventListener('click', () => {
                const title = item.querySelector('.NovidadeFonte').textContent;
                const price = item.querySelector('.NovidadePreco').textContent;
                const imgSrc = item.querySelector('.novidadeimg').src;
                openModal(imgSrc, title, price);
            });
        });

        // Fechar modal
        closeModal.addEventListener('click', () => modal.classList.remove('show'));
        window.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('show'); });

        // Botão Adicionar ao Carrinho
        btnAdicionar.addEventListener('click', () => {
            if (!produtoSelecionado) return;
            const quantidade = parseInt(document.getElementById('quantity').value);
            const tamanho = document.getElementById('size').value;
            let precoNumerico = parseFloat(produtoSelecionado.precoTexto.replace('R$', '').replace('.', '').replace(',', '.').trim());

            const itemParaCarrinho = {
                nome: produtoSelecionado.nome,
                imagem: produtoSelecionado.imagem,
                preco: precoNumerico,
                quantidade: quantidade,
                tamanho: tamanho
            };

            let carrinho = JSON.parse(localStorage.getItem('carrinhoKonaWai')) || [];
            
            // Verifica duplicidade para somar quantidade
            const index = carrinho.findIndex(item => item.nome === itemParaCarrinho.nome && item.tamanho === itemParaCarrinho.tamanho);
            if (index > -1) {
                carrinho[index].quantidade += quantidade;
            } else {
                carrinho.push(itemParaCarrinho);
            }

            localStorage.setItem('carrinhoKonaWai', JSON.stringify(carrinho));
            alert('Produto adicionado ao carrinho!');
            modal.classList.remove('show');
        });
    }

    // --- PARTE 2: LÓGICA DA PÁGINA DO CARRINHO (Exibir Tabela) ---
    // Verificamos se a tabela existe para saber se estamos na página do carrinho
    const tabelaLista = document.getElementById('listaItens');

    if (tabelaLista) {
        carregarCarrinho();
    }

    function carregarCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinhoKonaWai')) || [];
        const msgVazio = document.getElementById('mensagemVazio');
        const tabela = document.getElementById('tabelaCarrinho');
        const spanTotal = document.getElementById('totalGeral');

        tabelaLista.innerHTML = ''; // Limpa a tabela antes de renderizar
        let totalGeral = 0;

        if (carrinho.length === 0) {
            tabela.style.display = 'none';
            msgVazio.style.display = 'block';
            spanTotal.textContent = 'R$ 0,00';
            return;
        } else {
            tabela.style.display = 'table';
            msgVazio.style.display = 'none';
        }

        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            totalGeral += subtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${item.imagem}" class="img-carrinho" alt="${item.nome}"></td>
                <td>${item.nome}</td>
                <td>${item.tamanho}</td>
                <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td><button class="btn-remover" onclick="removerItem(${index})">Remover</button></td>
            `;
            tabelaLista.appendChild(tr);
        });

        spanTotal.textContent = 'R$ ' + totalGeral.toFixed(2).replace('.', ',');
    }

    // Função global para remover item (precisa estar no window para o onclick do HTML funcionar)
    window.removerItem = function(index) {
        let carrinho = JSON.parse(localStorage.getItem('carrinhoKonaWai')) || [];
        carrinho.splice(index, 1); // Remove o item pelo índice
        localStorage.setItem('carrinhoKonaWai', JSON.stringify(carrinho));
        carregarCarrinho(); // Recarrega a tabela
    };
});
