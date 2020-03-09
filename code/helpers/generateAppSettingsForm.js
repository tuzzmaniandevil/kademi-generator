const Handlebars = require('handlebars');

module.exports = (settings) => {
    if (Handlebars.Utils.isArray(settings) && !Handlebars.Utils.isEmpty(settings)) {
        let result = '';
        settings.forEach((setting, i, arr) => {
            const isFirst = i === 0;
            const isLast = i === (arr.length - 1)
            let input = '';
            switch (setting.inputType) {
                case 'text': {
                    input = `<input type="text" name="${setting.name}" id="${setting.name}" class="form-control ${setting.name}${setting.required ? ' required' : ''}" value="$formatter.firstNotNull($!page.getAppSetting($app.instanceId, '${setting.name}'), '')"/>`;
                    break;
                }
                case 'textarea': {
                    input = `<textarea rows="4" name="${setting.name}" id="${setting.name}" class="form-control ${setting.name}${setting.required ? ' required' : ''}">$formatter.firstNotNull($!page.getAppSetting($app.instanceId, '${setting.name}'), '')</textarea>`;
                    break;
                }
                case 'checkbox': {
                    input = `<input name="${setting.name}" id="${setting.name}" class="${setting.name}${setting.required ? ' required' : ''}" type="checkbox" value="true" $formatter.ifTrue($page.getAppSetting($app.instanceId, '${setting.name}'), 'checked="checked"', '')/>`;
                    break;
                }
                case 'select': {
                    input = `<select name="${setting.name}" id="${setting.name}" class="form-control ${setting.name}${setting.required ? ' required' : ''}"></select>`;
                    break;
                }
                default: {
                    return '';
                }
            }
            let div = `<div class="form-group">
    <label class="col-sm-4 control-label" for="${setting.name}">${setting.title}</label>
    <div class="col-sm-7">
        ${input}
    </div>
</div>\n`;
            result += div;
        });

        return new Handlebars.SafeString(result);
    } else {
        return '';
    }
};