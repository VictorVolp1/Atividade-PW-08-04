$(document).ready(function() {
    // Máscaras para facilitar a digitação
    $('#telefone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');

    // Método customizado para CPF (Simplificado para o exemplo)
    $.validator.addMethod("cpfBR", function(value, element) {
        value = value.replace(/([.!-\/])/g, "");
        if (value.length !== 11) return false;
        // Adicione aqui a lógica real de cálculo de dígitos se necessário
        return true; 
    }, "Informe um CPF válido.");

    $("#formCurriculo").validate({
        rules: {
            nome: { 
                required: true,
                minlength: 5
                 },
            email: { 
                required:true,
                email: true 
                },
            idade: {
                required: true,
                min: 18, max: 65
                },
            telefone: { 
                required: true,
                minlength: 14
                 },
            cpf: {
                required: true,
                cpfBR: true },
            area: { 
                required: true
             },
            experiencia: {
                required: true,
                minlength: 20 },
            senha: {
                required: true,
                minlength: 6 
            },
            confirmar_senha: {required: true,
                equalTo: "#senha" 
            }
        },
        messages: {
            nome: {
                required: "Por favor, insira seu nome.",
                minlength: "O nome deve ter pelo menos 5 caracteres."
            },
            email: "Insira um e-mail válido.",
            idade: {
                required: "Campo obrigatório.",
                min: "Você deve ter pelo menos 18 anos.",
                max: "A idade máxima é 65 anos."
            },
            experiencia: {
                minlength: "Descreva sua experiência com no mínimo 20 caracteres."
            },
            confirmar_senha: {
                equalTo: "As senhas não coincidem."
            }
        },
        submitHandler: function(form) {
            alert("Currículo enviado com sucesso!");
            form.submit();
        }
    });
});