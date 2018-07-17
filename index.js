var fs = require('fs');
var crypto = require('crypto');
var axios = require('axios');
var _ = require('lodash');
var csv = require("fast-csv");

var contentTypes = ['application', 'text'];

_.forEach(contentTypes, contentType => {
    axios.get('https://www.iana.org/assignments/media-types/' + contentType + '.csv')
        .then(response => {
            csv
                .fromString(response.data, {headers : ["Name", "Template", "Reference"]})
                .on("data", function(data){
                     // var hash = crypto.createHash('md5').update(data.Template).digest('hex').substring(0, 5)
                     // console.log(hash + ', /* ' + data.Template + ' */');
                     var name = contentType + '/' + data.Name,
                         cssCls = 'mime-type-' + name.replace(/\//, '-slash-')
                             .replace(/\./, '-dot-')
                             .replace(/\+/, '-plus-');
                     console.log(cssCls + ', /* ' + name + ' */')

                    // @TODO check if cls is part of given css file - alert otherwise
                 })
                 .on("end", function(){
                     // console.log("done");
                 });
        })
        .catch(error => {
            console.log(error);
        });
})
