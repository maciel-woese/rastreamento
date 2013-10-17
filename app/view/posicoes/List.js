Ext.define('ShSolutions.view.posicoes.List', {
    extend: 'Ext.dataview.List',
    alias: 'widget.posicoeslist',

    config: {
        id: 'ListPosicoes',
        store: 'Posicoes',
        onItemDisclosure: true,
        itemTpl: [
            '<div>',
            '   <div class="temp_veiculo"><b>Veiculo Desc.:</b> {veiculo_desc}</div>',
            '   <div class="temp_data"><b>Ponto Prox.:</b> {ponto_prox}</div>',
            '   <div class="temp_data"><b>Data:</b> {data}</div>',
            '   <div class="temp_data" style="vertical-align:middle"><b>Status:</b> {img_bloq}</div>',
            '   <div class="temp_data" style="vertical-align:middle"><b>Panico:</b> {img_panico}</div>',
            '   <div class="temp_data"><b>Velocidade:</b> {velocidade} Km/h</div>',
            '   <div class="temp_data"><b>Falha Alim. Ext.:</b> {falha_alim_ext}</div>',
            '   <div class="temp_data"><b>GPS:</b> {gps}</div>',
            '   <div class="temp_data"><b>GPRS:</b> {gprs}</div>',
            '</div>'
        ],
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'button_posicoes_edit',
                        ui: 'confirm',
                        iconCls: 'compose'
                    },
                    {
                        xtype: 'selectfield',
                        id: 'ClienteVeiculos',
                        store: 'ComboClientes',
                        label: 'Clientes',
                        labelWrap: true,
                        name: 'cliente',
                        autoComplete: true,
                        defaultPhonePickerConfig: {
                            doneButton: 'Ok',
                            cancelButton: 'Cancelar'
                        },
                        displayField: 'descricao',
                        valueField: 'id'
                    }
                ]
            },
            {
                xtype: 'picker',
                hidden: true,
                id: 'picker_action_posicoes',
                doneButton: {
                    xtype: 'button',
                    id: 'btn_done',
                    text: 'Ok'
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
            }
        ],
        plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true,
                noMoreRecordsText: 'Sem mais registros',
                loadMoreText: 'Carregar mais...'
            }
        ]
        /*,
        plugins: [
            {
                lastUpdatedText: 'Última Atualização:',
                loadedText: 'Carregado',
                loadingText: 'Carregando...',
                pullRefreshText: 'Puxe para baixo para atualizar...',
				pullText: 'Puxe para baixo para atualizar...',
				releaseText: 'Solte a atualização...',
                releaseRefreshText: 'Solte a atualização...',
                type: 'pullrefresh'
            }
        ]*/
    }

});