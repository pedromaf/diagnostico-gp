function saveFormData() {
  const pacienteData = localStorage.getItem('pacienteData');
  const prontuarioPaciente = {
    nome: document.getElementById('nome-paciente').value || "",
    dataNascimento: document.getElementById('data-nascimento').value || "",
    genero: document.getElementById('genero').value || "",
    endereco: document.getElementById('endereco').value || "",
    celular: document.getElementById('celular').value || "",
    email: document.getElementById('email').value || "",
    dataConsulta: document.getElementById('data-consulta').value || ""
  };

  // Obter estado dos checkboxes
  const alegiasPaciente = {
    leite: document.getElementById('leite').checked || false,
    ovo: document.getElementById('ovo').checked || false,
    frutosDoMar: document.getElementById('fmar').checked || false,
    amendoimNozes: document.getElementById('AN').checked || false,
    aspirinaAAS: document.getElementById('AAS').checked || false,
    penicilina: document.getElementById('Pni').checked || false,
    aines: document.getElementById('AINEs').checked || false,
    acaros: document.getElementById('acaros').checked || false,
    poeira: document.getElementById('poeira').checked || false,
    polen: document.getElementById('polen').checked || false,
    abelhas: document.getElementById('abelha').checked || false,
    gatoCachorro: document.getElementById('CG').checked || false
  };

  const formData = pacienteData ? JSON.parse(pacienteData) : {};

  // Atualizar os dados
  Object.assign(formData, {
    prontuarioPaciente,
    alegiasPaciente,
  });

  localStorage.setItem('pacienteData', JSON.stringify(formData));
  console.log("Dados salvos:", formData);
}

function loadFormData() {
  const pacienteData = localStorage.getItem('pacienteData');
  if (pacienteData) {
    const formData = JSON.parse(pacienteData);
    
    const prontuarioPaciente = formData.prontuarioPaciente || {};
    document.getElementById('nome-paciente').value = prontuarioPaciente.nome || "";
    document.getElementById('data-nascimento').value = prontuarioPaciente.dataNascimento || "";
    document.getElementById('genero').value = prontuarioPaciente.genero || "";
    document.getElementById('endereco').value = prontuarioPaciente.endereco || "";
    document.getElementById('celular').value = prontuarioPaciente.celular || "";
    document.getElementById('email').value = prontuarioPaciente.email || "";
    document.getElementById('data-consulta').value = prontuarioPaciente.dataConsulta || "";

    // Carregar estado dos checkboxes
    const alegiasPaciente = formData.alegiasPaciente || {};
    document.getElementById('leite').checked = alegiasPaciente.leite || false;
    document.getElementById('ovo').checked = alegiasPaciente.ovo || false;
    document.getElementById('fmar').checked = alegiasPaciente.frutosDoMar || false;
    document.getElementById('AN').checked = alegiasPaciente.amendoimNozes || false;
    document.getElementById('AAS').checked = alegiasPaciente.aspirinaAAS || false;
    document.getElementById('Pni').checked = alegiasPaciente.penicilina || false;
    document.getElementById('AINEs').checked = alegiasPaciente.aines || false;
    document.getElementById('acaros').checked = alegiasPaciente.acaros || false;
    document.getElementById('poeira').checked = alegiasPaciente.poeira || false;
    document.getElementById('polen').checked = alegiasPaciente.polen || false;
    document.getElementById('abelha').checked = alegiasPaciente.abelhas || false;
    document.getElementById('CG').checked = alegiasPaciente.gatoCachorro || false;
  }
}

function exibirDadosPaciente() {
  const pacienteData = JSON.parse(localStorage.getItem('pacienteData'));
  console.log("Dados do paciente carregados:", pacienteData);

  if (pacienteData) {
    let dadosPacienteStr = "Dados completos do paciente:\n";

    if (pacienteData.prontuarioPaciente) {
      dadosPacienteStr += "\nDados Pessoais:\n" + JSON.stringify(pacienteData.prontuarioPaciente, null, 2);
    }
    if (pacienteData.alegiasPaciente) {
      dadosPacienteStr += "\nAlergias:\n" + JSON.stringify(pacienteData.alegiasPaciente, null, 2);
    }

    alert(dadosPacienteStr);
  } else {
    alert("Nenhum dado encontrado.");
    console.log("Nenhum dado encontrado no localStorage.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Página carregada");

  loadFormData();
  const nextStepButton = document.querySelector('.btn-primary');
  
  if (nextStepButton) {
    console.log("Botão encontrado e adicionando evento de clique");

    nextStepButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log("Botão clicado");

      saveFormData();
      //exibirDadosPaciente();
      
      // Redireciona após exibir dados
      window.location.href = './historico.html';
    });
  } else {
    console.log("Botão .btn-primary não encontrado.");
  }
});
