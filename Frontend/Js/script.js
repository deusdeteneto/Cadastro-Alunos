//Masks
$("#inputPhone").mask("(99) 9 9999-9999");

// Array de Alunos pré carregada
let alunos = [
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    telefone: "(99) 12345-6789",
    curso: "JavaScript",
    turno: "Manhã",
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    telefone: "(00) 98765-4321",
    curso: "Java",
    turno: "Tarde",
  },
];

//Carregar Alunos na Tabela apartir de um Objeto
function carregarAlunos() {
  const tabela = document.getElementById("alunosTableBody");
  tabela.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${aluno.nome}</td>
            <td class="col d-none d-md-table-cell">${aluno.email}</td>
            <td class="col d-none d-md-table-cell">${aluno.telefone}</td>
            <td class="col d-none d-md-table-cell">${aluno.curso}</td>
            <td class="col d-none d-md-table-cell">${aluno.turno}</td>
        `;
  });
}

// Carregar alunos ao carregar a página
window.onload = carregarAlunos;

// Captura o evento de submit do Botão do formulário
document
  .getElementById("formCadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const telefone = document.getElementById("inputPhone").value;
    const curso =
      document.getElementById("inputCurso").options[
        document.getElementById("inputCurso").selectedIndex
      ].text;
    const turno = document
      .querySelector('input[name="gridRadios"]:checked')
      .parentElement.textContent.trim();

    // Adiciona o novo aluno ao array
    alunos.push({ nome, email, telefone, curso, turno });

    // Atualiza a tabela com o novo aluno
    carregarAlunos();

    // Limpar o formulário após adicionar o aluno
    document.getElementById("formCadastro").reset();
  });
