var OpenSpending = OpenSpending || {};

OpenSpending.getBubbleChartDependencies = function(os_path) {
    return [
        os_path + '/lib/vendor/base64.js',
        os_path + '/lib/boot.js',
        os_path + '/lib/vendor/accounting.js',
        os_path + '/lib/utils/utils.js',
        os_path + '/lib/aggregator.js',
        '/js/bubbletree.js',
        os_path + '/lib/vendor/vis4.js',
        os_path + '/lib/vendor/Tween.js',
        os_path + '/lib/vendor/jquery.history.js',
        os_path + '/lib/vendor/bubbletree/1.0/bubbletree.css',
        '/css/map.css',
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
            headaccount:  BubbleTree.Styles.CouncilAccount
        }

    }, config);

    $('#preloader .txt').html('loading spending data');

    var $tooltip = $('<div class="tooltip">Tooltip</div>');
    $('.bubbletree').append($tooltip);
    $tooltip.hide();


    var onNodeClick = function(node) {
        curtainsUp();
        // show table for top levels only
        if(node.level>=2) return;

        var currency = opts.currency || node.currency;
        
        $("#cm-budget-table").empty();
        var amountFmt = OpenSpending.Utils.formatAmountWithCommas(node.amount, 0, currency);
        $("#cm-budget-table").append('<tr><td class="table-title" colspan="2">'+node.label+' - '+amountFmt+'</td></tr>');
        $("#cm-budget-table").append('<tr><td class="left-table-title">Amount ('+OpenSpending.Utils.currencySymbol(currency)+')</td><td class="right-table-title">Account</td></tr>');

        var budgetArray = [];
        for(var i=0;i<node.children.length;i++){
            var child = node.children[i];
            budgetArray[i] = {label:child.label,amount:child.amount};
        }
        budgetArray.sort(function(a,b){return b.amount-a.amount});
        for(i=0;i<budgetArray.length;i++){
            var child = budgetArray[i];
            var amountFmt = OpenSpending.Utils.formatAmountWithCommas(child.amount, 0, "")
            $("#cm-budget-table").append('<tr><td class="left-column">'+amountFmt+'</td><td class="right-column">'+child.label+'</td></tr>');

        }

    };

    var curtainsUp = function() {
        $('#preloader').hide();
        $('.under-curtain').show();
        $('.qtip').remove();
        $("#cm-budget-panel").css("visibility", "visible");
    };

    var curtainsDown = function() {
        $('.qtip').remove();
        $('.under-curtain').hide();
        $('#cm-bubbletree').empty();
        $("#cm-budget-panel").css("visibility", "hidden");
        $('#preloader').show();
    };

    curtainsDown();
    // init bubbletree
    new OpenSpending.Aggregator({
        apiUrl: opts.query.apiUrl,
        dataset: opts.query.dataset,
        drilldowns: opts.query.drilldowns,
        cuts: opts.query.cuts,
        rootNodeLabel: opts.query.rootNodeLabel,
        processEntry: opts.query.processEntry,
        callback: function(data) {
            self.bt = new BubbleTree({
                data: data,
                container: '#cm-bubbletree',
                bubbleType: 'color',
                nodeClickCallback: onNodeClick,
                firstNodeCallback: onNodeClick,
                //minRadiusLabels: 40,
                //minRadiusAmounts: 20,
                minRadiusHideLabels: 15,
                cutLabelsAt: 20,
                rootPath: '/img/functions/',
                /*
                tooltip: {
                    qtip: true,
                    delay: 800,
                    content: function(node) {
                        return [node.label, '<div class="desc">'+(node.description ? node.description : 'No description given')+'</div><div class="amount">£ '+node.famount+'</div>'];
                    }
                },
                */
                tooltip: function(node) {
                        return [node.label, '<div class="desc">'+(node.description ? node.description : 'No description given')+'</div><div class="amount">£ '+node.famount+'</div>'];
                },
                bubbleStyles: opts.bubbleStyles,
                //clearColors: true // remove all colors coming from OpenSpending API
            });
        }
    });

};
