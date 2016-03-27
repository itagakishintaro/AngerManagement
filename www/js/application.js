'use strict';

// ---------- Local Strage ----------
var lsSave = function lsSave(datasetName, data) {
    var dataset = lsFind(datasetName);
    dataset.push(data);
    localStorage.setItem(datasetName, JSON.stringify(dataset));
};

var lsFind = function lsFind(datasetName) {
    if (localStorage.getItem(datasetName)) {
        var dataset = JSON.parse(localStorage.getItem(datasetName));
        return objectArraySort(dataset, 'datetime');
    } else {
        return [];
    }
};

// ---------- INITIALIZE ----------
var initMenu = function initMenu() {
    $(".button-collapse").sideNav({
        closeOnClick: true
    });
};

var initMantraArea = function initMantraArea() {
    $('#mantra').css('height', $(window).height() - $('#menu').height());
};

var initMaterialSelect = function initMaterialSelect() {
    $('select').material_select();
};

var initColorbox = function initColorbox() {
    $('.modal-positive-trigger').colorbox({
        href: 'partials/modal-positive.html'
    });
    $('.modal-negative-trigger').colorbox({
        href: 'partials/modal-negative.html'
    });
};

// ---------- VIEW ----------
var getMantra = function getMantra() {
    var mantra = {};
    mantra.datetime = new XDate();
    mantra.mantra = $('#mantraInput').val();
    return mantra;
};

var getAngerLog = function getAngerLog() {
    var angerLog = {};
    angerLog.angerLevel = $('#angerLevel').val();
    angerLog.situation = $('#situation').val();
    angerLog.feel = $('#feel').val();
    angerLog.action = $('#action').val();
    angerLog.try = $('#try').val();
    angerLog.think = $('#think').val();
    angerLog.datetime = new XDate();
    return angerLog;
};

var getAngerLogsForView = function getAngerLogsForView() {
    var logs = lsFind('angerlogs');
    logs.forEach(function (log) {
        log.datetime = new XDate(log.datetime).toString('yyyy/MM/dd HH:mm');
        log.angerLevelIcon = '';
        for (var i = 1; i <= Number(log.angerLevel); i++) {
            log.angerLevelIcon += '<i class="fa fa-heartbeat anger-level-icon"></i>';
        }
        if (log.angerLevel === '2') {
            log.color = 'orange accent-1';
        } else if (log.angerLevel === '3') {
            log.color = 'orange accent-2';
        } else if (log.angerLevel === '4') {
            log.color = 'orange accent-3';
        } else {
            log.color = '';
        }
    });
    return logs;
};

var getKpt = function getKpt() {
    var kpt = {};
    kpt.keep = $('#keep').val();
    kpt.problemm = $('#problemm').val();
    kpt.try = $('#try').val();
    kpt.datetime = new XDate();
    return kpt;
};
'use strict';

var app = angular.module('app', ['ngRoute', 'controllers', 'services']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/mantra.html',
        controller: 'MantraController'
    }).when('/mantra', {
        templateUrl: 'partials/mantra.html',
        controller: 'MantraController'
    }).when('/mantra-input', {
        templateUrl: 'partials/mantra-input.html',
        controller: 'MantraInputController'
    }).when('/diary', {
        templateUrl: 'partials/diary.html',
        controller: 'DiaryController'
    }).when('/retrospective', {
        templateUrl: 'partials/retrospective.html',
        controller: 'RetrospectiveController'
    }).when('/check', {
        templateUrl: 'partials/check.html',
        controller: 'CheckController'
    }).when('/improve', {
        templateUrl: 'partials/improve.html',
        controller: 'ImproveController'
    });
});
'use strict';

var controllers = angular.module('controllers', []);

app.controller('MenuController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function (event) {
        initMenu();
    });
}]);

app.controller('MantraController', ['$scope', '$location', 'Mantra', function ($scope, $location, Mantra) {
    angular.element(document).ready(function () {
        initMantraArea();
        Mantra.show($location);
    });
}]);

app.controller('MantraInputController', ['$scope', '$location', 'Mantra', function ($scope, $location, Mantra) {
    $scope.save = function () {
        Mantra.save();
        $location.path('/mantra');
    };
}]);

app.controller('DiaryController', ['$scope', '$sce', 'Diary', function ($scope, $sce, Diary) {
    Diary.addLog($scope, $sce);
    angular.element(document).ready(function () {
        initMaterialSelect();
    });
    $scope.save = function () {
        Diary.save($scope, $sce);
    };
    $scope.moveTo = function (e) {
        moveTo($(e.target).next('label'));
    };
}]);

