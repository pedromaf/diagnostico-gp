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
            //exibirDadosPaciente();  // Exibe dados salvos (comentei esta linha, se não quiser exibir agora)

            // Redireciona para a próxima página
            window.location.href = './laboratorio.html';
        });
    } else {
        console.log("Botão .btn-primary não encontrado.");
    }
});

function saveFormData() {
    const pacienteData = localStorage.getItem('pacienteData') || "{}";
    const parsedData = JSON.parse(pacienteData);

    // Dados do formulário
    const condicoesGerais = {
        fumante: document.getElementById('fumante').checked || false,
        alcool: document.getElementById('alcool').checked || false
    };

    const antecedentesClinicos = {
        diabetes: document.getElementById('diabetes')?.checked || false,
        hipertensao: document.getElementById('hipertensao')?.checked || false,
        asma: document.getElementById('asma')?.checked || false,
        hipotireoidismo: document.getElementById('hipotireoidismo')?.checked || false,
        artrite: document.getElementById('artrite')?.checked || false,
        cancer: document.getElementById('cancer')?.checked || false,
        depressao: document.getElementById('depressao')?.checked || false,
        doencaRenal: document.getElementById('doenca_renal')?.checked || false,
        hepatite: document.getElementById('hepatite')?.checked || false,
        tuberculose: document.getElementById('tuberculose')?.checked || false,
        anemia: document.getElementById('anemia')?.checked || false,
        insuficienciaCardiaca: document.getElementById('insuficiencia_cardiaca')?.checked || false,
        doencaPulmonar: document.getElementById('doenca_pulmonar')?.checked || false,
        alzheimer: document.getElementById('alzheimer')?.checked || false,
        avc: document.getElementById('avc')?.checked || false,
        epilepsia: document.getElementById('epilepsia')?.checked || false
    };

    const antecedentesFamiliares = {
        diabetes: document.getElementById('diabetes_f')?.checked || false,
        hipertensao: document.getElementById('hipertensao_f')?.checked || false,
        asma: document.getElementById('asma_f')?.checked || false,
        hipotireoidismo: document.getElementById('hipotireoidismo_f')?.checked || false,
        artrite: document.getElementById('artrite_f')?.checked || false,
        cancer: document.getElementById('cancer_f')?.checked || false,
        depressao: document.getElementById('depressao_f')?.checked || false,
        doencaRenal: document.getElementById('doenca_renal_f')?.checked || false,
        hepatite: document.getElementById('hepatite_f')?.checked || false,
        tuberculose: document.getElementById('tuberculose_f')?.checked || false,
        anemia: document.getElementById('anemia_f')?.checked || false,
        insuficienciaCardiaca: document.getElementById('insuficiencia_cardiaca_f')?.checked || false,
        doencaPulmonar: document.getElementById('doenca_pulmonar_f')?.checked || false,
        alzheimer: document.getElementById('alzheimer_f')?.checked || false,
        avc: document.getElementById('avc_f')?.checked || false,
        epilepsia: document.getElementById('epilepsia_f')?.checked || false
    };

    // Atualiza dados e salva no localStorage
    Object.assign(parsedData, {
        condicoesGerais,
        antecedentesClinicos,
        antecedentesFamiliares
    });
    localStorage.setItem('pacienteData', JSON.stringify(parsedData));
    console.log("Dados salvos:", parsedData);
}

function loadFormData() {
    const pacienteData = localStorage.getItem('pacienteData');
    if (pacienteData) {
        const formData = JSON.parse(pacienteData);

        // Carrega Condições Gerais
        document.getElementById('fumante').checked = formData.condicoesGerais?.fumante || false;
        document.getElementById('alcool').checked = formData.condicoesGerais?.alcool || false;

        // Carrega antecedentes clínicos e familiares
        Object.entries(formData.antecedentesClinicos || {}).forEach(([key, value]) => {
            const checkbox = document.getElementById(key);
            if (checkbox) checkbox.checked = value;
        });

        Object.entries(formData.antecedentesFamiliares || {}).forEach(([key, value]) => {
            const checkbox = document.getElementById(`${key}_f`);
            if (checkbox) checkbox.checked = value;
        });
    }
}

function exibirDadosPaciente() {
    const pacienteData = JSON.parse(localStorage.getItem('pacienteData') || "{}");
    if (pacienteData && Object.keys(pacienteData).length > 0) {
        let dadosPacienteStr = "Dados completos do paciente:\n";

        // Dados de prontuário e histórico
        if (pacienteData.prontuarioPaciente) {
            dadosPacienteStr += `\nProntuário:\n${JSON.stringify(pacienteData.prontuarioPaciente, null, 2)}`;
        }

        if (pacienteData.condicoesGerais) {
            dadosPacienteStr += `\nCondições Gerais: ${JSON.stringify(pacienteData.condicoesGerais, null, 2)}\n`;
        }
        if (pacienteData.antecedentesClinicos) {
            dadosPacienteStr += `\nAntecedentes Clínicos: ${JSON.stringify(pacienteData.antecedentesClinicos, null, 2)}\n`;
        }
        if (pacienteData.antecedentesFamiliares) {
            dadosPacienteStr += `\nAntecedentes Familiares: ${JSON.stringify(pacienteData.antecedentesFamiliares, null, 2)}\n`;
        }

        if (pacienteData.sintomatologia && pacienteData.sintomatologia.length > 0) {
            dadosPacienteStr += `\n\nSintomas:\n${JSON.stringify(pacienteData.sintomatologia, null, 2)}`;
        }

        alert(dadosPacienteStr);
    } else {
        alert("Nenhum dado encontrado.");
    }
}
