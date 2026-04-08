$(document).ready(function() {

    // Função para traduzir texto
    function traduzirTexto(texto) {
        return $.ajax({
            url: 'https://api.mymemory.translated.net/get',
            method: 'GET',
            data: {
                q: texto,
                langpair: 'en|pt'
            }
        });
    }

    function obterPiada() {
        const url = 'https://official-joke-api.appspot.com/random_joke';

        $('#btn-piada').text('Carregando...').prop('disabled', true);

        $.ajax({
            url: url,
            method: 'GET',

            success: async function(resposta) {
                try {
                    // Traduz setup e punchline
                    const traducaoSetup = await traduzirTexto(resposta.setup);
                    const traducaoPunchline = await traduzirTexto(resposta.punchline);

                    const setupPT = traducaoSetup.responseData.translatedText;
                    const punchlinePT = traducaoPunchline.responseData.translatedText;

                    $('#setup')
                        .hide()
                        .text(setupPT)
                        .fadeIn();

                    $('#punchline')
                        .hide()
                        .text(punchlinePT)
                        .fadeIn();

                    $('#data-atualizacao').text(
                        'Traduzido às: ' + new Date().toLocaleTimeString()
                    );

                } catch (erro) {
                    alert('Erro ao traduzir a piada');
                }
            },

            error: function() {
                alert('Erro ao buscar piada');
            },

            complete: function() {
                $('#btn-piada')
                    .text('NOVA PIADA')
                    .prop('disabled', false);
            }
        });
    }

    $('#btn-piada').click(function() {
        obterPiada();
    });

    obterPiada();
});