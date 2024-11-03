const sintomas = [
    "Febre", "Tosse", "Fadiga", "Falta de Ar", "Dor no Peito",
    "Dor de Cabeça", "Palpitações", "Náusea", "Vômito", "Tontura",
    "Calafrios", "Perda de Olfato", "Perda de Paladar", "Diarreia",
    "Cansaço Extremo", "Desmaio"
];

const tableBody = document.getElementById('sintomasTableBody');

// Função para gerar a tabela de sintomas
function gerarTabelaSintomas() {
    sintomas.forEach(sintoma => {
        const row = document.createElement('tr');

        const checkboxCell = document.createElement('td');
        const sintomaCheckbox = document.createElement('input');
        sintomaCheckbox.type = 'checkbox';
        sintomaCheckbox.id = sintoma.toLowerCase().replace(/\s+/g, '_'); 
        checkboxCell.appendChild(sintomaCheckbox);

        const sintomaCell = document.createElement('td');
        const sintomaLabel = document.createElement('label');
        sintomaLabel.htmlFor = sintomaCheckbox.id;
        sintomaLabel.textContent = sintoma;
        sintomaLabel.className = 'text-muted h8';
        sintomaCell.appendChild(sintomaLabel);

        const duracaoCell = document.createElement('td');
        const duracaoSelect = document.createElement('select');
        duracaoSelect.className = 'form-select text-muted h8';
        duracaoSelect.innerHTML = `
            <option value=""></option>
            <option value="1">1-3 dias</option>
            <option value="2">4-7 dias</option>
            <option value="3">Entre 1 e 2 semanas</option>
            <option value="4">Mais de 2 semanas</option>
        `;
        duracaoCell.appendChild(duracaoSelect);

        const gravidadeCell = document.createElement('td');
        const gravidadeSelect = document.createElement('select');
        gravidadeSelect.className = 'form-select text-muted h8';
        gravidadeSelect.innerHTML = `
            <option value=""></option>
            <option value="leve">Leve</option>
            <option value="moderada">Moderada</option>
            <option value="grave">Grave</option>
        `;
        gravidadeCell.appendChild(gravidadeSelect);

        row.appendChild(checkboxCell);
        row.appendChild(sintomaCell);
        row.appendChild(duracaoCell);
        row.appendChild(gravidadeCell);

        tableBody.appendChild(row);
    });
}

// Função para coletar dados dos sintomas
function coletarDadosSintomas() {
    const pacienteData = JSON.parse(localStorage.getItem('pacienteData')) || {};
    const rows = document.getElementById('sintomasTableBody').getElementsByTagName('tr');

    const newInfo = { sintomatologia: [] };

    for (const row of rows) {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const sintoma = row.querySelector('td:nth-child(2) label').textContent;
        const duracao = row.querySelector('td:nth-child(3) select').value;
        const gravidade = row.querySelector('td:nth-child(4) select').value;

        if (checkbox.checked) {
            newInfo.sintomatologia.push({
                sintoma: sintoma,
                duracao: duracao,
                gravidade: gravidade
            });
        }
    }

    Object.assign(pacienteData, newInfo);
    localStorage.setItem('pacienteData', JSON.stringify(pacienteData));

    alert("Paciente cadastrados com sucesso!");
}

// Função para exibir dados completos do paciente (incluindo prontuário e histórico)
function exibirDadosPaciente() {
    const pacienteData = JSON.parse(localStorage.getItem('pacienteData') || "{}");
    
    if (pacienteData && Object.keys(pacienteData).length > 0) {
        let dadosPacienteStr = "Dados completos do paciente:\n";

        // Dados de prontuário e histórico
        if (pacienteData.prontuarioPaciente) {
            dadosPacienteStr += `\nProntuário:\n${JSON.stringify(pacienteData.prontuarioPaciente, null, 2)}`;
        }
        if (pacienteData.alegiasPaciente){
            dadosPacienteStr += `\nAlegias: ${JSON.stringify(pacienteData.alegiasPaciente, null, 2)}\n`;
        }
        
        if (pacienteData.condicoesGerais){
            dadosPacienteStr += `\nCondições Gerais: ${JSON.stringify(pacienteData.condicoesGerais, null, 2)}\n`;
        }
        if (pacienteData.antecedentesClinicos){
            dadosPacienteStr += `Antecedentes Clínicos: ${JSON.stringify(pacienteData.antecedentesClinicos, null, 2)}\n`;
        }
        if (pacienteData.antecedentesFamiliares){
            dadosPacienteStr += `Antecedentes Familiares: ${JSON.stringify(pacienteData.antecedentesFamiliares, null, 2)}\n`;
        }
        if (pacienteData.examesLaboratoriais) {
            dadosPacienteStr += `\nExames Laboratoriais: ${JSON.stringify(pacienteData.examesLaboratoriais, null, 2)}`;
        }

        if (pacienteData.sintomatologia && pacienteData.sintomatologia.length > 0) {
            dadosPacienteStr += `\nSintomas:\n${JSON.stringify(pacienteData.sintomatologia, null, 2)}`;
        }

        // Exibe os dados em um alerta
        //alert(dadosPacienteStr);

        // Salva os dados em um arquivo .txt
        const blob = new Blob([dadosPacienteStr], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "pacienteData.txt";

        // Adiciona o link ao DOM, clica nele para iniciar o download e remove o link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } else {
        alert("Nenhum dado encontrado.");
    }
}

function loadFormData() {
    const pacienteData = localStorage.getItem('pacienteData');
    if (pacienteData) {
        const formData = JSON.parse(pacienteData);
        
        const prontuarioPaciente = formData.prontuarioPaciente || {};
        document.getElementById('displayNomePaciente').textContent = prontuarioPaciente.nome || "";
        document.getElementById('displayDataNascimento').textContent = prontuarioPaciente.dataNascimento || "";
        document.getElementById('displayEndereco').textContent = prontuarioPaciente.endereco || "";
    }
}
function restaurarDadosSintomas() {
    const pacienteData = JSON.parse(localStorage.getItem('pacienteData')) || {};
    if (pacienteData.sintomatologia) {
        pacienteData.sintomatologia.forEach(sintomaData => {
            const checkbox = document.getElementById(sintomaData.sintoma.toLowerCase().replace(/\s+/g, '_'));
            const row = checkbox.parentElement.parentElement;
            const duracaoSelect = row.querySelector('td:nth-child(3) select');
            const gravidadeSelect = row.querySelector('td:nth-child(4) select');

            if (checkbox) {
                checkbox.checked = true;
            }
            if (duracaoSelect) {
                duracaoSelect.value = sintomaData.duracao;
            }
            if (gravidadeSelect) {
                gravidadeSelect.value = sintomaData.gravidade;
            }
        });
    }
}


// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    gerarTabelaSintomas();
    restaurarDadosSintomas()
    loadFormData()

    const diagnosticoButton = document.getElementById('btnGerarDiagnostico');

    if (diagnosticoButton) {
        diagnosticoButton.addEventListener('click', (event) => {
            event.preventDefault();
            coletarDadosSintomas();
            exibirDadosPaciente();
        });
    }
});

