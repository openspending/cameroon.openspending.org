#!/bin/bash

echo "Compiling JS...."
FN='js/all.min.js'
echo ''>$FN
curl http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.5.3/modernizr.min.js >>$FN
curl http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js >>$FN
curl http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js >>$FN
curl http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min.js >>$FN
cat js/bootstrap.min.js >>$FN
cat js/jquery.tablesorter.min.js >>$FN
cat js/jquery.qtip.min.js >>$FN
#cat js/raphael-min.js >>$FN
cat js/chroma.min.js >>$FN
cat js/chroma.pack.min.js >>$FN
cat js/kartograph.min.js >>$FN
#uglifyjs -nm -o js/all.min.js $FN
#rm $FN


