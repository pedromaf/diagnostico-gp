function saveFormData() {
  const pacienteData = localStorage.getItem("pacienteData");
  const prontuarioPaciente = {
    nome: document.getElementById("nome-paciente").value || "",
    dataNascimento: document.getElementById("data-nascimento").value || "",
    genero: document.getElementById("genero").value || "",
    endereco: document.getElementById("endereco").value || "",
    celular: document.getElementById("celular").value || "",
    email: document.getElementById("email").value || "",
    dataConsulta: document.getElementById("data-consulta").value || "",
  };

  // Obter estado dos checkboxes

  const formData = pacienteData ? JSON.parse(pacienteData) : {};

  // Atualizar os dados
  Object.assign(formData, {
    prontuarioPaciente,
  });

  localStorage.setItem("pacienteData", JSON.stringify(formData));
  console.log("Dados salvos:", formData);
}

function loadFormData() {
  const pacienteData = localStorage.getItem("pacienteData");
  if (pacienteData) {
    const formData = JSON.parse(pacienteData);

    const prontuarioPaciente = formData.prontuarioPaciente || {};
    document.getElementById("nome-paciente").value =
      prontuarioPaciente.nome || "";
    document.getElementById("data-nascimento").value =
      prontuarioPaciente.dataNascimento || "";
    document.getElementById("genero").value = prontuarioPaciente.genero || "";
    document.getElementById("endereco").value =
      prontuarioPaciente.endereco || "";
    document.getElementById("celular").value = prontuarioPaciente.celular || "";
    document.getElementById("email").value = prontuarioPaciente.email || "";
    document.getElementById("data-consulta").value =
      prontuarioPaciente.dataConsulta || "";
  }
}

function exibirDadosPaciente() {
  const pacienteData = JSON.parse(localStorage.getItem("pacienteData"));
  console.log("Dados do paciente carregados:", pacienteData);

  if (pacienteData) {
    let dadosPacienteStr = "Dados completos do paciente:\n";

    if (pacienteData.prontuarioPaciente) {
      dadosPacienteStr +=
        "\nDados Pessoais:\n" +
        JSON.stringify(pacienteData.prontuarioPaciente, null, 2);
    }

    alert(dadosPacienteStr);
  } else {
    alert("Nenhum dado encontrado.");
    console.log("Nenhum dado encontrado no localStorage.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada");

  loadFormData();
  const nextStepButton = document.querySelector(".btn-primary");

  if (nextStepButton) {
    console.log("Botão encontrado e adicionando evento de clique");

    nextStepButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Botão clicado");

      saveFormData();
      //exibirDadosPaciente();

      // Redireciona após exibir dados
      window.location.href = "./historico.html";
    });
  } else {
    console.log("Botão .btn-primary não encontrado.");
  }
});
