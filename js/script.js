// ==================== CONFIGURAÇÃO ====================
let CONFIG = {
    adminEmail: 'admin@eletrocursos.com',
    adminSenha: 'admin123',
    valorAcesso: 10.00,
    chavePix: '[SUA-CHAVE-PIX-AQUI]',
    nomePix: '[NOME-RECEBEDOR]'
};

let cursos = [
    { id: 1, titulo: 'Eletricista Residencial', categoria: 'elétrica', descricao: 'Aprenda instalações elétricas residenciais do zero, com normas técnicas e segurança.', carga: 40, nivel: 'Iniciante' },
    { id: 2, titulo: 'NR-10 - Segurança em Instalações Elétricas', categoria: 'elétrica', descricao: 'Normas regulamentadoras, medidas de controle de risco e segurança em serviços com eletricidade.', carga: 20, nivel: 'Intermediário' },
    { id: 3, titulo: 'Eletrônica Básica', categoria: 'eletrônica', descricao: 'Componentes, circuitos, medições e solda. Curso prático para iniciantes.', carga: 30, nivel: 'Iniciante' },
    { id: 4, titulo: 'Microcontroladores e Arduino', categoria: 'eletrônica', descricao: 'Programação de microcontroladores, sensores, atuadores e projetos práticos.', carga: 50, nivel: 'Intermediário' },
    { id: 5, titulo: 'Comandos Elétricos', categoria: 'industrial', descricao: 'Motores, contatores, relés, diagramas de comando e automação industrial.', carga: 45, nivel: 'Intermediário' },
    { id: 6, titulo: 'CLP e Automação Industrial', categoria: 'industrial', descricao: 'Controladores lógicos programáveis, linguagem ladder e automação de processos.', carga: 60, nivel: 'Avançado' },
    { id: 7, titulo: 'Energia Solar Fotovoltaica', categoria: 'energia-solar', descricao: 'Dimensionamento, instalação e manutenção de sistemas de energia solar.', carga: 35, nivel: 'Intermediário' },
    { id: 8, titulo: 'Projetos de Energia Solar', categoria: 'energia-solar', descricao: 'Aprenda a elaborar projetos completos de energia solar.', carga: 25, nivel: 'Avançado' }
];

let alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
let pagamentos = JSON.parse(localStorage.getItem('pagamentos') || '[]');

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

    if (!btnEntrar) return;

    if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);

        if (usuario.tipo === 'admin') {
            btnEntrar.textContent = 'Admin';
            btnEntrar.href = 'admin.html';
            btnEntrar.style.color = '#f0c040';
            btnEntrar.style.borderColor = '#f0c040';
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
                card.style.display = (categoria === 'todos' || cardCategoria === categoria) ? 'flex' : 'none';
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

    if (email === CONFIG.adminEmail && senha === CONFIG.adminSenha) {
        const usuario = { nome: 'Administrador', email: email, tipo: 'admin' };
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = 'admin.html';
    } else {
        const usuario = { nome: 'Aluno', email: email, tipo: 'aluno' };
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        salvarAluno(usuario);
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
    salvarAluno(usuario);

    window.location.href = 'pagamento.html';
}

// ==================== SALVAR ALUNO ====================
function salvarAluno(usuario) {
    const existe = alunos.find(a => a.email === usuario.email);
    if (!existe) {
        alunos.push({
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            dataCadastro: new Date().toLocaleDateString('pt-BR'),
            pago: false
        });
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }
}

// ==================== SAIR ====================
function sair() {
    sessionStorage.removeItem('usuarioLogado');
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

// ==================== ADMIN: VERIFICA ACESSO ====================
function verificarAcessoAdmin() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = 'entrar.html';
        return false;
    }

    const usuario = JSON.parse(usuarioLogado);
    if (usuario.tipo !== 'admin') {
        alert('Acesso restrito ao administrador.');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// ==================== ADMIN: TABS ====================
function mostrarSecao(secao) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('ativo'));
    document.querySelectorAll('.admin-secao').forEach(s => s.classList.add('hidden'));

    const tab = Array.from(document.querySelectorAll('.admin-tab')).find(t => 
        t.textContent.trim().toLowerCase().includes(secao)
    );
    if (tab) tab.classList.add('ativo');

    const secaoEl = document.getElementById(`secao-${secao}`);
    if (secaoEl) secaoEl.classList.remove('hidden');

    if (secao === 'cursos') renderizarCursosAdmin();
    if (secao === 'alunos') renderizarAlunosAdmin();
    if (secao === 'pagamentos') renderizarPagamentosAdmin();
    if (secao === 'config') carregarConfig();
}

