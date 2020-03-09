const Handlebars = require('handlebars');

module.exports = settings => {
    if (Handlebars.Utils.isArray(settings) && !Handlebars.Utils.isEmpty(settings)) {
        let websiteFields = '';
        settings.forEach((setting) => {
            if (setting.inputType == 'website') {
                websiteFields += `
                form.find('.${setting.name}').empty();
                form.find('.${setting.name}').html(optionsStr);
`;
            }
        });

        if (websiteFields && websiteFields.length) {

            const websiteAjax = `
        $.ajax({
            url: '/websites/_DAV/PROPFIND?fields=name',
            type: 'GET',
            dataType: 'json',
            success: function (resp) {
                var optionsStr = '<option value="">[No website selected]</option>';
                for (var i = 1; i < resp.length; i++) {
                    optionsStr += '<option value="' + resp[i].name + '">' + resp[i].name + '</option>';
                }
                ${websiteFields}
            }
        });`;

            return new Handlebars.SafeString(websiteAjax);
        }
    } else {
        return '';
    }
};