<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
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
    Movies();
});

function Movies(filter = '', sortType = 'title') {
    const tbody = document.getElementById('movieList');
    tbody.innerHTML = '';

    let filterMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(filter.toLowerCase()) ||
        movie.director.toLowerCase().includes(filter.toLowerCase())
    );

    filterMovies.sort((a, z) => 
        sortType === 'title' ? a.title.localeCompare(z.title) :
        sortType === 'genre' ? a.genre.localeCompare(z.genre) :
        sortType === 'status' ? a.status.localeCompare(z.status) : 0
    );

    filterMovies.forEach(movie => {
        tbody.innerHTML += `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>${movie.director}</td>
                <td>
                    <select class="form-select status-select" data-id="${movie.id}">
                        ${['To Watch', 'Watching', 'Completed'].map(status => 
                            `<option value="${status}" ${movie.status === status ? 'selected' : ''}>${status}</option>`
                        ).join('')}
                    </select>
                </td>
                <td>
                    ${movie.status === 'Completed' ? 
                        `<select class="form-select rating-select" data-id="${movie.id}">
                            ${[0,1,2,3,4,5].map(i => 
                                `<option value="${i}" ${movie.rating === i ? 'selected' : ''}>${i}</option>`
                            ).join('')}
                        </select>` : '-'}
                </td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${movie.id}">Delete</button>
                </td>
            </tr>`;
    });
}

document.getElementById('movieList').addEventListener('change', function (e) {
    const movie = movies.find(m => m.id === parseInt(e.target.dataset.id));
    if (!movie) return;

    if (e.target.classList.contains('status-select')) movie.status = e.target.value;
    if (e.target.classList.contains('rating-select')) movie.rating = parseInt(e.target.value);

    Movies();
});

document.getElementById('movieList').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        movies = movies.filter(m => m.id !== parseInt(e.target.dataset.id));
        Movies();
    }
});

document.getElementById('search').addEventListener('input', function () {
    Movies(this.value, document.getElementById('sort').value);
});

document.getElementById('sort').addEventListener('change', function () {
    Movies(document.getElementById('search').value, this.value);
});