// ==================== ADMIN: DASHBOARD ====================
function atualizarDashboard() {
    const totalCursosEl = document.getElementById('total-cursos');
    const totalAlunosEl = document.getElementById('total-alunos');
    const totalPagosEl = document.getElementById('total-pagos');
    const totalReceitaEl = document.getElementById('total-receita');

    if (!totalCursosEl) return;

    const totalCursos = cursos.length;
    const totalAlunos = alunos.length;
    const totalPagos = alunos.filter(a => a.pago).length;
    const receita = totalPagos * CONFIG.valorAcesso;

    totalCursosEl.textContent = totalCursos;
    totalAlunosEl.textContent = totalAlunos;
    totalPagosEl.textContent = totalPagos;
    totalReceitaEl.textContent = `R$ ${receita.toFixed(2).replace('.', ',')}`;
}

// ==================== ADMIN: CURSOS ====================
function renderizarCursosAdmin() {
    const tbody = document.getElementById('tabela-cursos');
    if (!tbody) return;

    tbody.innerHTML = cursos.map(curso => `
        <tr>
            <td>${curso.titulo}</td>
            <td><span class="tag">${curso.categoria}</span></td>
            <td>${curso.carga}h</td>
            <td>${curso.nivel}</td>
            <td class="acoes">
                <button class="btn-editar" onclick="editarCurso(${curso.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirCurso(${curso.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

function abrirModalCurso(id = null) {
    const modal = document.getElementById('modal-curso');
    if (!modal) return;

    modal.classList.remove('hidden');

    if (id) {
        const curso = cursos.find(c => c.id === id);
        if (!curso) return;

        document.getElementById('modal-titulo').textContent = 'Editar Curso';
        document.getElementById('curso-id').value = curso.id;
        document.getElementById('curso-titulo').value = curso.titulo;
        document.getElementById('curso-categoria').value = curso.categoria;
        document.getElementById('curso-descricao').value = curso.descricao;
        document.getElementById('curso-carga').value = curso.carga;
        document.getElementById('curso-nivel').value = curso.nivel;
    } else {
        document.getElementById('modal-titulo').textContent = 'Novo Curso';
        document.getElementById('form-curso').reset();
        document.getElementById('curso-id').value = '';
    }
}

function fecharModalCurso() {
    const modal = document.getElementById('modal-curso');
    if (modal) modal.classList.add('hidden');
}

function salvarCurso(event) {
    event.preventDefault();

    const id = document.getElementById('curso-id').value;
    const dados = {
        titulo: document.getElementById('curso-titulo').value,
        categoria: document.getElementById('curso-categoria').value,
        descricao: document.getElementById('curso-descricao').value,
        carga: parseInt(document.getElementById('curso-carga').value),
        nivel: document.getElementById('curso-nivel').value
    };

    if (id) {
        const index = cursos.findIndex(c => c.id === parseInt(id));
        if (index !== -1) cursos[index] = { ...cursos[index], ...dados };
    } else {
        const novoId = cursos.length ? Math.max(...cursos.map(c => c.id)) + 1 : 1;
        cursos.push({ id: novoId, ...dados });
    }

    fecharModalCurso();
    renderizarCursosAdmin();
    atualizarDashboard();
    alert('Curso salvo com sucesso!');
}

function editarCurso(id) {
    abrirModalCurso(id);
}

function excluirCurso(id) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        cursos = cursos.filter(c => c.id !== id);
        renderizarCursosAdmin();
        atualizarDashboard();
    }
}

// ==================== ADMIN: ALUNOS ====================
function renderizarAlunosAdmin() {
    const tbody = document.getElementById('tabela-alunos');
    if (!tbody) return;

    if (alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#808080;">Nenhum aluno cadastrado.</td></tr>';
        return;
    }

    tbody.innerHTML = alunos.map(aluno => `
        <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td><span class="${aluno.pago ? 'status-pago' : 'status-pendente'}">${aluno.pago ? 'Pago' : 'Pendente'}</span></td>
            <td>${aluno.dataCadastro}</td>
            <td class="acoes">
                ${!aluno.pago ? `<button class="btn-editar" onclick="marcarComoPago('${aluno.email}')">Marcar Pago</button>` : ''}
                <button class="btn-excluir" onclick="excluirAluno('${aluno.email}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

function marcarComoPago(email) {
    const aluno = alunos.find(a => a.email === email);
    if (aluno) {
        aluno.pago = true;
        pagamentos.push({
            aluno: aluno.nome,
            email: aluno.email,
            valor: CONFIG.valorAcesso,
            data: new Date().toLocaleDateString('pt-BR')
        });
        localStorage.setItem('alunos', JSON.stringify(alunos));
        localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
        renderizarAlunosAdmin();
        atualizarDashboard();
        alert('Aluno marcado como pago!');
    }
}

function excluirAluno(email) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        alunos = alunos.filter(a => a.email !== email);
        pagamentos = pagamentos.filter(p => p.email !== email);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
        renderizarAlunosAdmin();
        atualizarDashboard();
    }
}

