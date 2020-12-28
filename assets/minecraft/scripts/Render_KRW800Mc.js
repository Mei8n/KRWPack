//Render_KRW800Mc.js  by unlock [複製/コピペ/転載を禁ずる]

//Please do not duplicate or copy.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);

importPackage(Packages.jp.ngt.rtm.util);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.org.lwjgl.input);
importPackage(Packages.org.lwjgl.util.vector);

importPackage(Packages.jp.kaiz.atsassistmod.api);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//###################################################################

//doorOpn(Cls)Sec：ドアを開く(閉じる)のに必要な秒数
//doorOpn(Cls)Spd：ドアを開く(閉じる)ときの手順
//[秒数,動かす距離(ﾒｰﾄﾙ基準(ﾒﾀｾｺ上の数値/100))]

var doorOpnSec = 2.3;
var doorOpnSpd = [
	[0.04, 0.0],
	[0.18, 0.05],
	[1.68, 0.52],
	[0.12, 0.02],
	[0.22, 0.06],
	[0.06, 0.0]
];

var doorClsSec = 3.1;
var doorClsSpd = [
	[0.045, 0.0],
	[0.15, -0.05],
	[2.165, -0.55],
	[0.31, -0.01],
	[0.34, -0.04],
	[0.09, 0.0]
];

//駆動距離：[ 0.65(65) ]
//使用音声：[  ]

//###################################################################

var entityID = 0;
var prevTickID = 0;

var doorMovementID = 1;
var doorStateID = 2;
var doorMovingTickID = 3;
var doorTargetMovementID = 4;
var countupID = 5;

var doorMovement;

var doorState;

var doorStateInTrain;

