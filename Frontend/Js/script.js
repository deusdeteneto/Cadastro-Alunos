//Masks
$("#inputPhone").mask("(99) 9 9999-9999");

// Função para carregar alunos na tabela
function carregarAlunos() {
  axios
    .get("http://localhost:8080/students")
    .then((response) => {
      const alunos = response.data;
      const tabela = document.getElementById("alunosTableBody");
      tabela.innerHTML = "";

      alunos.forEach((aluno, index) => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${aluno.name}</td>
          <td class="col d-none d-md-table-cell">${aluno.email}</td>
          <td class="col d-none d-md-table-cell">${aluno.phone}</td>
          <td class="col d-none d-md-table-cell">${
            aluno.idCurso || "Curso não informado"
          }</td>
          <td class="col d-none d-md-table-cell">${
            aluno.period || "Turno não informado"
          }</td>
        `;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar alunos:", error);
    });
}

// Função para carregar cursos no select
function carregarCursos() {
  axios
    .get("http://localhost:8080/courses")
    .then((response) => {
      const cursos = response.data;
      const selectCurso = document.getElementById("inputCurso");
      selectCurso.innerHTML =
        '<option value="" disabled selected>Selecione o Curso</option>';

      cursos.forEach((curso) => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = curso.name;
        selectCurso.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar cursos:", error);
    });
}

// Função de inicialização quando a página carregar
window.onload = function () {
  carregarAlunos();
  carregarCursos();
};

// Captura o evento de submit do formulário
document
  .getElementById("formCadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const telefone = document.getElementById("inputPhone").value;
    const idCurso = document.getElementById("inputCurso").value;
    const period = document.querySelector(
      'input[name="gridRadios"]:checked'
    ).value;

    const novoAluno = {
      name: nome,
      email: email,
      phone: telefone,
      idCurso: idCurso, // Verifique se o backend espera `idCurso` ou `courseId`
      period: period,
    };

    axios
      .post("http://localhost:8080/students", novoAluno)
      .then(() => {
        // Atualiza a tabela com o novo aluno
        carregarAlunos();

        document.getElementById("formCadastro").reset();
      })
      .catch((error) => {
        console.error("Erro ao salvar aluno:", error);
      });
  });