// ==================== ADMIN: PAGAMENTOS ====================
function renderizarPagamentosAdmin() {
    const tbody = document.getElementById('tabela-pagamentos');
    if (!tbody) return;

    if (pagamentos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#808080;">Nenhum pagamento registrado.</td></tr>';
        return;
    }

    tbody.innerHTML = pagamentos.map(p => `
        <tr>
            <td>${p.aluno}</td>
            <td>${p.email}</td>
            <td>R$ ${p.valor.toFixed(2).replace('.', ',')}</td>
            <td><span class="status-pago">Pago</span></td>
            <td>${p.data}</td>
            <td class="acoes">
                <button class="btn-excluir" onclick="excluirPagamento('${p.email}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

function excluirPagamento(email) {
    if (confirm('Tem certeza que deseja excluir este pagamento? O aluno voltará a ficar pendente.')) {
        pagamentos = pagamentos.filter(p => p.email !== email);
        const aluno = alunos.find(a => a.email === email);
        if (aluno) aluno.pago = false;
        localStorage.setItem('alunos', JSON.stringify(alunos));
        localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
        renderizarPagamentosAdmin();
        atualizarDashboard();
    }
}

// ==================== ADMIN: CONFIGURAÇÕES ====================
function carregarConfig() {
    const configValor = document.getElementById('config-valor');
    const configChavePix = document.getElementById('config-chave-pix');
    const configNomePix = document.getElementById('config-nome-pix');
    const configAdminEmail = document.getElementById('config-admin-email');
    const configAdminSenha = document.getElementById('config-admin-senha');

    if (configValor) configValor.value = CONFIG.valorAcesso;
    if (configChavePix) configChavePix.value = CONFIG.chavePix;
    if (configNomePix) configNomePix.value = CONFIG.nomePix;
    if (configAdminEmail) configAdminEmail.value = CONFIG.adminEmail;
    if (configAdminSenha) configAdminSenha.value = CONFIG.adminSenha;
}

function salvarConfig() {
    const configValor = document.getElementById('config-valor');
    const configChavePix = document.getElementById('config-chave-pix');
    const configNomePix = document.getElementById('config-nome-pix');
    const configAdminEmail = document.getElementById('config-admin-email');
    const configAdminSenha = document.getElementById('config-admin-senha');

    CONFIG.valorAcesso = configValor ? parseFloat(configValor.value) : CONFIG.valorAcesso;
    CONFIG.chavePix = configChavePix ? configChavePix.value : CONFIG.chavePix;
    CONFIG.nomePix = configNomePix ? configNomePix.value : CONFIG.nomePix;
    CONFIG.adminEmail = configAdminEmail ? configAdminEmail.value : CONFIG.adminEmail;
    CONFIG.adminSenha = configAdminSenha ? configAdminSenha.value : CONFIG.adminSenha;

    localStorage.setItem('config', JSON.stringify(CONFIG));
    alert('Configurações salvas com sucesso!');
    atualizarDashboard();
}

// ==================== ADMIN: EXPORTAR CSV ====================
function exportarAlunos() {
    if (alunos.length === 0) {
        alert('Nenhum aluno para exportar.');
        return;
    }

    let csv = 'Nome;Email;Status;Data Cadastro\n';
    alunos.forEach(a => {
        csv += `${a.nome};${a.email};${a.pago ? 'Pago' : 'Pendente'};${a.dataCadastro}\n`;
    });
    baixarCSV(csv, 'alunos.csv');
}

function exportarPagamentos() {
    if (pagamentos.length === 0) {
        alert('Nenhum pagamento para exportar.');
        return;
    }

    let csv = 'Aluno;Email;Valor;Data\n';
    pagamentos.forEach(p => {
        csv += `${p.aluno};${p.email};R$ ${p.valor.toFixed(2).replace('.', ',')};${p.data}\n`;
    });
    baixarCSV(csv, 'pagamentos.csv');
}

function baixarCSV(csv, nomeArquivo) {
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}

// ==================== INICIALIZAÇÃO ====================
function inicializarAdmin() {
    const configSalva = localStorage.getItem('config');
    if (configSalva) {
        CONFIG = { ...CONFIG, ...JSON.parse(configSalva) };
    }

    if (window.location.pathname.includes('admin.html')) {
        if (!verificarAcessoAdmin()) return;
        atualizarDashboard();
        renderizarCursosAdmin();
    }
}

// ==================== INICIALIZAÇÃO GERAL ====================
document.addEventListener('DOMContentLoaded', () => {
    destacarPaginaAtual();
    verificarUsuarioLogado();
    inicializarFiltros();
    inicializarBotaoCopiar();
    inicializarRolagemSuave();
    inicializarAdmin();
});

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-curso');
    if (modal && e.target === modal) {
        fecharModalCurso();
    }
});