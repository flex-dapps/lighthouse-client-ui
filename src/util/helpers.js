import moment from 'moment'

export const numberToMaxDb = (value, dp=2) => +parseFloat(value).toFixed( dp )

export const validate = (value, rules={}) => {
	const errors = []
	Object.keys(rules).forEach(msg => !rules[msg](value) && errors.push(msg))
	return errors
}

export const userLocal = () => {
	return navigator.userLanguage || 
		(navigator.languages && navigator.languages.length && navigator.languages[0]) || 
		navigator.language || 
		navigator.browserLanguage || 
		navigator.systemLanguage || 
		null;
}

export const downloadFile = (name, contents) => {
	const el = document.createElement('a');
	el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
	el.setAttribute('download', name);
	el.style.display = 'none';
	document.body.appendChild(el);
	el.click();
	document.body.removeChild(el);
}

export const copyToClipboard = text => navigator.clipboard.writeText(text)

export const printElement = el => {
	const frame = document.createElement('iframe');
	frame.style='height: 0px; width: 0px; position: absolute'
	document.body.appendChild(frame);
	frame.contentDocument.write(el.innerHTML)
	frame.contentWindow.print();
	frame.parentElement.removeChild(frame);
}

export const printString = string => {
    const frame = document.createElement('iframe');
    frame.style='height: 0px; width: 0px; position: absolute'
    document.body.appendChild(frame);
    frame.contentDocument.write(string)
    frame.contentWindow.print();
    frame.parentElement.removeChild(frame);
}

export const JSONCycle = (object={}, replacer) => {
    const objects = new WeakMap(); 

    return (function derez(value, path) {

        var old_path;
        var nu;

        if (replacer !== undefined) {
            value = replacer(value);
        }

        if (
            typeof value === "object"
            && value !== null
            && !(value instanceof Boolean)
            && !(value instanceof Date)
            && !(value instanceof Number)
            && !(value instanceof RegExp)
            && !(value instanceof String)
        ) {

            old_path = objects.get(value);
            if (old_path !== undefined) {
                return {$ref: old_path};
            }

            objects.set(value, path);

            if (Array.isArray(value)) {
                nu = [];
                value.forEach(function (element, i) {
                    nu[i] = derez(element, path + "[" + i + "]");
                });
            } else {

                nu = {};
                Object.keys(value).forEach(function (name) {
                    nu[name] = derez(
                        value[name],
                        path + "[" + JSON.stringify(name) + "]"
                    );
                });
            }
            return nu;
        }
        return value;
    }(object, "$"));
}

export const stringToHex = string => {
    const hashCode = str => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    } 

    const intToRGB = i => {
        var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
    }

    return intToRGB(hashCode(string))
}

export const regex = {
	url: val => val ? val.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/) : false
}

export const format = {
	duration: (val, format='milliseconds') => val ? moment.duration(val, 'milliseconds').humanize() : null,
	commas: val => new Intl.NumberFormat().format(val),
	currency: (locale, currency, val=0) => Intl.NumberFormat(locale||'en-US', {style: 'currency', currency: currency||'USD', currencyDisplay: 'symbol', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(val||0),
}

export const truncateString = (addr, start=6, end=4) => addr ? `${addr.substring(0, start)}...${addr.substring(addr.length - end)}` : null

