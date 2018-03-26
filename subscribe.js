const soap = require("soap");
const { MESSAGE_URL, SERVICE_KEY, SERVICE_PASSWORD }  = process.env;

exports.send = (req,res) =>{
    try {

        const { subscriber, sender, message, requestId, dataCoding,receiptRequest } = req.body;
        soap.createClient(MESSAGE_URL, (err, client) =>{
            if(err) throw new Error(err);

            const data = {
                subscriber: subscriber,
                sender: sender,
                message: message,
                requestId: requestId,
                receiptRequest: receiptRequest,
                dataCoding: dataCoding
            };

            client.setEndpoint(MESSAGE_URL);
            client.setSecurity(new soap.BasicAuthSecurity( SERVICE_KEY, SERVICE_PAS|SWORD));
            client.sendMessage(data, (err, result) =>{
                if(err) return res.status(400).json(err);
                return res.status(200).json({exito: "mensaje enviado correctamente", informacion: result});
            });
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "contacta con el administrador del sistema"})
    }
}