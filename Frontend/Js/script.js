$("#inputPhone").mask("(99) 9 9999-9999");

const coursesMapa = {
  1: "JavaScript",
  2: "Java",
  3: "Angular",
  4: "Spring",
};

const periodMapa = {
  1: "Manhã",
  2: "Tarde",
  3: "Noite",
};

// carregar alunos na tabela
function carregarAlunos() {
  $.ajax({
    url: "http://localhost:8080/students",
    method: "GET",
    success: function (alunos) {
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
                coursesMapa[aluno.idCurso] || "Curso não informado"
              }</td>
              <td class="col d-none d-md-table-cell">${
                periodMapa[aluno.period] || "Turno não informado"
              }</td>
            `;
      });
    },
    error: function (error) {
      console.error("Erro ao carregar alunos:", error);
    },
  });
}

// carregar cursos
function carregarCursos() {
  $.ajax({
    url: "http://localhost:8080/courses",
    method: "GET",
    success: function (cursos) {
      const selectCurso = document.getElementById("inputCurso");
      selectCurso.innerHTML =
        '<option value="" disabled selected>Selecione o Curso</option>';

      cursos.forEach((curso) => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = curso.name;
        selectCurso.appendChild(option);
      });
    },
    error: function (error) {
      console.error("Erro ao carregar cursos:", error);
    },
  });
}

// inicializar a página
window.onload = function () {
  carregarAlunos();
  carregarCursos();
};

// submit do formulário
document
  .getElementById("formCadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const phone = document.getElementById("inputPhone").value;
    const idCurso = document.getElementById("inputCurso").value;
    const period = document.querySelector(
      'input[name="gridRadios"]:checked'
    ).value;

    const novoAluno = {
      name: nome,
      email: email,
      phone: phone,
      idCurso: parseInt(idCurso),
      period: parseInt(period),
    };

    $.ajax({
      url: "http://localhost:8080/students",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(novoAluno),
      success: function (response) {
        console.log("Aluno salvo com sucesso!", response);

        const tabela = document.getElementById("alunosTableBody");
        const novaLinha = tabela.insertRow();
        const novoId = tabela.rows.length + 1;

        novaLinha.innerHTML = `
              <th scope="row">${novoId}</th>
              <td>${nome}</td>
              <td class="col d-none d-md-table-cell">${email}</td>
              <td class="col d-none d-md-table-cell">${phone}</td>
              <td class="col d-none d-md-table-cell">${coursesMapa[idCurso]}</td>
              <td class="col d-none d-md-table-cell">${periodMapa[period]}</td>
            `;
      },
      error: function (error) {
        console.error("Erro ao cadastrar aluno:", error);
      },
    });
    this.reset();
  });
