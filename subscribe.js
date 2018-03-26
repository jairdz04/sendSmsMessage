const soap = require("soap");
const { MESSAGE_URL, SERVICE_KEY, SERVICE_PASSWORD, SENDER, RECIEPT_REQUEST, DATA_CODING }  = process.env;

exports.send = (req,res) =>{
    try {

        const { subscriber, message, requestId } = req.body;
        soap.createClient(MESSAGE_URL, (err, client) =>{
            if(err) throw new Error(err);

            const data = {
                subscriber: subscriber,
                sender: SENDER,
                message: message,
                requestId: requestId,
                receiptRequest: RECIEPT_REQUEST,
                dataCoding: DATA_CODING
            };

            client.setEndpoint(MESSAGE_URL);
            client.setSecurity(new soap.BasicAuthSecurity( SERVICE_KEY, SERVICE_PASSWORD));
            client.sendMessage(data, (err, result) =>{
                if(err) return res.status(400).json({exito: false, informacion: err});
                if(result.resultCode != "0") return res.status(200).json({exito: false , informacion: data});
                return res.status(200).json({exito: true , informacion: result});
            });
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "contacta con el administrador del sistema"})
    }
}