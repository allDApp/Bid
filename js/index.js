var dappAddress = "n1n3texNxmEazZ5aNeCLxhuyJtqpnGizF8W";
$(function () {
	var NebPay = require("nebpay"); 
	var nebpay = new NebPay();

	$("#all").click(function () {
		var to = dappAddress;
		var value = "0";
		var callFunction = "getlist";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function (resp) {
				//console.log(JSON.stringify(resp.result));
				if (resp.result == "") {
					$("#searchresult").html('<div class="panel-body" >nodata</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if (res.length == 0) {
					$("#searchresult").html('<div class="panel-body">nodata</div>');
					return;
				}

				var tempStr = "";
				var time = Math.round(new Date().getTime() / 1000).toString(); //获取当前时间戳

				for (var i = 0; i < res.length; i++) {
					var pdpm = '';
					if (time > res[i].end) {
						pdpm += '<button class="button2"  id="conbidbutton" onclick="alert("END");">END</button><br>';
						pdpm += '<button class="button3"  id="conbidbutton" onclick="conbid(' + i + ');">Expiration Confirm</button>';
					}
					else {
						pdpm = '<button type="button1" class="button1" id="savebidbutton" onclick="bidinfo(' + i + ');">Bid</button>';
					}

					cj = res[i].cjvalue / (10e17);




					if (i % 2 == 0) {  //0 2 4 6 8
						tempStr += '<div class="panel-body"> ';
					} else {		//1 3 4 5 6
						tempStr += '<div class="panel-footer">';
					}
					tempStr += '<p>';
					tempStr += res[i].index + " " + res[i].info;
					tempStr += '<br>';
					tempStr += '<small><cite>' + 'Author:' + res[i].author.substr(3,6) + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<small><cite>' + 'End:' + ttt(res[i].end) + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<small><cite>' + 'Price:' + cj + '</cite></small> <br>';
					tempStr += pdpm;
					tempStr += '</p> </div><hr> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});
	});

$("#create").click(function () {
	$("#detailTitle").text("发起拍卖")
	var tempStr = '';
	tempStr += '<div class="panel-body"> ';
	tempStr += '<form role="form">';
	tempStr += '<div class="form-group">';

	tempStr += '<h6>The auction time(Unit: second)</h6>';
	tempStr += '<input type="text" class="form-control" rows="1" id="name" placeholder="86400">';
	tempStr += '<br><h6>The detailed content</h6>';
	tempStr += '<textarea class="form-control1" rows="10" id="content" placeholder="Title&#13;&#10;Content&#13;&#10;Location&#13;&#10;Contact information"></textarea>';
	tempStr += '<p>Auctioneer\'s mission 1%</p>';
	tempStr += '<br><br><button class="button1" class="btn btn-primary" id="savebutton" onclick="save();">Create New Auction</button><p color="red";>PS:need 0.00001 cash deposit.</p>';
	tempStr += '</div>';
	tempStr += '</form>';
	tempStr += '</div> ';
	console.log(tempStr);
	$("#searchresult").html(tempStr);
});

$("#help").click(function () {
	$("#detailTitle").text("Help");
	var tempStr = '';
	tempStr += '<p>How to use it?</p>';
	tempStr += '<p>Need WebExtensionWallet:</p>';
	tempStr += '<p href="https://github.com/ChengOrangeJu/WebExtensionWallet">https://github.com/ChengOrangeJu/WebExtensionWallet</p>';
	console.log(tempStr);

	$("#searchresult").html(tempStr);
});

$("#about").click(function () {
	$("#detailTitle").text("about");
	var tempStr = '';
	tempStr += '<p>Contact me:</p>';
	tempStr += '<p>http://t.me/VaporCat</p>';
	console.log(tempStr);

	$("#searchresult").html(tempStr);
});

	$("#updatee").click(function () {
		$("#detailTitle").text("updatee");
		var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
		tempStr += '<p>商品序号</p>';
		tempStr += '<textarea class="form-control" rows="1" id="nids" >0</textarea>';
		tempStr += '<p>出价 (加价至少0.001)</p>';
		tempStr += '<textarea class="form-control" rows="1" id="nidsmon" >0.001</textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebidbutton" onclick="savebid();">请点击列表中的"参与拍卖"按钮</button>';
		tempStr += '</div>';
		tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});
});



function bidinfo(i) {
    $("#detailTitle").text("updatee");
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
	var to = dappAddress;
	var value = "0";
	var callFunction = "getlist";
	var callArgs = "[]";


	nebpay.simulateCall(to, value, callFunction, callArgs, {
		listener: function (resp) {
			//console.log(JSON.stringify(resp.result));
			if (resp.result == "") {
				$("#searchresult").html('<div class="panel-body" >nodata</div>');
				return;
			}
			var res = JSON.parse(resp.result);
			if (res.length == 0) {
				$("#searchresult").html('<div class="panel-body">nodata</div>');
				return;
			}
			var tempStr = "";
			cj = res[i].cjvalue / (10e17);
			if (i % 2 == 0) {  //0 2 4 6 8
				tempStr += '<div class="panel-body"> ';
			} else {		//1 3 4 5 6
				tempStr += '<div class="panel-footer">';
			}

			tempStr += '<div class="xh">';
			tempStr += "ID:" + res[i].index  + "<br> Content:"  + res[i].info;
			tempStr += '</div>';
			tempStr += '<div class="info">';
			tempStr += '<small><cite>' + 'Principal seller:' + res[i].author + '</cite></small>';
			tempStr += '<br>';
			tempStr += '<small><cite>' + 'Start Time:' + ttt(res[i].createdDate) + '</cite></small>';
			tempStr += '<br>';
			tempStr += '<small><cite>' + 'Expiration Time:' + ttt(res[i].end) + '</cite></small>';
			tempStr += '<br>';
			tempStr += '<small><cite>' + 'Bid price:' + cj + '</cite></small>';
			tempStr += '</div>';
			tempStr += '<div class="cj">';
			tempStr += 'Bid increments 0.001 NAS';
			tempStr += '<br><input type="text" class="form-control" rows="1" id="nidsmon"  placeholder="0.001">';
			tempStr += '<br><button type="button" class="btn btn-primary" id="savebidbutton" onclick="savebid(' + i + ');">BID</button>';
			tempStr += '</div>';
			tempStr += '</form>';
			tempStr += '</div> ';

			$("#searchresult").html(tempStr);
		}
	});
}

function savebid(i) {
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
	var nids = i.toString();   
	var nidsmon = $("#nidsmon").val();
	if (nids == "") {
		alert("FAIL...");
		return;
	}
	if (nidsmon == "") {
		alert("FAIL PRICE");
		return;
	}

	nids = nids.replace(/\n/g, "<br>");
	nidsmon = nidsmon.replace(/\n/g, "<br>");
	nebpay.call(dappAddress, "" + nidsmon, "bid", "[\"" + nids + "\"]", {
		listener: function Push(resp) {
			console.log("response of push: " + JSON.stringify(resp))
			var respString = JSON.stringify(resp);
			if (respString.search("rejected by user") !== -1) {
				alert("cancle")
			} else if (respString.search("txhash") !== -1) {
				alert("Update Hash: " + resp.txhash)
			}
		}
	})
};


function save() {
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
	var content = $("#content").val();
	var name = $("#name").val();
	if (content == "") {
		alert("FAIL INFO");
		return;
	}
	if (name == "") {
		alert("FAIL TIME");
		return;
	}

	content = content.replace(/\n/g, "<br>");
	name = name.replace(/\n/g, "<br>");
	var to = dappAddress;
	var value = "0.00001";
	var callFunction = "newo";
	var callArgs = '["' + content + '",' + name + ']';
	nebpay.call(to, value, callFunction, callArgs, {
		listener: function Push(resp) {
			console.log("response of push: " + JSON.stringify(resp))
			var respString = JSON.stringify(resp);
			if (respString.search("rejected by user") !== -1) {
				alert("cancle")
			} else if (respString.search("txhash") !== -1) {
				alert("Update Hash: " + resp.txhash)
			}
		}
	});
};

function conbid(i) {
	var NebPay = require("nebpay"); 
	var nebpay = new NebPay();
	var ids = i.toString();
	if (ids == "") {
		alert("FAIL...");
		return;
	}
	ids = ids.replace(/\n/g, "<br>");
	nebpay.call(dappAddress, "0", "con", "[\"" + ids + "\"]", {
		listener: function Push(resp) {
			console.log("response of push: " + JSON.stringify(resp))
			var respString = JSON.stringify(resp);
			if (respString.search("rejected by user") !== -1) {
				alert("cancle")
			} else if (respString.search("txhash") !== -1) {
				alert("Update Hash: " + resp.txhash)
			}
		}
	})
};

function ttt(timestamp) {
	var date = new Date(timestamp * 1000);
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds();
	return Y + M + D + h + m + s;
}