const state = {
  codigo: '',
  razao: '',
  data: '',
  escopo: '',
  proximos: ''
};

document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => {
    state.codigo = document.getElementById('codigoCliente').value;
    state.razao = document.getElementById('razaoSocial').value;
    state.data = document.getElementById('dataReuniao').value;
    state.escopo = document.getElementById('escopo').value;
    state.proximos = document.getElementById('proximosPassos').value;

    atualizarPreview();
  });
});
