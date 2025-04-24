import {diagnostico} from './database/database-memory.js'

let botaoCalcularIMC = document.querySelector('button#calcularIMC')
let sexo = document.getElementsByName('escolha')

function diagnosticoIMC(){
    //Para se pegar números de inputs, a seleção do input deve estar dentro do escopo da função
    let campoAltura = document.querySelector('#alturaCampo')
    let campoPeso = document.querySelector('#pesoCampo')
    let altura = Number(campoAltura.value)
    let peso = Number(campoPeso.value)
    let imc = (peso/(altura**2)).toFixed(2)

    //Verifica o input de sexo
    let sexoSelecionado = sexo[0].checked ? 'masculino' : sexo[1].checked ? 'feminino' : null;

    let tipoDiagnostico = document.querySelector('p#tipo')

    //Criação da imagem por js que vai aparecer na tela
    let imgCaso = document.createElement('img')
    imgCaso.setAttribute('id','imgResult')
    imgCaso.style.borderRadius = '10px'
    imgCaso.style.width = '300px'

    let prevencao = document.createElement('p')
    prevencao.setAttribute('id','prevencaoCaso')

    let caso = null

    let localImg = document.querySelector('div#local-img')
    let localPrev = document.querySelector('div#local-prevencao')

    //Tratamento de erro se os campos estiverem vazios

    if(campoAltura.value.length == 0 || campoPeso.value.length == 0){
        window.alert(`[ERRO]Um ou dois campos incorretos`)
    } else {
        if(imc < 18.5){
            caso = `Abaixo do peso normal`

        } else if(imc >= 18.5 && imc < 25){
            caso = `Peso ideal`

        } else if(imc >= 25 && imc < 30){
            caso = `Acima do peso ideal`

        } else if(imc >= 30){
            caso = `Obesidade`
        }

        const resultadoDiagnostico = diagnostico.find(item =>
            item.caso === caso && item.sexo === sexoSelecionado
        );

        if(resultadoDiagnostico){
            imgCaso.src = resultadoDiagnostico.img;
            prevencao.textContent = resultadoDiagnostico.prevencao || '';

            // Limpa o conteúdo anterior das divs
            localImg.innerHTML = '';
            localPrev.innerHTML = '';

            // Adiciona a imagem à div 'local-img'
            localImg.appendChild(imgCaso);

            // Adiciona o parágrafo de prevenção à div 'local-prevencao'
            localPrev.appendChild(prevencao);

            // Opcional: Exibir o tipo de diagnóstico
            tipoDiagnostico.textContent = `Diagnóstico: ${resultadoDiagnostico.caso}`;

        } else {
            // Caso algo dê errado na busca
            console.error("Erro: Diagnóstico não encontrado.");
            // Limpar os locais em caso de erro
            localImg.innerHTML = '';
            localPrev.innerHTML = '';
            tipoDiagnostico.textContent = '';
        }
    }
}

botaoCalcularIMC.addEventListener('click', diagnosticoIMC)