app.controller('RetrospectiveController', ['$scope', 'Retrospective', function ($scope, Retrospective) {
    Retrospective.addKpt($scope);
    angular.element(document).ready(function () {
        initColorbox();
    });
    $scope.save = function () {
        Retrospective.save($scope);
    };
    $scope.moveTo = function (e) {
        moveTo($(e.target).next('label'));
    };
}]);

app.controller('CheckController', ['$scope', '$location', 'Check', function ($scope, $location, Check) {
    $scope.index = 0;
    $scope.MAX_INDEX = questionnarire.length - 1;
    $scope.questionnarire = questionnarire;

    $scope.next = function () {
        if (Check.setAnswer($scope.index)) {
            $scope.index += 1;
            Check.init($scope.index);
        }
    };
    $scope.prev = function () {
        $scope.index -= 1;
        Check.init($scope.index);
    };
    $scope.done = function () {
        if (Check.setAnswer($scope.index)) {
            Check.eval();
            Check.gotoImprove($location);
        }
    };
}]);

app.controller('ImproveController', ['$scope', 'Improve', function ($scope, Improve) {
    Improve.init($scope);
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var services = angular.module('services', []);

var Mantra = function () {
    function Mantra() {
        _classCallCheck(this, Mantra);
    }

    _createClass(Mantra, [{
        key: 'show',
        value: function show($location) {
            if (lsFind('mantras').length > 0) {
                var newestMantra = lsFind('mantras')[0].mantra;
                $('#mantra').html(convertLFtoBR(newestMantra));
            } else {
                $location.path('/mantra-input');
            }
        }
    }, {
        key: 'save',
        value: function save() {
            var mantra = lsFind('mantras');
            lsSave('mantras', getMantra());
        }
    }]);

    return Mantra;
}();

services.service('Mantra', Mantra);

var Diary = function () {
    function Diary() {
        _classCallCheck(this, Diary);
    }

    _createClass(Diary, [{
        key: 'save',
        value: function save($scope, $sce) {
            lsSave('angerlogs', getAngerLog());
            this.addLog($scope, $sce);
            moveTo($('#record'));
        }
    }, {
        key: 'addLog',
        value: function addLog($scope, $sce) {
            var logs = getAngerLogsForView();
            logs.forEach(function (log) {
                log.angerLevelIcon = $sce.trustAsHtml(log.angerLevelIcon);
            });
            $scope.logs = logs;
        }
    }]);

    return Diary;
}();

services.service('Diary', Diary);

var Retrospective = function () {
    function Retrospective() {
        _classCallCheck(this, Retrospective);
    }

    _createClass(Retrospective, [{
        key: 'save',
        value: function save($scope) {
            lsSave('kpts', getKpt());
            this.addKpt($scope);
            moveTo($('#record'));
        }
    }, {
        key: 'addKpt',
        value: function addKpt($scope) {
            $scope.kpts = lsFind('kpts');
        }
    }]);

    return Retrospective;
}();

services.service('Retrospective', Retrospective);

var Check = function () {
    function Check() {
        _classCallCheck(this, Check);

        this.answer = {};
    }

    _createClass(Check, [{
        key: 'init',
        value: function init(index) {
            var answerValue = this.answer[index];
            if (answerValue) {
                $('input[name="answer"]')[Number(answerValue) - 1].checked = true;
            } else {
                $('input[name="answer"]:checked').attr('checked', false);
            }
        }
    }, {
        key: 'setAnswer',
        value: function setAnswer(index) {
            if ($('input[name="answer"]:checked').val()) {
                this.answer[index] = $('input[name="answer"]:checked').val();
                return true;
            } else {
                $('#alert').openModal();
                return false;
            }
        }
    }, {
        key: 'eval',
        value: function _eval() {
            var _this = this;

            var point = [];
            factors.forEach(function (element, index) {
                point[index] = 0;
            });

            questionnarire.forEach(function (q, index) {
                if (q.reverse) {
                    var MAX_VAL = 5;
                    point[q.factor] += Number(MAX_VAL + 1 - _this.answer[index]);
                } else {
                    point[q.factor] += Number(_this.answer[index]);
                }
            });

            lsSave('points', {
                'datetime': new XDate(),
                'point': point
            });
        }
    }, {
        key: 'gotoImprove',
        value: function gotoImprove($location) {
            $location.path('/improve');
        }
    }]);

    return Check;
}();

services.service('Check', Check);

var Improve = function () {
    function Improve() {
        _classCallCheck(this, Improve);
    }

    _createClass(Improve, [{
        key: 'init',
        value: function init($scope) {
            $scope.points = lsFind('points');
            $scope.factors = factors;
            $scope.averages = averages;
            $scope.sum = sum;
        }
    }]);

    return Improve;
}();

services.service('Improve', Improve);
'use strict';

var factors = ['身体的攻撃', '言語的攻撃', '怒り', '敵意'];
var averages = {
    'male': ['17 - 32', '12 - 19', '12 - 22', '16 - 26', '62 - 94'],
    'female': ['12 - 24', '10 - 17', '11 - 22', '14 - 26', '52 - 85']
};
var questionnarire = [{
    'q': '私は誰かをなぐりたくなる衝動をコントロールすることができないことがある。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は普通の人よりも少し多くけんかをする。',
    'factor': 0,
    'reverse': false
}, {
    'q': '人にムッとさせられたら、私は自分がどう思ったか相手にはっきり伝える。',
    'factor': 1,
    'reverse': false
}, {
    'q': '私はすぐにカッとなるが、忘れるのも早い。',
    'factor': 2,
    'reverse': false
}, {
    'q': '私は正当な理由もなくキレることがある。',
    'factor': 2,
    'reverse': false
}, {
    'q': '私は嫉妬に悩まされることがある。',
    'factor': 3,
    'reverse': false
}, {
    'q': '私はこれまで誰かに押されるとけんかになった。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は感情をコントロールすることが難しい。',
    'factor': 2,
    'reverse': false
}, {
    'q': '友人から、私はすぐ言い争うと言われる。',
    'factor': 1,
    'reverse': false
}, {
    'q': '私は自分が爆発しそうな火薬庫のような気分になることがある。',
    'factor': 2,
    'reverse': false
}, {
    'q': '私はひどく挑発されればなぐるだろう。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は頭にくると物を壊す。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は他の人が渡しにとくに優しいと、何かして欲しいのかと思ってしまう。',
    'factor': 3,
    'reverse': false
}, {
    'q': '私は冷静な人間だ。',
    'factor': 2,
    'reverse': true
}, {
    'q': '私は欲求不満がたまるとイライラを表に出す。',
    'factor': 2,
    'reverse': false
}, {
    'q': '私は知らない人がとても親切だと疑い深くなる。',
    'factor': 3,
    'reverse': false
}, {
    'q': '友人の中には、私を短気だという人がいる。',
    'factor': 2,
    'reverse': false
}, {
    'q': '私は誰かがなぐってきたらなぐり返す。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私はよく人と言い争いをする。',
    'factor': 1,
    'reverse': false
}, {
    'q': '私は他の人たちはいつもあら探しをしていると感じる。',
    'factor': 3,
    'reverse': false
}, {
    'q': '私は人をなぐるのに正当な理由があるとは思えない。',
    'factor': 0,
    'reverse': true
}, {
    'q': '私はひどい扱いを受けていると感じることがある。',
    'factor': 3,
    'reverse': false
}, {
    'q': '私は友人に納得できないときはストレートに言う。',
    'factor': 1,
    'reverse': false
}, {
    'q': '私はかげで笑われていると感じることがある。',
    'factor': 3,
    'reverse': false
}, {
    'q': '自分の権利を守るために暴力に訴えなければならないならば、私はそうするだろう。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は人が自分に同意しないとき言い争いになるのを抑えられない。',
    'factor': 1,
    'reverse': false
}, {
    'q': '私は知っている人を脅したことがある。',
    'factor': 0,
    'reverse': false
}, {
    'q': '私は「友達」というものは私の陰口をたたいているものだと思う。',
    'factor': 3,
    'reverse': false
}, {
    'q': '私はどうしてこれほど物事がつらく感じるのだろうと思うことがある。',
    'factor': 3,
    'reverse': false
}];
'use strict';

var objectArraySort = function objectArraySort(array, prop) {
    return array.sort(function (a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        } else {
            return 0;
        }
    });
};

var moveTo = function moveTo(target) {
    var TARGET_OFFSET = target.offset().top;
    $('html,body').animate({
        scrollTop: TARGET_OFFSET
    }, 500);
};

var convertLFtoBR = function convertLFtoBR(text) {
    return text.replace(/\r?\n/g, '<br>');
};

var sum = function sum(array) {
    return array.reduce(function (pre, val) {
        return pre + val;
    });
};