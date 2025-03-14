const apiUrl = 'http://localhost:3000/api/books';

document.getElementById('formLivro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookId = document.getElementById('bookId').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const description = document.getElementById('description').value;
  const publishedDate = document.getElementById('publishedDate').value;

  const bookData = { title, author, description, publishedDate };

  try {
    let response;
    if (bookId) {
      // Atualizar livro
      response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    } else {
      // Criar livro
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
    }
    await response.json();
    document.getElementById('formLivro').reset();
    loadBooks();
  } catch (error) {
    console.error('Erro na operação:', error);
  }
});

async function loadBooks() {
  try {
    const res = await fetch(apiUrl);
    const books = await res.json();
    const list = document.getElementById('listaLivros');
    list.innerHTML = '';

    books.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${book.title}</strong> - ${book.author}<br>
        ${book.description ? book.description : ''}<br>
        <small>${book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : ''}</small>
        <div class="action-buttons">
          <button class="edit-btn" onclick="editBook('${book._id}')">Editar</button>
          <button class="delete-btn" onclick="deleteBook('${book._id}')">Excluir</button>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar os livros:', error);
  }
}

async function deleteBook(id) {
  if (confirm('Deseja realmente excluir este livro?')) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      loadBooks();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }
}

async function editBook(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`);
    const book = await res.json();
    document.getElementById('bookId').value = book._id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('description').value = book.description;
    document.getElementById('publishedDate').value = book.publishedDate ? book.publishedDate.split('T')[0] : '';
  } catch (error) {
    console.error('Erro ao editar:', error);
  }
}

// Carregar livros ao iniciar
loadBooks();

// Registro do Service Worker para PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.error('Erro no registro do SW', err));
}

