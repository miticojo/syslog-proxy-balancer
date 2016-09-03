/**
 * Created by miticojo on 03/09/16.
 */

var validation = module.exports = {};

validation.check =  function (message, rfc,  callback){
    // assign default value
    rfc = rfc || 3164;

    if (rfc == 3164)
        var re = /([A-Z][a-z][a-z]\s{1,2}\d{1,2}\s\d{2}[:]\d{2}[:]\d{2})\s([\w][\w\d\.@-]*)\s(.*)$/;
    else if (rfc == 5424)
        var re = /(?:(\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}(?:\.\d{1,6})?(?:[+-]\d{2}[:]\d{2}|Z)?)|-)\s(?:([\w][\w\d\.@-]*)|-)\s(.*)$/;

    var result;
    if ((result = re.exec(message)) !== null) {
        if (result.index === re.lastIndex) {
            re.lastIndex++;
        }
        callback(result)
    }
}
