document.getElementById('btnGerar').addEventListener('click', () => {
  const htmlFinal = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reunião de Boas-Vindas</title>
</head>
<body>
${document.getElementById('paginaA4').innerHTML}
</body>
</html>`;

  const blob = new Blob([htmlFinal], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'reuniao-boas-vindas.html';
  link.click();
});
