// ==================== CONFIGURAÇÃO ADMIN ====================
const ADMIN_EMAIL = 'admin@eletrocursos.com';
const ADMIN_SENHA = 'admin123';

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

// ==================== VERIFICA USUÁRIO LOGADO ====================
function verificarUsuarioLogado() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    const btnEntrar = document.getElementById('btn-entrar');

    if (usuarioLogado && btnEntrar) {
        const usuario = JSON.parse(usuarioLogado);

        if (usuario.tipo === 'admin') {
            btnEntrar.textContent = 'Admin';
            btnEntrar.href = 'admin.html';
            btnEntrar.style.color = '#f0c040';
            btnEntrar.style.borderColor = '#f0c040';
        } else {
            btnEntrar.textContent = 'Meus Cursos';
            btnEntrar.href = '#';
            btnEntrar.style.color = '#22c55e';
            btnEntrar.style.borderColor = '#22c55e';
        }
    }
}

// ==================== FILTROS DE CURSOS ====================
function inicializarFiltros() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.card-curso[data-categoria]');

    if (!filtroBtns.length || !cards.length) return;

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            const categoria = btn.textContent.trim().toLowerCase();

            cards.forEach(card => {
                const cardCategoria = card.getAttribute('data-categoria');

                if (categoria === 'todos') {
                    card.style.display = 'flex';
                } else {
                    card.style.display = cardCategoria === categoria ? 'flex' : 'none';
                }
            });
        });
    });
}

// ==================== TABS LOGIN/CADASTRO ====================
function mostrarForm(tipo) {
    const tabs = document.querySelectorAll('.auth-tab');
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    if (!tabs.length || !formLogin || !formCadastro) return;

    tabs.forEach(t => t.classList.remove('ativo'));

    if (tipo === 'login') {
        tabs[0].classList.add('ativo');
        formLogin.classList.remove('hidden');
        formCadastro.classList.add('hidden');
    } else {
        tabs[1].classList.add('ativo');
        formCadastro.classList.remove('hidden');
        formLogin.classList.add('hidden');
    }
}

// ==================== LOGIN ====================
function fazerLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        const usuario = { nome: 'Administrador', email: email, tipo: 'admin' };
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert('Login de administrador realizado com sucesso!');
        window.location.href = 'admin.html';
    } else {
        const usuario = { nome: 'Aluno', email: email, tipo: 'aluno' };
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert('Login realizado com sucesso! Redirecionando para pagamento...');
        window.location.href = 'pagamento.html';
    }
}

// ==================== CADASTRO ====================
function fazerCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;

    const usuario = { nome: nome, email: email, tipo: 'aluno' };
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    alert('Cadastro realizado com sucesso! Redirecionando para pagamento...');
    window.location.href = 'pagamento.html';
}

// ==================== SAIR ====================
function sair() {
    sessionStorage.removeItem('usuarioLogado');
    alert('Você saiu da sua conta.');
    window.location.href = 'index.html';
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
    verificarUsuarioLogado();
    inicializarFiltros();
    inicializarBotaoCopiar();
    inicializarRolagemSuave();
});