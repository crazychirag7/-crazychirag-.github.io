let movies = [];

document.getElementById('movieForm').addEventListener('submit', function (e) {
e.preventDefault();

movies.push({
    id: Date.now(),
    title: document.getElementById('title').value.trim(),
    genre: document.getElementById('genre').value.trim(),
    director: document.getElementById('director').value.trim(),
    status: 'To Watch',
    rating: 0
});

this.reset();
renderMovies();
});

function renderMovies() {
const tbody = document.getElementById('movieList');
tbody.innerHTML = '';

movies.forEach(movie => {
    tbody.innerHTML += `
        <tr>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
            <td>
                <select class="form-select status-select" data-id="${movie.id}">
                    <option value="To Watch" ${movie.status === 'To Watch' ? 'selected' : ''}>To Watch</option>
                    <option value="Watching" ${movie.status === 'Watching' ? 'selected' : ''}>Watching</option>
                    <option value="Completed" ${movie.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>
                ${movie.status === 'Completed' ? 
                    `<select class="form-select rating-select" data-id="${movie.id}">
                        ${[0,1,2,3,4,5].map(i => `<option value="${i}" ${movie.rating === i ? 'selected' : ''}>${i}</option>`).join('')}
                    </select>` : '-'}
            </td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${movie.id}">Delete</button>
            </td>
        </tr>`;
});
}

document.getElementById('movieList').addEventListener('change', function (e) {
const id = parseInt(e.target.dataset.id);
const movie = movies.find(m => m.id === id);

if (e.target.classList.contains('status-select')) movie.status = e.target.value;
if (e.target.classList.contains('rating-select')) movie.rating = parseInt(e.target.value);

renderMovies();
});

document.getElementById('movieList').addEventListener('click', function (e) {
if (e.target.classList.contains('delete-btn')) {
movies = movies.filter(m => m.id !== parseInt(e.target.dataset.id));
renderMovies();
}
});

document.getElementById('search').addEventListener('input', function () {
const filter = this.value.toLowerCase();
renderMovies(filter);
});

document.getElementById('sort').addEventListener('change', renderMovies);