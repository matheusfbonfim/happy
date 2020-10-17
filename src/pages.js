/* Será utilizado o module exports para disponibilizar o uso da funções
   ou elementos aqui criados */

/* Module exports irá exportar o objeto */
module.exports = {

    // console.log(request.query) // Retorna todos os dados da requisiçao(url) depois da ?
    // return response.send("Oi") // Com send enviamos a resposta 
    // __dirname retorna o diretorio atual 
    // Path contribui para fazer a roda de maneira dinamica, independ. do SO
    //return response.sendFile(path.join(__dirname,'views','index.html')) // Envia um arquivo como resposta
    

    /* Função usada dentro do get como resposta para requisição */
    index(req,res){
        const city = req.query.city
        // A resposta(response) vai renderizar a pagina usando o index (Uso da template engine)
        return res.render('index', {city})
    },

    orphanage(req,res){
        // Tem como resposta a pagina orphanage renderizada
        return res.render('orphanage')
    },

    orphanages(req,res){
        // Tem como resposta a pagina orphanages renderizada    
        return res.render('orphanages')
    },

    createOrphanage(req,res){
        // Tem como resposta a pagina create-orphanage renderizada
        return res.render('create-orphanages')
    }


}