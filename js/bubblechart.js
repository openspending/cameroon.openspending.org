var OpenSpending = OpenSpending || {};

OpenSpending.getBubbleChartDependencies = function(os_path) {
    return [
        os_path + '/lib/vendor/base64.js',
        os_path + '/lib/boot.js',
        os_path + '/lib/vendor/accounting.js',
        os_path + '/lib/utils/utils.js',
        os_path + '/lib/aggregator.js',
        os_path + '/lib/vendor/bubbletree/2.0/bubbletree.js',
        os_path + '/lib/vendor/vis4.js',
        os_path + '/lib/vendor/Tween.js',
        os_path + '/lib/vendor/jquery.history.js',
        os_path + '/lib/vendor/bubbletree/1.0/bubbletree.css',
        'css/map.css',
        '/img/functions/functions.js',
        '/js/bubblechart.js'
        ];
};

OpenSpending.BubbleChart = function (config) {
    var self = this;

    opts = $.extend(true, {
        query: {
            apiUrl: 'http://openspending.org/api',
            dataset: null,
            drilldowns: [],
            cuts: [],
            rootNodeLabel: null
        },
        bubbleStyles: {
            cofog1:  BubbleTree.Styles.Cofog1
        }
        /*,
        map: {
            url: null,
            layerName: null,
            keyAttribute: null
        }
        */
    }, config);

    $('#preloader .txt').html('loading spending data');

    var $tooltip = $('<div class="tooltip">Tooltip</div>');
    $('.bubbletree').append($tooltip);
    $tooltip.hide();
    
    var formatAmount = BubbleTree.Utils.formatNumber;

    function updateLegend(title, colors, limits, currency) {
        var currencyLabel = ' (' + currency + ')';
        var $lg = $('#cm-map-legend');
        $lg.html('');
        $lg.append('<div class="title">Expenditure on '+title+'</div>');
        $.each(colors, function(i,col) {
            var row = $('<div class="row" />'),
                lbl = formatAmount(limits[i])+'&nbsp;–&nbsp;'+formatAmount(limits[i+1])+
                    (i===0?currencyLabel:'');
            row.append('<div class="color" style="background:'+col+'"></div>');
            row.append('<div class="lbl">'+lbl+'</div>');
            $lg.append(row);
        });
    }

    var onNodeClick = function(node) {

        /*
        var 
        // create a nice colorscale based on the selected bubble color
        hcl = chroma.hex(node.color).hcl(),         
        colsc = new chroma.ColorScale({
            colors: [
                chroma.hcl(hcl[0], Math.min(1,hcl[1]), 0.95),
                chroma.hcl(hcl[0], Math.min(1.2,hcl[1]), 0.8),
                chroma.hcl(hcl[0], Math.min(1.4,hcl[1]), 0.65),
                chroma.hcl(hcl[0], Math.min(1.6,hcl[1]), 0.5),
                chroma.hcl(hcl[0], Math.min(1.8,hcl[1]), 0.35),
                chroma.hcl(hcl[0], Math.min(2,hcl[1]), 0.2)
            ],
            limits: chroma.limits(node.breakdowns, 'q', 6, 'amount')
        });


        // update map legend
        updateLegend(node.label, colsc.colors, colsc.classLimits, 
                     OpenSpending.Utils.currencySymbol(node.currency));
        
        // apply colors to map
        self.map.choropleth({
            data: function(e) { 
                return node.breakdowns[e[opts.map.keyAttribute]];
            },
            colors: function(d) {
                if (d === undefined || isNaN(d.amount)) return '#ccc';
                return colsc.getColor(d.amount);
            }
            //,duration: 200

        });

        
        self.map.tooltips({ 
            layer: opts.map.layerName,
            content: function (e) {
                var v = node.breakdowns[e];
                if (v === undefined ) return ['', ''];
                var famount = OpenSpending.Utils.formatAmountWithCommas(v.amount, 0, node.currency);
                return [e, '<div class="lbl">Expenditure on '+node.label+'</div><div class="amount">'+famount+'</div>'];
            },
            delay: 300
        });
         */
        // create tooltips
    };
    
    // init bubbletree
    new OpenSpending.Aggregator({
        apiUrl: opts.query.apiUrl,
        dataset: opts.query.dataset,
        drilldowns: opts.query.drilldowns,
        cuts: opts.query.cuts,
        rootNodeLabel: opts.query.rootNodeLabel,
        callback: function(data) {
            //console.log(data);
            
            $('#preloader').remove();
            //$('#cm-map').show();

            self.bt = new BubbleTree({
                data: data,
                container: '#cm-bubbletree',
                bubbleType: 'icon',
                nodeClickCallback: onNodeClick,
                firstNodeCallback: onNodeClick,
                rootPath: 'img/functions/',
                tooltip: {
                    qtip: true,
                    delay: 800,
                    content: function(node) {
                        return [node.label, '<div class="desc">'+(node.description ? node.description : 'No description given')+'</div><div class="amount">£ '+node.famount+'</div>'];
                    }
                },
                bubbleStyles: opts.bubbleStyles,
                clearColors: true // remove all colors coming from OpenSpending API
            });
        }
    });
     
    // init map
    /*
    var map = self.map = $K.map('#cm-map');
    map.loadStyles('css/map.css', function() {
        map.loadMap(opts.map.url, function() {
            map.addLayer({
                id: opts.map.layerName,
                key: opts.map.keyAttribute
            });
        }); // map.loadMap(function())
    }); // map.loadStyles(function())
    
    $('#cm-map').hide();
    */
};
