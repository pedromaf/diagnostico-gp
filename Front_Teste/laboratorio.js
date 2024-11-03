document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada");

    loadFormData();  // Carrega dados salvos no formulário

    const nextStepButton = document.querySelector('.btn-primary');
    if (nextStepButton) {
        console.log("Botão encontrado, adicionando evento de clique");

        nextStepButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("Botão clicado");

            saveFormData();  // Salva os dados
            //exibirDadosPaciente();  // Exibe dados salvos antes de redirecionar

            // Redireciona para a próxima página
            window.location.href = './sintomatologia.html';
        });
    } else {
        console.log("Botão .btn-primary não encontrado.");
    }
});

function saveFormData() {
    const pacienteData = localStorage.getItem('pacienteData') || "{}";
    const parsedData = JSON.parse(pacienteData);

    const examesLaboratoriais = {
        ALB: document.getElementById('ALB')?.value || "",
        ALP: document.getElementById('ALP')?.value || "",
        ALT: document.getElementById('ALT')?.value || "",
        AST: document.getElementById('AST')?.value || "",
        BIL: document.getElementById('BIL')?.value || "",
        CHE: document.getElementById('CHE')?.value || "",
        CHOL: document.getElementById('CHOL')?.value || "",
        CREA: document.getElementById('CREA')?.value || "",
        GGT: document.getElementById('GGT')?.value || "",
        PROT: document.getElementById('PROT')?.value || ""
    };

    // Atualiza dados e salva no localStorage
    Object.assign(parsedData, {examesLaboratoriais});
    localStorage.setItem('pacienteData', JSON.stringify(parsedData));
    console.log("Dados salvos:", parsedData);
}

function loadFormData() {
    const pacienteData = localStorage.getItem('pacienteData');
    if (pacienteData) {
        const formData = JSON.parse(pacienteData);

        // Carrega exames laboratoriais
        Object.entries(formData.examesLaboratoriais || {}).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) input.value = value;
        });
    }
}

function exibirDadosPaciente() {
    console.log("Função exibirDadosPaciente chamada");
    const pacienteData = JSON.parse(localStorage.getItem('pacienteData') || "{}");
    console.log("Dados do paciente carregados:", pacienteData);

    if (pacienteData && Object.keys(pacienteData).length > 0) {
        let dadosPacienteStr = "Dados completos do paciente:\n";

        // Dados de prontuário e histórico
        if (pacienteData.examesLaboratoriais) {
            dadosPacienteStr += `\nExames Laboratoriais: ${JSON.stringify(pacienteData.examesLaboratoriais, null, 2)}`;
        }
        

        alert(dadosPacienteStr);
    } else {
        alert("Nenhum dado encontrado.");
    }
}
