
correios = {
    // set return inputs css selector
    forms: {    
        cep:         '.input-cep',
        logradouro:  '.input-rua',
        numero:      '.input-numero',
        complemento: '.input-complemento',
        bairro:      '.input-bairro',
        localidade:  '.input-cidade',
        uf:          '.input-estado'
    },

    // constructor
    autocomplete: function(){
        this.getCep();
    },

    getCep: function(){
        var inputCep = document.querySelector(this.forms['cep']);
        inputCep.addEventListener("input", function(){
            if (this.value.length == 8) {
                correios.getData(this.value);
            }
        });
    },

    getData: function(value){
        let spinner = document.querySelector(".spinner");
        spinner.classList.remove("d-none");

        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then(response => {
            if (response.status != 200) {
                throw Error(response.status);
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            let forms = this.forms;
            document.querySelector(".spinner").classList.add("d-none");
            document.querySelector(forms['logradouro']).value = data.logradouro;
            document.querySelector(forms['complemento']).value = data.complemento;
            document.querySelector(forms['bairro']).value = data.bairro;
            document.querySelector(forms['localidade']).value = data.localidade;
            document.querySelector(forms['uf']).value = data.uf;  
        })
    }
}

correios.autocomplete();
