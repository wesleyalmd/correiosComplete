
correios = {
    // set return inputs css selector
    forms: {    
        cep:         '.input-cep',
        logradouro:  '.input-rua',
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
        let inputCep = document.querySelector(this.forms['cep']);
        inputCep.addEventListener("input", function(){
            if (this.value.length == 8) {
                correios.getData(this.value);
            }
        });
    },

    getData: function(value){
        let spinner = document.querySelector(".spinner");
        let forms = this.forms;
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
            spinner.classList.add("d-none");
            Object.keys(forms).forEach(key => {
                document.querySelector(forms[key]).value = data[key];
            });
        })
    }
}

correios.autocomplete();
