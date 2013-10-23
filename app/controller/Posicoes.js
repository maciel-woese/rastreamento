
Ext.define('ShSolutions.controller.Posicoes', {
    extend: 'Ext.app.Controller',

    config: {
        models: [
            'Posicoes',
            'Combo'
        ],
        stores: [
            'Posicoes',
            'ComboClientes'
        ],
        views: [
            'posicoes.List'
        ],

        refs: {
            list: {
                autoCreate: true,
                selector: 'posicoeslist',
                xtype: 'posicoeslist'
            }
        },

        control: {
            'posicoeslist' : {
                itemtap: 'viewAcao'
            },
            'posicoeslist toolbar button[id=button_posicoes_edit]' : {
                tap: 'viewAcao'
            },
            'posicoeslist toolbar selectfield' : {
                change: 'loadPosicoes'
            },
            'picker button[id=btn_done]': {
                tap: 'getActionButton'
            }
        }
    },

    getActionButton: function(button){
        var me = this;
        ShSolutions.app.getController('Principal').checkAjax();

        if(me.getList().getSelectionCount()>0){
            setTimeout(function(){
                var record = me.getList().getSelection()[0];
                var obj = Ext.getCmp('picker_action_posicoes').getValue();
                if(obj.action=='1'){
                    me.viewPositionMap(record);
                }
                else if(obj.action=='2'){
                    me.blockDesbloqVeiculo(record);
                }
                else{
                    console.info(Ext.getCmp('picker_action_posicoes').getValue().action);
                }
            }, 300);
        }
    },

    loadPosicoes: function(combo, value){
        ShSolutions.app.getController('Principal').checkAjax();

        this.getList().getStore().getProxy().config.extraParams.cliente_id = combo.getValue();
        this.getList().getStore().load();
    },

    viewAcao: function(comp, index, target, record){
        Ext.getCmp('picker_action_posicoes').show();
    },

    mask: function(msg){
        if(msg){
            Ext.Viewport.setMasked({
                xtype:'loadmask',
                message: msg
            });
        }
        else{
            Ext.Viewport.setMasked(false);
        }
    },

    showList: function(){
        ShSolutions.app.getController('Principal').checkAjax();
        
        Ext.getCmp('PrincipalContainer').setActiveItem(this.getList());

        Ext.getCmp('ClienteVeiculos').getStore().getProxy().config.extraParams.cliente_id = Ext.device.Storage.getItem('CLI_ID');
        Ext.getCmp('ClienteVeiculos').getStore().load();
    },

    loadGrid: function(button){
        this.getList().getStore().load();
    },
    
    viewPositionMap: function(record){
        var me = this;
        var mapaControl = ShSolutions.app.getController('Mapa');
        var maap = Ext.getCmp('MapaPanel');
        if(!maap){
            maap = Ext.widget('mapaPanel');
        }
        Ext.getCmp('PrincipalContainer').setActiveItem(maap);
        
        ShSolutions.app.getController('Mapa').showMapa(function(map){
            mapaControl.clearMarkers();

            var position = new google.maps.LatLng(record.get('latitude'), record.get('longitude'));
            var infowindow = new google.maps.InfoWindow({
                content: '<div>'+
                         '    <div class="temp_veiculo"><b>Veiculo Desc.:</b> '+record.get('veiculo_desc')+'</div>'+
                         '    <div class="temp_ponto"><b>Ponto Prox.:</b> '+record.get('ponto_prox')+'</div>'+
                         '    <div class="temp_data"><b>Data:</b> '+record.get('data')+'</div>'+
                         '</div>'
            });

            var marker = new google.maps.Marker({
                position: position,
				icon: 'resources/images/carro.gif',
                title : record.get('veiculo_desc'),
                map: map
            });
            
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            
            mapaControl.cache.marker.push(marker);
            setTimeout(function(){
                Ext.getCmp('MapaView').setMapCenter(position);
				Ext.getCmp('back_list').show();
            },300);
        });
    },

    blockDesbloqVeiculo: function(record){
        var me      = this;
        var status  = 0;
        var msg     = "Desbloqueando Veiculo";
        var title   = "desbloquear";
        
        if(record.get('status')=='0'){
            status  = 1;
            msg     = "Bloqueando Veiculo";
            title   = "bloquear";
        }
        
        Ext.Msg.prompt("Informe a Senha...", "Informe a senha para "+title+" o Veiculo?", function(bt, txt){
            if(txt!=""){
                
                me.mask(msg);
                
                Ext.util.JSONP.request({
                    url: urlPrincipal+'server/modulos/posicoes/save.php',
                    callbackKey: 'callback',
                    scope: this,
                    params:{
                        action: 'STATUS_VEICULO',
                        status: status,
                        senha: txt,
                        usuario_id: Ext.device.Storage.getItem('USR_ID'),
                        platform: device.platform,
                        veiculo_id: record.get('veiculo_id')
                    },
                    success: function(o){
                        me.mask(false);
                        //var o = Ext.decode(o.responseText);
                        if(o.success==true){
                            me.loadGrid();
                        }
                        else{
                            console.info(o.msg);
                            Ext.Msg.alert('Aviso!', o.msg);
                        }
                    },
                    failure: function(){
                        me.mask(false);
                        Ext.Msg.alert('Aviso!', "Erro no Servidor!");
                    }
                });
            }
        });
    }
});