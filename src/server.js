if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const GNRequest = require('./apis/gerencianet')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

const reqGNAlready = GNRequest()

app.get('/', async (req, res) =>{

    const reqGN = await reqGNAlready
    const dataCob = {
        "calendario": {
            "expiracao": 3600
        },
        "valor": {
            "original": "10.00"
        },
        "chave": "1aeb48dd-0e90-4e52-bd68-26fa5bf965c0",
        "solicitacaoPagador": "Rifa online"
    }
        
    const cobResponse = await reqGN.post('/v2/cob',dataCob)
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)
    
    res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode })
})

app.listen(8000, ()=>{
    console.log('Rodando servidor')
})