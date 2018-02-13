/**
 * Created by Corentin THOMASSET on 13/02/2018.
 */

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$('#formSetPseudo').submit(function onPseudoFormSubmit(e) {
    e.preventDefault();

    let pseudo = htmlEntities($('#pseudo-input').val());

    if (pseudo && pseudo != '' && pseudo.length > 1) {
        currentPlayer.setPseudo(pseudo);

        $("#blur-canvas").hide();
        canPlay();

        ioSend('new-player', {
            position: currentPlayer.getPosition(),
            pseudo: pseudo
        });
    } else {
        $("#pseudo-form-error").show();
    }

    return false;
});