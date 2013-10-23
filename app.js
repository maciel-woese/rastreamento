
//@require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({

    controllers: [
        'Principal',
        'Login',
        'Posicoes',
        'Mapa'
    ],
    name: 'ShSolutions',

    launch: function() {
        Ext.fly('appLoadingIndicator').destroy();
        Ext.create('ShSolutions.view.Principal', {fullscreen: true});

        var menu = Ext.create("Ext.Menu", {
            defaults: {
                xtype: "menubutton"
            },
            id: 'menu_sistema',
            width: '80%',
            scrollable: 'vertical',
            items: [
                {
                    text: 'Veículos',
                    iconCls: 'locate',
                    menu:"posicoeslist"
                },
                {
                    text: 'Sair',
                    iconCls: 'action',
                    menu:"login"
                }
            ]
        });
        
        Ext.Viewport.setMenu(menu, {
            side: 'left',
            reveal: true
        });
		
		Ext.Viewport.add({
			xtype: 'picker',
			hidden: true,
			id: 'picker_action_posicoes',
			doneButton: {
				xtype: 'button',
				id: 'btn_done',
				text: 'Enviar'
			},
			cancelButton: 'Cancelar',
			slots: [
				{
					xtype: 'pickerslot',
					name: 'action',
					title: 'Ação',
					data: [
						{
							text: 'Visualizar no Mapa',
							value: 1
						},
						{
							text: 'Bloquear Carro',
							value: 2
						}
					]
				}
			]
		});

	}

});
