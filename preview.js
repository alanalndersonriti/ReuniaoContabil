function atualizarPreview() {
  document.getElementById('paginaA4').innerHTML = `
    <h1>Reunião de Boas-Vindas</h1>

    <p><strong>Código:</strong> ${state.codigo}</p>
    <p><strong>Razão Social:</strong> ${state.razao}</p>
    <p><strong>Data:</strong> ${state.data}</p>

    <h3>Escopo da Implantação</h3>
    <p>${state.escopo.replace(/\n/g, '<br>')}</p>

    <h3>Próximos Passos</h3>
    <p>${state.proximos.replace(/\n/g, '<br>')}</p>
  `;
}
