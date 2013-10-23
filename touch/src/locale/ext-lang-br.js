Date.dayNames = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
];

Date.monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junio',
    'Julio',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

Date.monthNumbers = {
    'Jan': 0,
    'Fev': 1,
    'Mar': 2,
    'Abr': 3,
    'Mai': 4,
    'Jun': 5,
    'Jul': 6,
    'Ago': 7,
    'Set': 8,
    'Out': 9,
    'Nov': 10,
    'Dez': 11
};

Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};

Date.getShortDayName = function(day) {
    return Date.dayNames[day].substring(0, 3);
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

//Date.parseCodes.S.s = '(?:st|nd|rd|th)';

if (Ext.picker.Picker){
    Ext.override(Ext.picker.Picker, {
        doneText: 'Done'    
    });
}

if (Ext.picker.Date) {
    Ext.override(Ext.picker.Date, {
        'dayText': 'Day',
        'monthText': 'Month',
        'yearText': 'Year',
        'slotOrder': ['month', 'day', 'year']    
    });
}

if(Ext.IndexBar){
    Ext.override(Ext.IndexBar, {
        'letters': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']    
    });
}

if(Ext.NestedList){
    Ext.override(Ext.NestedList, {
        'backText': 'Back',
        'loadingText': 'Loading...',
        'emptyText': 'No items available.'
    });
}

if(Ext.util.Format){
    Ext.util.Format.defaultDateFormat = 'm/d/Y';
}

if(Ext.MessageBox){
    Ext.MessageBox.OK.text = 'OK';
    Ext.MessageBox.CANCEL.text = 'Cancelar';
    Ext.MessageBox.YES.text = 'Sim';
    Ext.MessageBox.NO.text = 'Não';
}
