const Handlebars = require('handlebars');

module.exports = (settings, forGoal) => {
    const isGoal = forGoal === true;
    if (Handlebars.Utils.isArray(settings) && !Handlebars.Utils.isEmpty(settings)) {
        let result = '';
        settings.forEach((setting, i, arr) => {
            const isFirst = i === 0;
            const isLast = i === (arr.length - 1)
            let input = '';
            switch (setting.inputType) {
                case 'text': {
                    input = `<input type="text" class="form-control ${setting.name}${setting.required ? ' required' : ''}" />`;
                    break;
                }
                case 'textarea': {
                    input = `<textarea rows="4" class="form-control ${setting.name}${setting.required ? ' required' : ''}"></textarea>`;
                    break;
                }
                case 'checkbox': {
                    input = `<input class="${setting.name}${setting.required ? ' required' : ''}" type="checkbox" value="true"/>`;
                    break;
                }
                case 'select':
                case 'website': {
                    input = `<select class="form-control ${setting.name}${setting.required ? ' required' : ''}"></select>`;
                    break;
                }
                default: {
                    return '';
                }
            }
            let div = `${!isFirst ? '            ' : ''}'<div class="form-group">' +
            '    <div class="col-md-12">' +
            '        <label>${setting.title}</label>' +
            '        ${input}' +
            '    </div>' +
            '</div>' ${!isLast || isGoal ? '+\n' : ''}`;
            result += div;
        });

        return new Handlebars.SafeString(result);
    } else {
        return '';
    }
};