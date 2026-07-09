// ==================== NAVBAR ATIVO ====================
function destacarPaginaAtual() {
    const links = document.querySelectorAll('.nav-links a');
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === paginaAtual) {
            link.classList.add('ativo');
        } else {
            link.classList.remove('ativo');
        }
    });
}

// ==================== FILTROS DE CURSOS ====================
function inicializarFiltros() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.card-curso[data-categoria]');

    if (!filtroBtns.length || !cards.length) return;

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove ativo de todos
            filtroBtns.forEach(b => b.classList.remove('ativo'));
            // Ativa o clicado
            btn.classList.add('ativo');

            const categoria = btn.textContent.trim().toLowerCase();

            cards.forEach(card => {
                const cardCategoria = card.getAttribute('data-categoria');

                if (categoria === 'todos') {
                    card.style.display = 'flex';
                } else {
                    if (cardCategoria === categoria) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ==================== TABS LOGIN/CADASTRO ====================
function inicializarTabsAuth() {
    const tabs = document.querySelectorAll('.auth-tab');
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    if (!tabs.length || !formLogin || !formCadastro) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tipo = tab.textContent.trim().toLowerCase();

            tabs.forEach(t => t.classList.remove('ativo'));

            if (tipo === 'entrar') {
                tabs[0].classList.add('ativo');
                formLogin.classList.remove('hidden');
                formCadastro.classList.add('hidden');
            } else {
                tabs[1].classList.add('ativo');
                formCadastro.classList.remove('hidden');
                formLogin.classList.add('hidden');
            }
        });
    });
}

// ==================== LOGIN ====================
function fazerLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    
    // Simulação - depois conectamos ao backend
    alert('Login realizado com sucesso! Redirecionando para pagamento...');
    window.location.href = 'pagamento.html';
}

// ==================== CADASTRO ====================
function fazerCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    
    // Simulação - depois conectamos ao backend
    alert('Cadastro realizado com sucesso! Redirecionando para pagamento...');
    window.location.href = 'pagamento.html';
}

// ==================== COPIAR PIX ====================
function inicializarBotaoCopiar() {
    const btnCopiar = document.querySelector('.btn-copiar');
    if (!btnCopiar) return;

    btnCopiar.addEventListener('click', () => {
        const codigo = document.getElementById('pix-codigo').textContent;
        navigator.clipboard.writeText(codigo).then(() => {
            btnCopiar.textContent = 'Copiado!';
            btnCopiar.classList.add('copiado');
            setTimeout(() => {
                btnCopiar.textContent = 'Copiar';
                btnCopiar.classList.remove('copiado');
            }, 2000);
        });
    });
}

// ==================== ROLAGEM SUAVE ====================
function inicializarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const alvo = document.querySelector(href);
            if (alvo) {
                e.preventDefault();
                alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    destacarPaginaAtual();
    inicializarFiltros();
    inicializarTabsAuth();
    inicializarBotaoCopiar();
    inicializarRolagemSuave();
});