var shouldUpdate;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init(par1, par2) {

	//前面 外装
	body1 = renderer.registerParts(new Parts("前面", "前面2", "前面3", "4Q", "幕影", "前面ステップ", "尾灯枠", "手すり", "前照灯", "飾り帯", "前面窓柱",
		"前面窓Hゴム"));

	//外装
	body2 = renderer.registerParts(new Parts("側面", "車側灯", "乗務員扉外", "雨樋", "戸袋窓部シャドウ処理", "側面Hゴム", "間外", "窓枠外",
		"側面窓外", "ドア下", "屋根", "冷房", "アンテナ", "パンタ基台", "妻面外", "貫通扉外", "貫通幌"));

	//前面 内装 (運転室)
	cab_body = renderer.registerParts(new Parts("乗務員室仕切り_乗務員室", "前面内側", "Hゴム乗務員室側", "乗務員室床", "乗務員室内側", "乗務員扉内", "乗務員室天井",
		"乗務員室機器類_ミラー", "乗務員室機器類",
		"運転台筐体", "メーター"));

	//窓ガラス
	bodyGlass = renderer.registerParts(new Parts("戸袋窓", "側面窓", "貫通窓"));
	cabGlass = renderer.registerParts(new Parts("前面窓"));

	//車側灯
	doorLampL_ON = renderer.registerParts(new Parts("L_On"));
	doorLampL_OFF = renderer.registerParts(new Parts("L_Off"));
	doorLampR_ON = renderer.registerParts(new Parts("R_On"));
	doorLampR_OFF = renderer.registerParts(new Parts("R_Off"));

	//パンタグラフ
	pantaUp = renderer.registerParts(new Parts("パンタ上昇"));
	pantaDawn = renderer.registerParts(new Parts("パンタ下降"));

	//運転台戸閉め灯
	cabDoorLampON = renderer.registerParts(new Parts("戸閉点"));
	cabDoorLampOFF = renderer.registerParts(new Parts("戸閉滅"));

	//マスコン類
	mcH = renderer.registerParts(new Parts("マスコン"));
	brH = renderer.registerParts(new Parts("ブレーキハンドル"));
	revH = renderer.registerParts(new Parts("レバーサー"));

	//メーター類
	needleSpd = renderer.registerParts(new Parts("速度計針"));
	needlekV = renderer.registerParts(new Parts("電圧計針"));

	//警笛ペダル
	hornPedalON = renderer.registerParts(new Parts("警笛ペダル_On"));
	hornPedalOFF = renderer.registerParts(new Parts("警笛ペダル_Off"));

	//ATS表示機
	atsPanel = renderer.registerParts(new Parts("ATS表示器", "上", "下"));
	ats_12x = renderer.registerParts(new Parts("12"));
	ats_11x = renderer.registerParts(new Parts("11"));
	ats_10x = renderer.registerParts(new Parts("10"));
	ats_9x = renderer.registerParts(new Parts("9"));
	ats_8x = renderer.registerParts(new Parts("8"));
	ats_7x = renderer.registerParts(new Parts("7"));
	ats_6x = renderer.registerParts(new Parts("6"));
	ats_5x = renderer.registerParts(new Parts("5"));
	ats_4x = renderer.registerParts(new Parts("4"));
	ats_3x = renderer.registerParts(new Parts("3"));
	ats_2x = renderer.registerParts(new Parts("2"));
	ats_1x = renderer.registerParts(new Parts("1"));
	ats_x0 = renderer.registerParts(new Parts("_0"));
	ats_x5 = renderer.registerParts(new Parts("_5"));
	atsON = renderer.registerParts(new Parts("動作_点"));
	atsOFF = renderer.registerParts(new Parts("動作_滅"));

	//内装
	interior = renderer.registerParts(new Parts("間", "窓枠内", "側面窓内", "内側", "枠類", "座席", "ポール",
		"ダクト", "仕切り客室側", "妻面内", "禁煙", "貫通扉内", "取っ手", "天井", "床", "乗務員室仕切り_客室", "蛍光灯", "吊り革", "スピーカー"));

	//床下
	body3 = renderer.registerParts(new Parts("床下", "底", "影", "配管", "梯子", "連結器", "ジャンパ線", "ATS車上子"));

	//前照灯
	headlighton = renderer.registerParts(new Parts("前照灯点"));
	headlightoff = renderer.registerParts(new Parts("前照灯滅"));

	//尾灯
	taillighton = renderer.registerParts(new Parts("尾灯点"));
	taillightoff = renderer.registerParts(new Parts("尾灯滅"));

	//ドア外
	doorLFo = renderer.registerParts(new Parts("door_LF"));
	doorLBo = renderer.registerParts(new Parts("door_LB"));
	doorRFo = renderer.registerParts(new Parts("door_RF"));
	doorRBo = renderer.registerParts(new Parts("door_RB"));

	//ドア中
	doorLFi = renderer.registerParts(new Parts("door_LFN"));
	doorLBi = renderer.registerParts(new Parts("door_LBN"));
	doorRFi = renderer.registerParts(new Parts("door_RFN"));
	doorRBi = renderer.registerParts(new Parts("door_RBN"));

	//台車
	bogieF = renderer.registerParts(new Parts("bogieF")); //前台車
	bogieB = renderer.registerParts(new Parts("bogieB")); //後台車
	wheelF1 = renderer.registerParts(new Parts("wheelF1")); //車輪
	wheelF2 = renderer.registerParts(new Parts("wheelF2"));
	wheelB1 = renderer.registerParts(new Parts("wheelB1"));
	wheelB2 = renderer.registerParts(new Parts("wheelB2"));

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderPreview(pass) {

	if (pass == 0) {
		body1.render(renderer);
		body2.render(renderer);
		cab_body.render(renderer);
		doorLampL_OFF.render(renderer);
		doorLampR_OFF.render(renderer);
		pantaUp.render(renderer);
		atsPanel.render(renderer);
		interior.render(renderer);
		body3.render(renderer);
		headlightoff.render(renderer);
		taillightoff.render(renderer);
		doorLFo.render(renderer);
		doorLBo.render(renderer);
		doorRFo.render(renderer);
		doorRBo.render(renderer);
		doorLFi.render(renderer);
		doorLBi.render(renderer);
		doorRFi.render(renderer);
		doorRBi.render(renderer);
		bogieF.render(renderer);
		bogieB.render(renderer);
		wheelF1.render(renderer);
		wheelF2.render(renderer);
		wheelB1.render(renderer);
		wheelB2.render(renderer);
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateTick(entity) {

	if(entity == null) return false;

	var dataMap = entity.getResourceState().getDataMap();
	var tick = renderer.getTick(entity);

	var prevTick = dataMap.getInt("prevTick");

	dataMap.setInt("prevTick", tick, false);

	if (tick != prevTick) return true;

	return false;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function xorshift(seed) {

	var minDigits = 5;

	if (seed === 0) seed = 76314;

	seed = seed ^ seed << 13;
	seed = seed ^ seed >> 17;
	seed = seed ^ seed << 15;

	if (String(seed).length < minDigits) seed = xorshift(seed + 1);

	return seed;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderRotatePartFromPos(part, rotate, x, y, z, vecX, vecY, vecZ) {
	GL11.glPushMatrix();
	GL11.glTranslatef(x, y, z);
	GL11.glRotatef(rotate, vecX, vecY, vecZ);
	GL11.glTranslatef(-x, -y, -z);
	part.render(renderer);
	GL11.glPopMatrix();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createVector3f(x1, y1, z1, x2, y2, z2) {
	var x = x2 - x1;
	var y = y2 - y1;
	var z = z2 - z1;
	return new Vector3f(x, y, z);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getArrayFromData(ID, amount) {

	var ret = renderer.getData(ID);
	if (ret == 0) {
		ret = [];
		for (var i = 0; i < amount; i++) {
			ret[ret.length] = 0;
		}
	}
	return ret;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var HashMap = Java.type("java.util.HashMap");
var isBreaking = new HashMap();

function renderATS(entity) {

	atsPanel.render(renderer);//筐体

	var dataMap = entity.getResourceState().getDataMap();
	var Signal = entity.getSignal();
	var isControlCar = entity.isControlCar();
	var ATSspeed = entity.getSpeed() * 72.0;

	if (!isControlCar) return;

	function renderATSHelper(int) {

		if (ATSspeed > (int + 15)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-8);
			isBreaking.put(entity, true);

		} else if (ATSspeed > (int + 10)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-7);
			isBreaking.put(entity, true);

		} else if (ATSspeed > (int + 5)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-4);
			isBreaking.put(entity, true);

		} else if (ATSspeed > (int + 1)) {

			//ATS_Arr.render(renderer);

			dataMap.setBoolean('isOver5', true, 1);
			dataMap.setBoolean('isOver10', false, 1);

			if (isBreaking.get(entity)) {
				ControlTrain.setNotch(0);
				isBreaking.put(entity, false);
			}

		} else {
			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', false, 1);

			if (isBreaking.get(entity)) {
				ControlTrain.setNotch(0);
				isBreaking.put(entity, false);
			}
		}
	}

	if(Signal != 20){
		if (dataMap.getBoolean('isOver10')) {
			atsON.render(renderer);
		}

		else if (dataMap.getBoolean('isOver5')) {
			var tick = renderer.getTick(entity);
			var flash = tick % 20;
		
			if (flash <= 10) {
				atsON.render(renderer);
			}
		
			else {
				atsOFF.render(renderer);
			}
		}

		else atsOFF.render(renderer);
	}


	switch (Signal) {
		case 10:
			renderATSHelper(810);
			break;

		case 11:
			renderATSHelper(15);
			ats_1x.render(renderer);
			ats_x5.render(renderer);
			break;

		case 12:
			renderATSHelper(25);
			ats_2x.render(renderer);
			ats_x5.render(renderer);
			break;

		case 13:
			renderATSHelper(30);
			ats_3x.render(renderer);
			ats_x0.render(renderer);
			break;

		case 14:
			renderATSHelper(45);
			ats_4x.render(renderer);
			ats_x5.render(renderer);
			break;

		case 15:
			renderATSHelper(65);
			ats_6x.render(renderer);
			ats_x5.render(renderer);
			break;

		case 16:
			renderATSHelper(90);
			ats_9x.render(renderer);
			ats_x0.render(renderer);
			break;

		case 17:
			renderATSHelper(100);
			ats_10x.render(renderer);
			ats_x0.render(renderer);
			break;

		case 18:
			renderATSHelper(110);
			ats_11x.render(renderer);
			ats_x0.render(renderer);
			break;

		case 19:
			renderATSHelper(120);
			ats_12x.render(renderer);
			ats_x0.render(renderer);
			break;

		case 20:
			renderATSHelper(65);
			break;

		case 21:
			renderATSHelper(45);
			ats_4x.render(renderer);
			ats_x5.render(renderer);
			break;

		case 22:
			renderATSHelper(0);
			ats_x0.render(renderer);
			break;

		default:
			break;

	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function atsConfirmation(entity) {

	//riddenByEntity = entity.field_70153_n;
	var dataMap = entity.getResourceState().getDataMap();
	var notch = entity.getNotch();

	/*if (riddenByEntity === NGTUtil.getClientPlayer()) { //ATS確認 キー入力で動かないので未実装
		if (Keyboard.isKeyDown(Keyboard.KEY_U)) {
			dataMap.setBoolean('isATSRun', true, 1);
		}
	} else if (riddenByEntity == null) {
		dataMap.setBoolean('isATSRun', false, 1);
	} */
/*
	if (notch < 0) { //ノッチが0未満の時
		dataMap.setBoolean('isATSRun', true, 1);
	} else {
		dataMap.setBoolean('isATSRun', false, 1);
	}
}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function atsTimer(entity) {
	var dataMap = entity.getResourceState().getDataMap();
	var delaySeconds = 5; //ここに秒数

	var timerCount = dataMap.getInt('timerCount');

	if (entity.getSpeed() == 0) {
		dataMap.setBoolean('atsWarnOn0', false, 1);
		dataMap.setBoolean('atsWarnOn1', false, 1);
		timerCount = -3;
	} else if (timerCount == -2) {
		dataMap.setBoolean('atsWarnOn0', false, 1);
		return;
	} else if (dataMap.getBoolean('atsWarnEmr') || timerCount == -3) {
		return;
	} else if (timerCount == -1) {
		dataMap.setBoolean('atsWarnOn0', true, 1);
		dataMap.setBoolean('atsWarnOn1', true, 1);
		timerCount = delaySeconds * 20;
	} else if (entity.getNotch() < 0) {
		timerCount = -2;
	} else if (timerCount == 0) {
		dataMap.setBoolean('atsWarnEmr', true, 1);
		timerCount = -3;
	} else {
		timerCount--;
	}

	dataMap.setInt("timerCount", timerCount, 1);
}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function longATSAlert(entity, pass) {
	
	if (!entity.isControlCar()) {
		return;
	}

	var signal = entity.getSignal();
	//var speed = entity.getSpeed() * 72;
	var dataMap = entity.getResourceState().getDataMap();
	//var isATSRun = dataMap.getBoolean('isATSRun');
	//var atsWarnEmr = dataMap.getBoolean('atsWarnEmr');
	var atsWarnOn0 = dataMap.getBoolean('atsWarnOn0');
	var atsWarnOn1 = dataMap.getBoolean('atsWarnOn1');

/*	if (atsWarnEmr) {
		if (speed > 0) {
			ControlTrain.setNotch(-8);
		} else {
			dataMap.setBoolean('atsWarnEmr', false, 1);
			ControlTrain.setNotch(0);
		}
	}

	if (signal == 20) {
		dataMap.setBoolean('atsRunning', true, 1);
		atsConfirmation(entity);
		atsTimer(entity);

		if (isATSRun) return;

	} else {
		dataMap.setInt("timerCount", -1, 1);
		dataMap.setBoolean('atsRunning', false, 1);
		dataMap.setBoolean('atsWarnOn0', false, 1);
		dataMap.setBoolean('atsWarnOn1', false, 1);
		dataMap.setBoolean('atsWarnEmr', false, 1);
	} */
	
	if (signal == 20 && atsWarnOn0) {
		var tick = renderer.getTick(entity);
		var flash = tick % 20;
	
		if (flash <= 10) {
			atsON.render(renderer);
		}
	
		else {
			atsOFF.render(renderer);
		}
	}
	
	else if (atsWarnOn0) {
		atsON.render(renderer);
	}

	else if (atsWarnOn1) {
		atsOFF.render(renderer);
	}

	else if (signal == 20) {
		atsOFF.render(renderer);
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function kitadenATS(entity) {

	if(entity == null) return;

	var isControlCar = entity.isControlCar();
	var Signal = entity.getSignal();
	var ATSspeed = entity.getSpeed() * 72;

	if(!isControlCar) return;

	//-----------------------------------------------------------

		function renderATSHelper(int) {

			if(ATSspeed > (int + 5)) {
				ControlTrain.setNotch(-8);
				isBreaking.put(entity, true);
				atsON.render(renderer);

			} else {
				if(isBreaking.get(entity)) {
					if(ATSspeed <= 0) {
						ControlTrain.setNotch(0);
						isBreaking.put(entity, false);
					}
				}
			}
		}

	//-----------------------------------------------------------

	switch (Signal) {

		case 1: renderATSHelper(15); break;

		case 2: renderATSHelper(45); break;

		case 3: renderATSHelper(45); break;

		case 4: renderATSHelper(65); break;

		case 5: renderATSHelper(100); break;

		default: break;

	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendHornKey(entity) {
	var dataMap = entity.getResourceState().getDataMap(); //dataMap取得
	riddenByEntity = entity.field_70153_n;

    //誰か乗っているとき
    if (riddenByEntity === NGTUtil.getClientPlayer()) {
		dataMap.setBoolean('isPushHorn', Keyboard.isKeyDown(Keyboard.KEY_P), 1);
		
    } else if (riddenByEntity == null) {
        //誰も乗っていないとき
        dataMap.setBoolean('isPushHorn', false, 1);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ドアの開閉を判定し、doorOpnSecで指定された秒数内にdoorOpnSpdにて指定されたステップの順にドアを移動します
//うまくやれば、何か物を動かしたいときに流用できます

function updateDoors(entity) {
	if (entityID == -1) return;
	var movingTick = getArrayFromData(entityID << doorMovingTickID, 2);
	var updated = false;
	for (var i = 0; i <= 1; i++) {
		var b0 = doorStateInTrain == 3 ? true : (i == 0 ? doorStateInTrain == 2 : doorStateInTrain == 1);
		var b1 = doorStateInTrain == 0 ? true : (i == 0 ? doorStateInTrain == 1 : doorStateInTrain == 2);
		if (b0 && doorState[i] == 0) {
			doorState[i] = 1;
		}
		if (b1 && doorState[i] == 2) {
			doorState[i] = 3;
		}

		//doorState[i]が1(ドアを開けてる途中)の場合doorOpnSpdを、doorState[i]が3(ドアを閉めてる途中)の場合doorClsSpdをspdに代入します。
		//どちらでもない場合 は、if(spd != -1)ブロック内のドアを移動する処理をスキップするため-1を代入します。
		var spd = doorState[i] == 1 ? doorOpnSpd : (doorState[i] == 3 ? doorClsSpd : -1);
		if (spd != -1) {
			var altick = 0;
			for (var j = 0; j < spd.length; j++) {
				if (movingTick[i] == 0) {
					var doorTargetMovement = getArrayFromData(entityID << doorTargetMovementID, 2);
					var almove = 0;
					for (var l = 0; l < spd.length; l++) {
						almove += spd[l][1];
					}
					doorTargetMovement[i] = doorMovement[i] + almove;
					renderer.setData(entityID << doorTargetMovementID, doorTargetMovement);
				}

				var opnSpeed = spd[j][0];
				var movement = spd[j][1];
				//20 ticks per second
				//20tick毎秒
				if (movingTick[i] <= (altick + (opnSpeed * 20))) {
					if (!shouldUpdate) break;

					doorMovement[i] += movement / opnSpeed / 20.0;

					var sec = doorState[i] == 1 ? doorOpnSec : doorClsSec;
					if (movingTick[i] == (sec * 20) - 1) {
						doorState[i] = (doorState[i] + 1) % 4;
						movingTick[i] = 0;
						var doorTargetMovement = renderer.getData(entityID << doorTargetMovementID);
						doorMovement[i] = doorTargetMovement[i];
					} else {
						movingTick[i]++;
					}
					updated = true;
					break;
				} else {
					altick += (opnSpeed * 20);
				}
			}
		}
	}

	if (updated) {
		renderer.setData(entityID << doorMovementID, doorMovement);
		renderer.setData(entityID << doorMovingTickID, movingTick);
		renderer.setData(entityID << doorStateID, doorState);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderDoor_i(entity) {

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorMovement[0]);
	doorLFi.render(renderer);
	GL11.glTranslatef(0, 0, -(doorMovement[0] * 2));
	doorLBi.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorMovement[1]);
	doorRFi.render(renderer);
	GL11.glTranslatef(0, 0, -(doorMovement[1] * 2));
	doorRBi.render(renderer);
	GL11.glPopMatrix();

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderDoor_o(entity) {

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorMovement[0]);
	doorLFo.render(renderer);
	GL11.glTranslatef(0, 0, -(doorMovement[0] * 2));
	doorLBo.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorMovement[1]);
	doorRFo.render(renderer);
	GL11.glTranslatef(0, 0, -(doorMovement[1] * 2));
	doorRBo.render(renderer);
	GL11.glPopMatrix();

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderDoorLamp(entity) {

	if (entity == null) return;

	var random = String(Math.abs(xorshift(entity.func_145782_y()))).substr(0, 3) / 10000;

	if (entity.doorMoveL / 60 > random) {
		doorLampL_ON.render(renderer);
	} else if (entity.doorMoveL / 60 < random) {
		doorLampL_OFF.render(renderer);
	}

	if (entity.doorMoveR / 60 > random) {
		doorLampR_ON.render(renderer);
	} else if (entity.doorMoveR / 60 < random) {
		doorLampR_OFF.render(renderer);
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderController(entity, onUpdateTick) {

	var dataMap = entity.getResourceState().getDataMap(); //dataMap取得
	var notch = entity.getNotch(); //ノッチ取得
	var direction = entity.getTrainStateData(10); //レバーサ取得
	var isControlCar = entity.isControlCar();

	roMc = dataMap.getDouble("roMcData"); //データ保持
	roBr = dataMap.getDouble("roBrData"); //
	roRev = dataMap.getDouble("roRevData"); //

	var mcAngle = 16.0; //マスコン動作角
	var brAngle = 15.0; //ブレーキ動作角 0°から20°
	var revAngle = 40.0; //レバーサ動作角

	if (onUpdateTick) {

		//-----------------------------------------------------------------------

		//マスコン
		if (notch >= 0) { //ノッチが0以上なら
			var roMcAngle = notch * -mcAngle; //マスコン動作角 =ノッチ x -20°
		} else {
			var roMcAngle = 0; //ブレーキ動作角 = 0
		}

		//動作補間
		if (roMc > roMcAngle) {
			roMc = roMc - (mcAngle / 2);
		} else if (roMc < roMcAngle) {
			roMc = roMc + (mcAngle / 2);
		}

		//-----------------------------------------------------------------------

		//ブレーキ
		if (notch <= 0) { //ノッチが0以下なら
			var roBrAngle = notch * -brAngle; //マスコン動作角 =ノッチ x -13°
		} else {
			var roBrAngle = 0; //ブレーキ動作角 = 0
		}

		//動作補間
		if (roBr > roBrAngle) {
			roBr = roBr - (brAngle / 2);
		} else if (roBr < roBrAngle) {
			roBr = roBr + (brAngle / 2);
		}

		//-----------------------------------------------------------------------

		//レバーサ
		if(direction == 0) {
			var roRevAngle = revAngle;
		} else if(direction == 1) {
			var roRevAngle = 0;
		} else if(direction == 2) {
			var roRevAngle = -revAngle;
		}

		//動作補間
		if (roRev > roRevAngle) {
			roRev = roRev - (revAngle / 2);
		} else if (roRev < roRevAngle) {
			roRev = roRev + (revAngle / 2);
		}

		//-----------------------------------------------------------------------

	}

	dataMap.setDouble("roMcData", roMc, false); //データ保持
	dataMap.setDouble("roBrData", roBr, false); //
	dataMap.setDouble("roRevData", roRev, false); //


		//マスコン
	GL11.glPushMatrix();
	renderer.rotate(roMc, 'X', 0.0, 0.8499, 9.196); //回転軸
	mcH.render(renderer);
	GL11.glPopMatrix();


	if(isControlCar) {
		//ブレーキ
		GL11.glPushMatrix();
		renderer.rotate(roBr, 'Y', 0.3651, 0.0, 9.2528); //回転軸
		brH.render(renderer);
		GL11.glPopMatrix();
	}

	//レバーサ
	GL11.glPushMatrix();
	renderer.rotate(roRev, 'X', 0.0000, 0.8993, 9.3183); //回転軸
	revH.render(renderer);
	GL11.glPopMatrix();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderCab(entity, onUpdateTick) {

	var dataMap = entity.getResourceState().getDataMap();
	var isControlCar = entity.isControlCar();
	var interiorLightState = entity.getTrainStateData(11);
	var pantaState = entity.getTrainStateData(6);
	var speed = entity.getSpeed() * 72;

	//回転軸計算
	var vecY = createVector3f(0.776, 1.0136, 9.4613, 0.776, 1.1342, 9.4913); //メーター右下のxyz座標, 右上のxyz座標
	var vecZ = createVector3f(0.776, 1.0136, 9.4613, 0.8967, 1.0136, 9.4613); //メーター右下のxyz座標, 左下のxyz座標
	var axisVec = Vector3f.cross(vecY, vecZ, null).normalise(null);

	var roSp = 0 + 241.8 / 120 * speed;
	//回転変数 = 初期位置から目盛り0kmの位置までの角度 + 0kmから目盛り最大までの角度 / 目盛り最大の速度 * speed

	if(pantaState == 1) {
		setVoltage = 188;
	} else {
		setVoltage = 0;
	}

	var roVlt = dataMap.getDouble("roVlt");

	if(onUpdateTick) {

		if(roVlt < setVoltage) {
			roVlt = roVlt++;
		// } else if(roVlt == setVoltage) {
		// 	roVlt = setVoltage;
		} else if(roVlt > setVoltage) {
			roVlt = roVlt--;
		}

	}

	dataMap.setDouble("roVlt", roVlt, false);

	if (!isControlCar && interiorLightState > 0) { //室内灯がONである場合
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0); //室内灯モードを有効にする
			GLHelper.setLightmapMaxBrightness();
	}

	//速度計
	renderRotatePartFromPos(needleSpd, -roSp, 0.8363, 1.0739, 9.4778, axisVec.getX(), axisVec.getY(), axisVec.getZ());
	//(オブジェクト, 回転変数, 座標x, 座標y, 座標z, axisVec.getX(), axisVec.getY(), axisVec.getZ())

	//電圧計
	renderRotatePartFromPos(needlekV, -roVlt, 0.3787, 1.0739, 9.4778, axisVec.getX(), axisVec.getY(), axisVec.getZ());

	//警笛ペダル
	if (Keyboard.isKeyDown(Keyboard.KEY_P)) {
		hornPedalON.render(renderer);
	} else {
		hornPedalOFF.render(renderer);
	}

	cab_body.render(renderer); //←逆転ハンドルが前以外の場合に発光させるオブジェクトを指定
	renderController(entity, onUpdateTick);
	renderATS(entity);

	if (interiorLightState > 0 && !isControlCar) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0); //室内灯モードを無効にする
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderBodyGlass(entity, pass) {

	var interiorLightState = entity.getTrainStateData(11);

	if(pass == 1 && interiorLightState > 0) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0); //室内灯モードを有効にする
		GLHelper.setLightmapMaxBrightness();
	}

	bodyGlass.render(renderer);

	if(pass == 1 && interiorLightState > 0) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0); //室内灯モードを無効にする
	}

	cabGlass.render(renderer);

	if(pass == 1 && interiorLightState > 0) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);//室内灯モードを無効にする
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderCabGlass(entity, pass) {

	var isControlCar = entity.isControlCar();
	var interiorLightState = entity.getTrainStateData(11);

	if(!isControlCar) {
		if(pass >= 2 && interiorLightState > 0) {
			NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0); //室内灯モードを有効にする
			GLHelper.setLightmapMaxBrightness();
		}

		cabGlass.render(renderer);

		if(pass >= 2 && interiorLightState > 0) {
			NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);//室内灯モードを無効にする
		}
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderInterior(entity) {

	var interiorLightState = entity.getTrainStateData(11);

	if (interiorLightState > 0) { //室内灯がONである場合
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0); //室内灯モードを有効にする
		GLHelper.setLightmapMaxBrightness();
	}

	GL11.glPushMatrix();

	interior.render(renderer); //発光させるオブジェクトを指定(関数も可)
	renderDoor_i(entity);

	if (interiorLightState > 0) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0); //室内灯モードを無効にする
	}

	GL11.glPopMatrix();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderBogie(entity) {

	var roWh = renderer.getWheelRotationR(entity);
	var trainYaw = entity.field_70177_z;
	var trainPitch = entity.field_70125_A;
	var entityBogieF = entity.getBogie(0);
	var entityBogieB = entity.getBogie(1);

	if (!entityBogieF || !entityBogieB) return;

	var bogieYawF = (trainYaw - entityBogieF.field_70177_z) * -1;
	var bogieYawB = (trainYaw - entityBogieB.field_70177_z) * -1 - 180;
	var bogiePitchF = trainPitch - entityBogieF.field_70125_A;
	var bogiePitchB = trainPitch - entityBogieB.field_70125_A * -1;

	var bogiePosZ = [6.5, -6.5]; //Z軸前からbogiePosZ[0],[1]
	var wheelPosY = -0.527; //車輪回転軸Y
	var wheelPosZ = [7.55, 5.45, -5.45, -7.55]; //Z軸前からwheelPosZ[0],[1],[2],[3]

	//前台車
	GL11.glPushMatrix();
	renderer.rotate(bogieYawF, 'Y', 0.0, 0.0, bogiePosZ[0]);
	renderer.rotate(bogiePitchF, 'X', 0.0, 0.0, bogiePosZ[0]);
	bogieF.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(roWh, 'X', 0.0, wheelPosY, wheelPosZ[0]);
	wheelF1.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(roWh, 'X', 0.0, wheelPosY, wheelPosZ[1]);
	wheelF2.render(renderer);
	GL11.glPopMatrix();
	GL11.glPopMatrix();

	//後台車
	GL11.glPushMatrix();
	renderer.rotate(bogieYawB, 'Y', 0.0, 0.0, bogiePosZ[1]);
	renderer.rotate(bogiePitchB, 'X', 0.0, 0.0, bogiePosZ[1]);
	bogieB.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(roWh, 'X', 0.0, wheelPosY, wheelPosZ[2]);
	wheelB1.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(roWh, 'X', 0.0, wheelPosY, wheelPosZ[3]);
	wheelB2.render(renderer);
	GL11.glPopMatrix();
	GL11.glPopMatrix();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderOtherParts(entity) {

	var trainDir = entity.getTrainStateData(0);
	var pantaState = entity.getTrainStateData(6);
	var doorClsL = entity.doorMoveL / 60;
	var doorClsR = entity.doorMoveR / 60;

	//前照灯
	if (trainDir == 0) { //進行
		GL11.glPushMatrix();
		headlighton.render(renderer);
		taillightoff.render(renderer);
		GL11.glPopMatrix();
	} else { //後退
		GL11.glPushMatrix();
		headlightoff.render(renderer);
		taillighton.render(renderer);
		GL11.glPopMatrix();
	}

	//運転台戸閉め灯
	if(doorClsL > 0 || doorClsR > 0) { //右か左どちらかのドアが開いているとき
		cabDoorLampOFF.render(renderer);
	} else { //どちらも閉じているとき
		cabDoorLampON.render(renderer);
	}

	//パンタグラフ
	if(pantaState == 0) {
		pantaDawn.render(renderer);
	} else {
		pantaUp.render(renderer);
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function render(entity, pass, par3) {

	//-----------------------------------------------------------------------------------

	if (entity == null) {

		renderPreview(pass);
		return;

	}

	//-----------------------------------------------------------------------------------

	var onUpdateTick = false;

	if (pass == 0) onUpdateTick = updateTick(entity);

	//-----------------------------------------------------------------------------------

	GL11.glPushMatrix();

	if (entity == null) {
		entityID = -1;
	} else {
		entityID = entity.func_145782_y();

		var prevTick = renderer.getData(entityID << prevTickID);
		var currentTick = renderer.getTick(entity);
		shouldUpdate = ((prevTick != currentTick) && (pass == 0));

		if (shouldUpdate) renderer.setData(entityID << prevTickID, currentTick);

		doorState = getArrayFromData(entityID << doorStateID, 2);
		doorMovement = getArrayFromData(entityID << doorMovementID, 2);
		doorStateInTrain = entity.getTrainStateData(4);

		updateDoors(entity);

	}

	//-----------------------------------------------------------------------------------

	if (pass >= 0) {

		body1.render(renderer);
		body2.render(renderer);
		body3.render(renderer);

		longATSAlert(entity, pass);
		kitadenATS(entity);
		
		renderBogie(entity);
		renderOtherParts(entity);
		sendHornKey(entity);

		renderDoor_o(entity);
		renderDoorLamp(entity);
		renderCab(entity, onUpdateTick);
		renderCabGlass(entity, pass);

	}

	//-----------------------------------------------------------------------------------

	if (pass >= 2) {
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0);
		GL11.glEnable(GL11.GL_BLEND);
		GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
		GL11.glColor4f(1.0, 1.0, 1.0, 1.0);
		GLHelper.setLightmapMaxBrightness();
	}

	renderInterior(entity);
	renderBodyGlass(entity, pass);
	
	if (pass >= 2) {
		GL11.glDisable(GL11.GL_BLEND);
		GL11.glEnable(GL11.GL_ALPHA_TEST);
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);
	}

	//-----------------------------------------------------------------------------------

	GL11.glPopMatrix();

}
//test