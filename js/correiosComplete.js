
formsCorreio = {
    // set return inputs ID
    forms: {    
        cep: 'cep',
        logradouro: 'rua',
        numero: 'numero',
        complemento: 'complemento',
        bairro: 'bairro',
        localidade: 'cidade',
        uf: 'estado'
    },

    getCep: function(){
        var inputCep = document.getElementById(this.forms.cep);
        inputCep.addEventListener("input", function(){
            if (this.value.length == 8) {
                formsCorreio.getData(this.value);
                document.querySelector(".spinner").classList.remove("d-none");
            }
        });
    },

    getData: function(value){
        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then(response => {
            if (response.status != 200) {
                console.log("Error 200");
                throw Error(response.status);
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            let forms = this.forms;
            document.querySelector(".spinner").classList.add("d-none");
            document.getElementById(forms['logradouro']).value = data.logradouro;
            document.getElementById(forms['complemento']).value = data.complemento;
            document.getElementById(forms['bairro']).value = data.bairro;
            document.getElementById(forms['localidade']).value = data.localidade;
            document.getElementById(forms['uf']).value = data.uf;  
        })
    }
}

// constructor
formsCorreio.getCep();

