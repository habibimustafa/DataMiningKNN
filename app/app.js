angular.module('knn', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])

.controller('process', function($scope){

	// Mendefinisikan Dataset
	$scope.dataset = {
		header: ["Takaran Saji", "Jumlah Saji", "Energi Total", "Kelas"],
		kelas: ["Bagus", "Jelek"],
		body: [
			[40, 5, 60, "Jelek"],
			[50, 8, 40, "Bagus"],
			[50, 7, 30, "Jelek"],
			[70, 4, 60, "Bagus"],
			[80, 4, 80, "Bagus"],
			[60, 6, 60, "Bagus"]
		]
	};
	$scope.hdsave = function(){
		$scope.dataset.header.splice(-1, 0, $scope.attrib);
		$scope.attrib = null;
	}
	$scope.hdrem = function(id){
		$scope.dataset.header.splice(id, 1);
		for (var i = 0; i < $scope.dataset.body.length; i++) {
			$scope.dataset.body[i].splice(id, 1);
		}
	}
	$scope.klsave = function(){
		$scope.dataset.kelas.push($scope.kls);
		$scope.kls = null;
	}
	$scope.klrem = function(id){
		$scope.dataset.kelas.splice(id, 1);
	}

	// Mendefinisikan Variabel 
	// untuk menampung Input Data
	$scope.inptbl  = [];
	$scope.inpsave = function(){
		$scope.dataset.body.push($scope.inptbl);
		$scope.inptbl = [];
	}
	$scope.inprem = function(id){
		$scope.dataset.body.splice(id, 1);
	}

	// Mendefinisikan Variabel 
	// untuk menampung Data Baru
	$scope.datanew  = {};

	// Mendefinisikan Variabel 
	// untuk menampung Jarak Eucladian
	$scope.distance = {};

	// Fungsi mengklasifikasi
	$scope.classify = function(){
		// Mengambil dataset dan data baru
		var set = $scope.dataset.body;
		var dat = $scope.datanew;
		var dist = {ecl:[], log:[]};

		// perulangan sebanyak dataset
		for (var i = 0; i < set.length; i++) {
			// inisialisasi jarak = 0
			var ecl = 0, log = null;
			// perulangan sebanyak item
			for (var j = 0; j < (set[i].length - 1); j++) {
				// hitung jarak eucladian
				var n = Math.pow(Math.abs((set[i][j] - dat[j])), 2);
				var l = ( '(' + set[i][j] +" - "+ dat[j] + ')^2' );
				// jumlahkan jarak eucladian
				ecl = ecl + n;
				
				if(j == 0)
					log = l;
				else
					log = log + " + " + l;
			};
			// console.log("Total: "+ecl);
			// console.log("------");
			dist.ecl.push(ecl);
			dist.log.push(log);
		};

		$scope.distance.ecl = dist.ecl;
		$scope.distance.min = Math.min.apply( Math, dist.ecl );
		$scope.distance.idx = dist.ecl.indexOf($scope.distance.min);
		$scope.distance.atr = $scope.dataset.body[$scope.distance.idx];
		$scope.distance.kls = $scope.distance.atr[$scope.distance.atr.length-1];
		$scope.distance.log = dist.log;
		// $scope.distance.srt = dist.ecl.sort(function(a, b){return a-b});
	}

	$scope.step = 1;
})