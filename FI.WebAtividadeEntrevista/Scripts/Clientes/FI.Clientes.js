
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find("#CPF").val().replace(/[^0-9]/g, ''),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
            }
        });
    })
    
})

function format(document) {
    var mask = "###.###.###-##";
    var documentLength = document.value.length;
    var substring = mask.substring(0, 1);
    var text = mask.substring(documentLength);

    if (text.substring(0, 1) != substring) {
        document.value += text.substring(0, 1)
    }
}

function TestaCPF(document) {
    var Soma;
    var Resto;
    Soma = 0;
    var strCPF = document.value.replace(/[^0-9]/g, '');

    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function helpText(field, input) {
  
    var resultCPFValido = TestaCPF(field);
    var CPFfield = document.getElementById(input);

    if (resultCPFValido) {
        CPFfield.classList.remove("text-danger")
        CPFfield.innerHTML = "";
        return;
    }

    CPFfield.classList.add("text-danger")
    CPFfield.innerHTML = "CPF inválido.";
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function ModalBeneficiario() {
    var random = Math.random().toString().replace('.', '');
    var modal = `
        <div id=${random} class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title"> Beneficiários </h4>
                        </div>
                        <div class="modal-body">
                                <div class="row">
                                     <div class="col-md-4">
                                           <div class="form-group">
                                                <label for="CPF">CPF:</label>
                                                <input required="required" onblur="helpText(this, 'CPFBeneficiarioError')" onkeypress="format(this)" type="text" class="form-control" id="CPFBeneficioario" name="CPF" placeholder="Ex.: 010.011.010-10" maxlength="14">
                                              <div id="CPFBeneficiarioError"> </div>
                                            </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Nome">Nome:</label>
                                            <input required="required" type="text" class="form-control" id="NomeBeneficiario" name="Nome" placeholder="Ex.: João" maxlength="50">
                                        </div>
                                    </div>
                                    <div class="pull-left">
                                      <div class="form-group">
                                        <button type="submit" class="btn btn-sm btn-success">Incluir</button>
                                      </div>
                                     </div>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>

                        </div>
                    </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div> <!-- /.modal -->
    
    `

    $('body').append(modal);
    $('#' + random).modal('show');
}
