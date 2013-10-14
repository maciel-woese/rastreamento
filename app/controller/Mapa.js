

Ext.define('ShSolutions.controller.Mapa', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'posicoes.Mapa'
        ],

        refs: {
        	mapaPanel: {
                autoCreate: true,
                selector: 'posicoesmapa',
                xtype: 'posicoesmapa'
            }
        },
		
		control: {
			'#MapaView' : {
				maprender: function(comp, map) {
					this.enable = true;
					this.Map = map;
                    this.infowindow = new google.maps.InfoWindow({
                        content: ''
                    });
				}
			},
            '#btn_search': {
                tap: function(button){
                    var me = this;
                    var posicoes = ShSolutions.app.getController('Posicoes');
                    ShSolutions.app.getController('Principal').checkAjax();
                    
                    if(posicoes.getList().getSelectionCount()>0){
                        setTimeout(function(){
                            var record = posicoes.getList().getSelection()[0];
                            me.mask('Carregando Rota');
                            me.posicoes(record, Ext.Date.format(Ext.getCmp('posicoes_periodo').getValue(), 'Y-m-d'));
                        }, 300);
                    }
                }
            }
		}
    },

    enable: false,
    infowindow: false,
    
    cache: {
    	marker: [],
    	poligon: [],
    	polyline: []
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

    createMarker: function(point, pVeiculo,pData, pPonto, pDistancia, pLat, pLng, pDist_Between_Positions, pDirecao, pVel, pTen, pIgnicao,pGif,pFlag,pSeguencia, pIcoDir) {          
      var me = this;
      if(pVel > 10){
        var icon = 'false';        
      }
      else{
        var icon = pIcoDir;
      }
      var marker = new google.maps.Marker({
            position: point,
            icon: icon,
            map: me.Map
        });
      var html = "";
      
      if(pFlag == 0){ 
          html = "<b>Sequência: </b>"+ pSeguencia + "<br>"+"<b>Desc.Veiculo: </b>"+ pVeiculo + "<br>"+"<b>Data: </b>"+ pData +"<br>"+"<b>Ponto mais proximo: </b>"+ pPonto +"<br>" + "<b>Distancia até o Ponto: </b>"+ pDistancia +"<br>" +"<b>Latitude: </b>"+ pLat +"<br>" +"<b>Longitude: </b>"+ pLng +"<br>" +"<b>Distancia Entre Posições: </b>"+ pDist_Between_Positions +"<br>" +"<b>Direção: </b>"+ pDirecao +"<br>" +"<b>Velocidade: </b>"+ pVel +"<br>" +"<b>Tensão: </b>"+ pTen +"<br>"+"<b>Ignição: </b>"+ pIgnicao;
      }
      else {
        html = pPonto;
       }
        me.cache.marker.push(marker);
        google.maps.event.addListener(marker, "click", function() {
          me.infowindow.setContent(html); 
          me.infowindow.open(me.Map, marker);
          me.Map.setCenter(new google.maps.LatLng(point.lat(),point.lng()),17);

        });
      i++;
      
      return marker;
    },

    posicoes: function(record, data){
        var me = this;
        me.clearMarkers();
        me.clearPolyline();
        
        Ext.util.JSONP.request({
            params: {
                action: 'LIST',
                platform: device.platform,
                veiculo_id: record.get('veiculo_id'),
                data: data
            },
            timeout: 60000,
            url: urlPrincipal+'server/modulos/mapa/list.php',
            callbackKey: 'callback',
            scope: this,
            success: function(o) {
                me.mask(false);
                if(o.success==undefined){
                    var jsonData = o.dados;
                    for (var i=0; i<jsonData.markers.length; i++) {
                        if(i==0){ 
                            me.Map.setCenter(new google.maps.LatLng(jsonData.markers[0].pLat, jsonData.markers[0].pLng),14); 
                            me.Map.setZoom(14);
                            
                        }   
                        var point = new google.maps.LatLng(jsonData.markers[i].pLat, jsonData.markers[i].pLng);
                        var marker = me.createMarker(point, jsonData.markers[i].pVeiculo, jsonData.markers[i].pData, jsonData.markers[i].pPonto, jsonData.markers[i].pDistancia, jsonData.markers[i].pLat, jsonData.markers[i].pLng, jsonData.markers[i].pDist_Between_Positions, jsonData.markers[i].pDirecao, jsonData.markers[i].pVel, jsonData.markers[i].pTen, jsonData.markers[i].pIgnicao,jsonData.markers[i].pGif,jsonData.markers[i].pFlag, jsonData.markers[i].pSeguencia, jsonData.markers[i].pIcoDir);
                    }
                    if(jsonData.lines != null){
                      for (var i=0; i<jsonData.lines.length; i++) {
                        var ptsGPolyline = [];
                        for (var j=0; j<jsonData.lines[i].points1.length; j++) {
                      
                            var point = new google.maps.LatLng(jsonData.lines[i].points1[j].pLat, jsonData.lines[i].points1[j].pLng);
                            var marker = me.createMarker(point, jsonData.lines[i].points1[j].pVeiculo, jsonData.lines[i].points1[j].pData, jsonData.lines[i].points1[j].pPonto, jsonData.lines[i].points1[j].pDistancia, jsonData.lines[i].points1[j].pLat, jsonData.lines[i].points1[j].pLng, jsonData.lines[i].points1[j].pDist_Between_Positions, jsonData.lines[i].points1[j].pDirecao, jsonData.lines[i].points1[j].pVel, jsonData.lines[i].points1[j].pTen, jsonData.lines[i].points1[j].pIgnicao,jsonData.lines[i].points1[j].pGif,jsonData.lines[i].points1[j].pFlag, jsonData.lines[i].points1[j].pSeguencia, jsonData.lines[i].points1[j].pIcoDir);
                            
                            ptsGPolyline[j] = new google.maps.LatLng(jsonData.lines[i].points1[j].pLat, jsonData.lines[i].points1[j].pLng);
                            
                            if(j==jsonData.lines[i].points1.length-1){
                                if(jsonData.lines[i].points1[j].pIgnicao=='SIM') var icon = 'resources/images/carro.gif';
                                else var icon = 'resources/images/carro_off.gif';
                                var marker = new google.maps.Marker({
                                    position: ptsGPolyline[j],
                                    icon: icon,
                                    map: me.Map
                                });
                                me.cache.marker.push(marker);
                                me.Map.setCenter(ptsGPolyline[j]);
                            }
                        }

                        var line = new google.maps.Polyline({
                          path: ptsGPolyline,
                          strokeColor: jsonData.lines[i].colour,
                          strokeOpacity: 1.0,
                          //strokeWeight: jsonData.lines[i].width
                          strokeWeight: 3
                        });
                        me.cache.polyline.push(line);

                        //var polyline = new GPolyline(ptsGPolyline, jsonData.lines[i].colour, jsonData.lines[i].width);
                        
                        line.setMap(me.Map);
                        ptsGPolyline.pop();
                        //midArrows(polyline);
                      }
                  }
                }
                else{
                    if(o.msg){
                        if(o.msg.length>0){
                            Ext.Msg.alert('Erro!', o.msg);
                            return true;
                        }
                    }
                    Ext.Msg.alert('Erro!', "Erro ao Processar Rota!");
                }
            },

            failure: function(response) {
                me.mask(false);
                if(response=='timeout'){
                    Ext.Msg.alert('Erro!', "Erro ao Processar Rota!");
                }
                else{
                    Ext.Msg.alert('Erro!', response);                    
                }
            }
        });
    },

    clearMarkers: function(){
    	var me = this;
    	for(i in me.cache.marker){
    		me.cache.marker[i].setMap(null);
    	}
    	me.cache.marker = [];
    },

    clearPolyline: function(){
        var me = this;
        for(i in me.cache.polyline){
            me.cache.polyline[i].setMap(null);
        }
        me.cache.polyline = [];
    },
    
    showMapa: function(call){
    	var me = this;
    	if(this.enable==true){
    		call(this.Map);
    	}
    	else{
    		var z = setInterval(function(){
    			if(me.enable==true){
    				call(me.Map);
        			clearInterval(z);
    			}
    		}, 1000);
    	}
    }
});