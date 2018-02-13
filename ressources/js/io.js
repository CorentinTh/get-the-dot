const URL = 'http://busdata.metropolia.fi';
const APP_ID = 'CorentinsApp_34bg8$^-s';

const pb2 = new PB2(URL, APP_ID);

function onMessage(data) {

    if (data.json.topic) {

        switch (data.json.topic) {
            case 'new-player':
                addNewPlayer(data.socketid, data.json.payload.position, data.json.payload.pseudo);
                break;
            case 'update-position':
                updatePosition(data.socketid, data.json.payload.position, data.json.payload.pseudo);
                break;
            case 'target-touched':
                onTargetTouched(data.socketid, data.json.payload.position, data.json.payload.score);
                break;
            case 'disconnect':
                removeUser(data.socketid);
                break;
            case 'test':
                console.log('test acheive', data);
                break;
        }

    }
}

// Connection handler
function onConnection(data) {
    console.log('connection');
}

// Disconnection handler
function onDisconnection(data) {
    removeUser(data.socketid);
    console.log('disconnected');
}

// Initialisation of the handlers
function initPB2Listenners() {
    pb2.setReceiver(onMessage);
    pb2.setConnectionHandler(onConnection);
    pb2.setDisconnectionHandler(onDisconnection);
}

// Sending function
function ioSend(topic, payload) {
    pb2.sendJson({
        topic: topic,
        payload: payload
    })
}

$(document).ready(function () {
    setTimeout(function () {
        initPB2Listenners();
    }, 2000)
});

window.onbeforeunload = function () {
    ioSend('disconnect', {id: pb2.sessionid});
};
