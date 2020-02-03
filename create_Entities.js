

'use strict';

const dialogflow = require('dialogflow');

const credentials = require('./credentials.json');

const entitiesClient = new dialogflow.EntityTypesClient({

    credentials: credentials,
});

const projectId = 'bbot-ceo-nvklwh';

const agentPath = entitiesClient.projectAgentPath(projectId);

/////------Entidad Tipo Tarjeta de Credito-----
const TarjetaEntityType = {
    displayName: 'Tarjeta',
    kind: 'KIND_MAP',
    entities: [
        {value: 'Tarjeta', synonyms: ['Tarjeta', 'Tarjeta de credito', 'Credito']}
    ],
};


const TarjetaRequest = {

    parent: agentPath,
    entityType: TarjetaEntityType,
};


entitiesClient.create
    .createEntityType(TarjetaRequest)
    .then((responses) =>{
        console.log('Se creó un nuevo tipo de entidad:', JSON.stringify(responses[0]));
        const ClasicaEntityType = {
            displayName: 'Clasica',
            kind: 'KIND_MAP',
            entities: [

                {value: 'Clasica', synonyms: ['Clasica', 'Tradicional']},
            ],
        };

        const ClasicaRequest = {
            parent: agentPath,
            entityType: ClasicaEntityType,
        };


        return entitiesClient.createEntityType(ClasicaRequest);
    })
    .createEntityType()

    .then((responses) => {
        console.log('Se creó un nuevo tipo de entidad:', JSON.stringify(responses[0]));
    })
    // Log any errors.
    .catch((err) => {
        console.error('Error creando la nueva entidad', err);
    });

