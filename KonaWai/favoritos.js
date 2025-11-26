function loadFavorites() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function saveFavorites(favs) {
    localStorage.setItem("favoritos", JSON.stringify(favs));
}

document.querySelectorAll('.favorite-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const item = event.currentTarget.closest('.novidade');

        const product = {
            title: item.querySelector('h2').textContent,
            price: item.querySelector('.NovidadePreco').textContent,
            image: item.querySelector('img').src
        };

        let favoritos = loadFavorites();

        const exists = favoritos.some(fav => fav.title === product.title);

        if (exists) {
            favoritos = favoritos.filter(fav => fav.title !== product.title);
            event.currentTarget.textContent = "🤍";
        } else {
            favoritos.push(product);
            event.currentTarget.textContent = "❤️";
        }

        saveFavorites(favoritos);
    });
});