$(function() {
    
    const {ipcRenderer}  = require('electron');   
    
    ipcRenderer.on('recents', function(event, data) {
        console.log('event: ',event);
        console.log('data: ', data); 
        $('#content-1').html(data)   
    });    
    function exitApp() {
        console.log('exitApp called. app will quit now.');
        $('.rectangle-copy-3').toggle();        
        ipcRenderer.send('quit-on-tray-menu-click', function(event) {
            console.log('quit-on-tray-menu-click called from ui')
            event.sender.send('quit-on-tray-menu-click');
        });
    }
    
    function initWebSocket() {
        ws = null;
        ws = new WebSocket('ws://127.0.0.1:8768/');

        ws.onopen = function() {
            console.log('WebSocket opened.');
        };
        ws.onerror = function(error) {
            console.log('WebSocket error:', error);

            setTimeout(function() {
                initWebSocket();
            }, 500);
        };
        ws.onmessage = function(msg) {
            console.log('WebSocket message:', msg, msg.isTrusted);

            if (msg.isTrusted) {
                try {
                    processWebSocketEvent(JSON.parse(msg.data));
                } catch (err) {
                    console.log('Malformed websocket message:', msg.data);
                }
            }
        };
    }
    
    function initApp() {
        console.log('initApp')
        $('.rectangle-copy-3').css('display','none');

        $('.logo-profile').off().on('click', function() {           
            $('.rectangle-copy-3').toggle();
        });

        $('#exit-tcloud').off().on('click', function() {            
            exitApp()            
        });
    }

    initApp();
    initWebSocket();
   
    setTimeout(() => {
        if ((ws || {}).readyState === (ws || {}).CLOSED) {
            initWebSocket();
        }
    }, 5000);
});