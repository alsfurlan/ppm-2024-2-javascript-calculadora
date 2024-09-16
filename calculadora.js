var numero1Input = document.getElementById('numero1Input');
var numero2Input = document.getElementById('numero2Input');
var operacaoSelect = document.getElementById('operacaoSelect');
// Atenção, deem preferência pelo uso de IDs e getElementById
var section = document.getElementsByTagName('section')[0];

console.log(numero1Input);
console.log(numero2Input);
console.log(operacaoSelect);

function calcular() {
    var numero1 = numero1Input.value;
    var numero2 = numero2Input.value;
    console.log(numero1, typeof numero1);
    console.log(numero2, typeof numero2);
    numero1 = parseFloat(numero1);
    numero2 = parseFloat(numero2);
    console.log(numero1, typeof numero1);
    console.log(numero2, typeof numero2);

    if (isNaN(numero1) || isNaN(numero2)) {
        alert('Entrada inválida! Por favor informe números.')
        return;
    }

    var operacao = operacaoSelect.value;
    console.log(operacao, typeof operacao);

    var resultado;
    switch (operacao) {
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '*':
            resultado = numero1 * numero2;
            break;
        case '/':
            resultado = numero1 / numero2;
            break;
    }

    resultado = + resultado.toFixed(2);
    resultado = new Intl.NumberFormat('pt-BR').format(resultado);
    // new Intl.DateTimeFormat('pt-BR');

    // alert('Resultado: ' + resultado);
    var paragrafoResultado = document.getElementById('resultado');
    var textoParagrafo = document.createTextNode('Resultado: ' + resultado);
    if (!paragrafoResultado) { // resultado === null || resultado === undefined
        paragrafoResultado = document.createElement('p');
        paragrafoResultado.setAttribute('id', 'resultado');
        paragrafoResultado.appendChild(textoParagrafo);
        section.appendChild(paragrafoResultado);
    } else {
        if (paragrafoResultado.firstChild) {
            paragrafoResultado.removeChild(paragrafoResultado.firstChild);
        }
        paragrafoResultado.appendChild(textoParagrafo);
    }
}

function limpar() {
    numero1Input.value = '';
    numero2Input.value = '';
    operacaoSelect.value = '+';
    limparResultado();
}

function limparResultado() {
    var paragrafoResultado = document.getElementById('resultado');
    if (paragrafoResultado) {
        // paragrafoResultado.remove()
        // section.removeChild(paragrafoResultado);
        if (paragrafoResultado.firstChild) {
            paragrafoResultado.removeChild(paragrafoResultado.firstChild);
        }
    }
}

function validarCampo(input) {
    var valor = +input.value;
    var numeroInvalido = isNaN(valor);

    var div = input.parentElement;
    var p = div.querySelector('p.valor-invalido');

    if (numeroInvalido && !p) {
        p = document.createElement('p');
        var text = document.createTextNode('Valor inválido!');
        p.appendChild(text);
        p.classList.add('valor-invalido');
        div.appendChild(p);
        div.classList.add('campo-invalido');
    } else if (!numeroInvalido && p) {
        p.remove();
        div.classList.remove('campo-invalido');
    }

}

document.getElementById('limparButton').addEventListener(
    'click', limpar
)

numero2Input.addEventListener('keyup', function(evento) {
    validarCampo(evento.target);
})

numero1Input.addEventListener('change', limparResultado);
numero2Input.addEventListener('change', limparResultado);
operacaoSelect.addEventListener('change', limparResultado);

// numero2Input.addEventListener('change', function(evento) {
//     console.log('change: ', evento);
// });

// numero2Input.addEventListener('blur', function(evento) {
//     validarCampo(evento.target);
// });


// numero1Input.addEventListener('focusout', function() {
//     console.log('focusout');
// })