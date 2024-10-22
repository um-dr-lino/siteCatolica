 // Função para abrir o pop-up
 function openPopup() {
    document.getElementById("popup").style.display = "flex"; // Exibe a div como flexbox
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById("popup").style.display = "none"; // Oculta a div
}

// Abre o pop-up quando a página carregar
window.onload = openPopup;


//Configuração de cpf
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cpf').addEventListener('input', function(e) {
        var value = e.target.value;
        var cpfPattern = value.replace(/\D/g, '')
                              .replace(/(\d{3})(\d)/, '$1.$2')
                              .replace(/(\d{3})(\d)/, '$1.$2')
                              .replace(/(\d{3})(\d)/, '$1-$2')
                              .replace(/(-\d{2})\d+?$/, '$1');
        e.target.value = cpfPattern;
    });
});

//Configuração de CEP

console.log("Arquivo JS carregado corretamente!");

document.getElementById('cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    // Verifica se o CEP tem 8 dígitos
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.estado || '';
                    // document.getElementById('uf').value = data.uf || '';
                } else {
                    alert('CEP não encontrado.');
                    limparCampos();
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Não foi possível buscar o CEP. Tente novamente.');
                limparCampos();
            });
    } else {
        alert('CEP inválido. Por favor, digite um CEP com 8 dígitos.');
        limparCampos();
    }
});

function limparCampos() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    // document.getElementById('uf').value = '';
}

//Formatar numero de celular

document.getElementById('tel').addEventListener('input', function(e) {
    let tel = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (tel.length <= 10) {
        // Formato para números de telefone fixo ou tel sem dígito extra
        tel = tel.replace(/(\d{2})(\d)/, '($1) $2');
        tel = tel.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        // Formato para números de tel com o dígito extra (11 dígitos)
        tel = tel.replace(/(\d{2})(\d)/, '($1) $2');
        tel = tel.replace(/(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = tel;
});

document.getElementById('cancel').addEventListener('click',function(){
    document.getElementById('form1').reset();
});

//Funçao do de responsividade do texto

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // Fecha a caixa suspensa se estiver aberta
    } else {
        dropdown.style.display = "block"; // Abre a caixa suspensa
    }
}

// function toggleSublist(sublistId) {
//     var sublist = document.getElementById(sublistId);
//     if (sublist.style.display === "none") {
//         sublist.style.display = "block";
//     } else {
//         sublist.style.display = "none";
//     }
// }
function toggleSublist(sublistId, event) {
    var sublist = document.getElementById(sublistId);
    if (sublist.style.display === "none" || sublist.style.display === "") {
        sublist.style.display = "block";  // Exibe a sublista
    } else {
        sublist.style.display = "none";  // Oculta a sublista
    }
    
    // Evita que o clique no item pai também feche a lista quando expandir o filho
    if (event) {
        event.stopPropagation();
    }
}

