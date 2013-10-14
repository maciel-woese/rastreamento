Ext.define('ShSolutions.controller.Principal', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.device.Storage', 'ShSolutions.components.MenuButton'],

    config: {
        refs: {
            main: 'principal'
        },

        views: [
            'Principal'
        ],

        control: {
        	'principal > toolbar > button[action=menu]': {
                tap: function() {
                    if (Ext.device.Storage.getItem('isLogged') !== "true") {
                       return true;
                    }
                    Ext.Viewport.toggleMenu("left");
                }
            },

            'menu[id=menu_sistema] > button': {
                tap: function(btn) {
                    if (Ext.device.Storage.getItem('isLogged') !== "true") {
                        return true;
                    }
                    
                    var newActiveItem = Ext.ComponentQuery.query(btn.getMenu()),
                        main = this.getMain();

                    newActiveItem = newActiveItem.length > 0 ? newActiveItem[0] : null;
                    if(newActiveItem) {
                        main.setActiveItem(newActiveItem);
                        Ext.Viewport.hideAllMenus();

                        Ext.Viewport.getTranslatable().on('animationend', function() {
                            if(btn.getMenu()=='posicoeslist'){
                                Ext.getCmp('ClienteVeiculos').getStore().getProxy().config.extraParams.cliente_id = window.usuario_info.CLI_ID;
                                Ext.getCmp('ClienteVeiculos').getStore().load();
                            }
                            else if(btn.getMenu()=='login'){
                                Ext.device.Storage.setItem('isLogged', false);
                            }
                        }, this, {single:true});
                    }
                }
            }
        }
    },
    
    checkAjax: function(){
        /*if(checkConnection()==0){
            showAlert();
        }*/
    }
});