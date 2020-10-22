
//Render_KRWED60.js  by unlock [複製/コピペ/転載を禁ずる]

//Don't duplicate or copy.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);

importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.org.lwjgl.input);
importPackage(Packages.org.lwjgl.util.vector);

importPackage(Packages.jp.kaiz.atsassistmod.api);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init(par1, par2) {

	//車体1
	body0 = renderer.registerParts(new Parts("車体", "貫通扉", "乗務員扉"));

	//車体?????
	bodyR0 = renderer.registerParts(new Parts("レインボ車体", "レインボ貫通扉", "レインボ乗務員扉"));

	//車体2
	body1 = renderer.registerParts(new Parts("車番プレート", "貫通扉Hゴム", "貫通扉窓", "前面ステップ", "前照灯", "尾灯", "運転台周り窓", "窓", "手すり", "前面窓Hゴム", "側面窓Hゴム"));

	//屋根
	body2 = renderer.registerParts(new Parts("屋根", "ホイッスル", "タイフォン", "クーラー", "パンタ基台", "屋根上"));

	//底
	body3 = renderer.registerParts(new Parts("底", "床下1", "床下2", "ステップ", "スカート1", "スカート2", "開放テコ", "配管", "配管2", "疑似影"));

	//連結器
	coupler1 = renderer.registerParts(new Parts("自動連結器"));
	coupler2 = renderer.registerParts(new Parts("密着連結器"));

	//内側
	interior = renderer.registerParts(new Parts("内側", "運転台", "メーター", "運転台機器類", "ブレーキ", "マスコン"));

	//車番
	number00 = renderer.registerParts(new Parts("車番00"));
	number10 = renderer.registerParts(new Parts("車番10"));
	number20 = renderer.registerParts(new Parts("車番20"));
	number30 = renderer.registerParts(new Parts("車番30"));
	number40 = renderer.registerParts(new Parts("車番40"));
	number50 = renderer.registerParts(new Parts("車番50"));
	number60 = renderer.registerParts(new Parts("車番60"));
	number70 = renderer.registerParts(new Parts("車番70"));
	number80 = renderer.registerParts(new Parts("車番80"));
	number90 = renderer.registerParts(new Parts("車番90"));

	number0 = renderer.registerParts(new Parts("車番0"));
	number1 = renderer.registerParts(new Parts("車番1"));
	number2 = renderer.registerParts(new Parts("車番2"));
	number3 = renderer.registerParts(new Parts("車番3"));
	number4 = renderer.registerParts(new Parts("車番4"));
	number5 = renderer.registerParts(new Parts("車番5"));
	number6 = renderer.registerParts(new Parts("車番6"));
	number7 = renderer.registerParts(new Parts("車番7"));
	number8 = renderer.registerParts(new Parts("車番8"));
	number9 = renderer.registerParts(new Parts("車番9"));

	//パンタグラフ
	pantaUpF = renderer.registerParts(new Parts("パンタ上昇前"));
	pantaUpB = renderer.registerParts(new Parts("パンタ上昇後"));
	pantaDownF = renderer.registerParts(new Parts("パンタ下降前"));
	pantaDownB = renderer.registerParts(new Parts("パンタ下降後"));

	//マスコン類
	mcHF = renderer.registerParts(new Parts("マスコンハンドル前"));
	mcHB = renderer.registerParts(new Parts("マスコンハンドル後"));
	brHF = renderer.registerParts(new Parts("ブレーキハンドル前"));
	brHB = renderer.registerParts(new Parts("ブレーキハンドル後"));
	revHF = renderer.registerParts(new Parts("レバーサー前"));
	revHB = renderer.registerParts(new Parts("レバーサー後"));

	//メーター類
	needleSpdF = renderer.registerParts(new Parts("速度計針前"));
	needleSpdB = renderer.registerParts(new Parts("速度計針後"));
	needlekPaBF = renderer.registerParts(new Parts("圧力計針黒前"));
	needlekPaBB = renderer.registerParts(new Parts("圧力計針黒後"));
	needlekPaRF = renderer.registerParts(new Parts("圧力計針赤前"));
	needlekPaRB = renderer.registerParts(new Parts("圧力計針赤後"));

	//ATS表示機
	atsPanel = renderer.registerParts(new Parts("ATS筐体", "上", "下"));
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

	//前照灯
	headlightOnF = renderer.registerParts(new Parts("前照灯点前"));
	headlightOnB = renderer.registerParts(new Parts("前照灯点後"));
	headlightOffF = renderer.registerParts(new Parts("前照灯滅前"));
	headlightOffB = renderer.registerParts(new Parts("前照灯滅後"));

	//尾灯
	taillightOnF = renderer.registerParts(new Parts("尾灯点前"));
	taillightOnB = renderer.registerParts(new Parts("尾灯点後"));
	taillightOffF = renderer.registerParts(new Parts("尾灯滅前"));
	taillightOffB = renderer.registerParts(new Parts("尾灯滅後"));
	shuntinglightOnF = renderer.registerParts(new Parts("入換灯点前"));
	shuntinglightOnB = renderer.registerParts(new Parts("入換灯点後"));

	//台車
	bogieF = renderer.registerParts(new Parts("台車F1", "台車F2")); //前台車
	bogieB = renderer.registerParts(new Parts("台車R1", "台車R2")); //後台車
	wheelF1 = renderer.registerParts(new Parts("車輪FF")); //車輪
	wheelF2 = renderer.registerParts(new Parts("車輪FR"));
	wheelB1 = renderer.registerParts(new Parts("車輪RF"));
	wheelB2 = renderer.registerParts(new Parts("車輪RR"));

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderPreview(pass) {

	if (pass <= 1) {
		body0.render(renderer);
		body1.render(renderer);
		body2.render(renderer);
		body3.render(renderer);
		interior.render(renderer);
		pantaUpF.render(renderer);
		pantaUpB.render(renderer);
		atsPanel.render(renderer);
		brHF.render(renderer);
		headlightOffF.render(renderer);
		taillightOffF.render(renderer);
		bogieF.render(renderer);
		bogieB.render(renderer);
		wheelF1.render(renderer);
		wheelF2.render(renderer);
		wheelB1.render(renderer);
		wheelB2.render(renderer);
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateTick(entity, pass) {

	if(entity == null) return false;

	var dataMap = entity.getResourceState().getDataMap();
	var tick = renderer.getTick(entity);
	var matID = renderer.currentMatId;

	var prevTick = dataMap.getInt("prevTick");

	dataMap.setInt("prevTick", tick, false);

	if(tick != prevTick && pass == 0 && matID == 0) return true; //1フレームで一回実行される

	return false;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderRotatePart(part, rotate, x, y, z, vecX, vecY, vecZ) {
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

var HashMap = Java.type("java.util.HashMap");
var isBreaking = new HashMap();

function renderATS(entity) {

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

function　renderRainbow(entity) {

	if(entity == null) return;

	var dataMap = entity.getResourceState().getDataMap();
	var nc10 = dataMap.getInt("Button9");
	var nc01 = dataMap.getInt("Button10");

	if (nc10 == 9 && nc01 == 9) {
		bodyR0.render(renderer);
	}
	else {
		body0.render(renderer);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function renderNumber(entity) {

	if(entity == null) return;

	var dataMap = entity.getResourceState().getDataMap();
	var nc10 = dataMap.getInt("Button9");
	var nc01 = dataMap.getInt("Button10");

	switch (nc10) {
		case 0: number00.render(renderer);
			break;
			
		case 1: number10.render(renderer);
			break;

		case 2: number20.render(renderer);
			break;

		case 3: number30.render(renderer);
			break;
			
		case 4: number40.render(renderer);
			break;

		case 5: number50.render(renderer);
			break;

		case 6: number60.render(renderer);
			break;
			
		case 7: number70.render(renderer);
			break;

		case 8: number80.render(renderer);
			break;

		case 9: number90.render(renderer);
			break;

		default:
			break;
	}

	switch (nc01) {
		case 0: number0.render(renderer);
			break;
			
		case 1: number1.render(renderer);
			break;

		case 2: number2.render(renderer);
			break;

		case 3: number3.render(renderer);
			break;
			
		case 4: number4.render(renderer);
			break;

		case 5: number5.render(renderer);
			break;

		case 6: number6.render(renderer);
			break;
			
		case 7: number7.render(renderer);
			break;

		case 8: number8.render(renderer);
			break;

		case 9: number9.render(renderer);
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

function longATSAlert(entity) {
	
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

function renderController(entity, onUpdateTick) {

	var dataMap = entity.getResourceState().getDataMap(); //dataMap取得
	var notch = entity.getNotch(); //ノッチ取得
	var direction = entity.getTrainStateData(10); //レバーサ取得
	var trainDir = entity.getTrainStateData(0); //車両方向取得
	var isControlCar = entity.isControlCar();

	var roMc = dataMap.getDouble("roMcData"); //データ保持
	var roBr = dataMap.getDouble("roBrData"); //
	var roRev = dataMap.getDouble("roRevData"); //

	var mcAngle = 6.0; //マスコン動作角 14段合計84°
	var mcOffset = -42.0; //マスコンオフセット角
	var brAngle = 10.0; //ブレーキ動作角 8段合計80°
	var revAngle = 30.0; //レバーサ動作角 20°

	//-----------------------------------------------------------------------------------------

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

	//-----------------------------------------------------------------------------------------

	if (trainDir == 0 && isControlCar) {

		//マスコン
		GL11.glPushMatrix();
			renderer.rotate(-roMc + mcOffset, 'Y', 0.3054, 0.0, 6.582); //回転軸
			mcHF.render(renderer);
		GL11.glPopMatrix();

		GL11.glPushMatrix();
			renderer.rotate(mcOffset, 'Y', -0.3054, 0.0, -6.582); //回転軸
			mcHB.render(renderer);
		GL11.glPopMatrix();

		//ブレーキ
		GL11.glPushMatrix();
			renderer.rotate(roBr, 'Y', 1.1856, 0.0, 6.7088); //回転軸
			brHF.render(renderer);
		GL11.glPopMatrix();

		//レバーサ
		GL11.glPushMatrix();
			renderer.rotate(-roRev, 'Y', 0.4091, 0.8993, 6.5744); //回転軸
			revHF.render(renderer);
		GL11.glPopMatrix();

		revHB.render(renderer);

	} else if (trainDir == 1 && isControlCar) {

		//マスコン
		GL11.glPushMatrix();
			renderer.rotate(mcOffset, 'Y', 0.3054, 0.0, 6.582); //回転軸
			mcHF.render(renderer);
		GL11.glPopMatrix();

		GL11.glPushMatrix();
			renderer.rotate(-roMc + mcOffset, 'Y', -0.3054, 0.0, -6.582); //回転軸
			mcHB.render(renderer);
		GL11.glPopMatrix();

		//ブレーキ
		GL11.glPushMatrix();
			renderer.rotate(roBr, 'Y', -1.1856, 0.0, -6.7088); //回転軸
			brHB.render(renderer);
		GL11.glPopMatrix();

		//レバーサ
		revHF.render(renderer);

		GL11.glPushMatrix();
			renderer.rotate(-roRev, 'Y', -0.4091, -0.8993, -6.5744); //回転軸
			revHB.render(renderer);
		GL11.glPopMatrix();

	} else {

		GL11.glPushMatrix();
			renderer.rotate(mcOffset, 'Y', 0.3054, 0.0, 6.582); //回転軸
			mcHF.render(renderer);
		GL11.glPopMatrix();

		GL11.glPushMatrix();
			renderer.rotate(mcOffset, 'Y', -0.3054, 0.0, -6.582); //回転軸
			mcHB.render(renderer);
		GL11.glPopMatrix();

		revHF.render(renderer);

		revHB.render(renderer);

	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderCab(entity) {

	var speed = entity.getSpeed() * 72;
	var bc = entity.brakeCount / 144;
	var mr = entity.brakeAirCount / 2880;

	var roSp = -115 + 230 / 120 * speed; //回転変数 = 初期位置から目盛り0kmの位置までの角度 + 0kmから目盛り最大までの角度 / 目盛り最大の速度 * speed
	var rotateNdlBC = -135 + 80 * bc; //圧力計黒 
	var rotateNdlMR = -135 + 108 * mr; //圧力計赤
	

	//速度計
	GL11.glPushMatrix();
		renderer.rotate(roSp, 'Z', 0.82, 1.485, 0.0);
		needleSpdF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
		renderer.rotate(-roSp, 'Z', -0.82, 1.485, 0.0);
		needleSpdB.render(renderer);
	GL11.glPopMatrix();

	//圧力計黒
	GL11.glPushMatrix();
		renderer.rotate(rotateNdlBC, 'Z', 0.93, 1.485, 0.0);
		needlekPaBF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
		renderer.rotate(-rotateNdlBC, 'Z', -0.93, 1.485, 0.0);
		needlekPaBB.render(renderer);
	GL11.glPopMatrix();

	//圧力計赤
	GL11.glPushMatrix();
		renderer.rotate(rotateNdlMR, 'Z', 0.93, 1.485, 0.0);
		needlekPaRF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
		renderer.rotate(-rotateNdlMR, 'Z', -0.93, 1.485, 0.0);
		needlekPaRB.render(renderer);
	GL11.glPopMatrix();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderWiper(entity){

	//うんこ

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderLight(entity) {

	if(entity == null) return;

	var dataMap = entity.getResourceState().getDataMap();
	var headlightStateF = dataMap.getInt("Button2");
	var taillightStateF = dataMap.getInt("Button3");
	var headlightStateB = dataMap.getInt("Button4");
	var taillightStateB = dataMap.getInt("Button5");

	if(headlightStateF == 0) headlightOnF.render(renderer);
	else headlightOffF.render(renderer);

	if(taillightStateF == 0) {
		taillightOnF.render(renderer);
	} else if(taillightStateF == 1) {
		shuntinglightOnF.render(renderer);
	} else {
		taillightOffF.render(renderer);
	}

	if(headlightStateB == 0) headlightOnB.render(renderer);
	else headlightOffB.render(renderer);
	
	if(taillightStateB == 0) {
		taillightOnB.render(renderer);
	} else if(taillightStateB == 1) {
		shuntinglightOnB.render(renderer);
	} else {
		taillightOffB.render(renderer);
	}
	

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderPantograph(entity) {

	if(entity == null) return;

	var dataMap = entity.getResourceState().getDataMap();
	var pantaState = entity.getTrainStateData(6);
	var pantaStateF = dataMap.getInt("Button6");
	var pantaStateB = dataMap.getInt("Button7");

	if(pantaState == 1 && pantaStateF == 0) pantaUpF.render(renderer);
	else pantaDownF.render(renderer);

	if(pantaState == 1 && pantaStateB == 0) pantaUpB.render(renderer);
	else pantaDownB.render(renderer);

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderCoupler(entity) {

	if(entity == null) return;

	var dataMap = entity.getResourceState().getDataMap();
	var couplerState = dataMap.getInt("Button8");

	if(couplerState == 0) {
		coupler1.render(renderer);
	} else if(couplerState == 1) {
		coupler2.render(renderer);
	}
	else {
		coupler1.render(renderer);
	}
	
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

	var bogiePosZ = [3.9, -3.9]; //Z軸前からbogiePosZ[0],[1]
	var wheelPosY = -0.4509; //車輪回転軸Y
	var wheelPosZ = [5.2, 2.6, -2.6, -5.2]; //Z軸前からwheelPosZ[0],[1],[2],[3]

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

function render(entity, pass, par3) {

	//-----------------------------------------------------------------------------------

	if (entity == null) {

		renderPreview(pass);
		return;

	}

	//-----------------------------------------------------------------------------------

	var onUpdateTick = false;

	onUpdateTick = updateTick(entity, pass);

	//-----------------------------------------------------------------------------------

	GL11.glPushMatrix();

	renderController(entity, onUpdateTick);

	if(pass >= 0) {

		body1.render(renderer);
		body2.render(renderer);
		body3.render(renderer);
		interior.render(renderer);

		atsPanel.render(renderer);

		renderNumber(entity);
		renderRainbow(entity);

		renderATS(entity);
		longATSAlert(entity);
		kitadenATS(entity);

		renderCab(entity);
		renderLight(entity);
		renderPantograph(entity);
		renderCoupler(entity);
		
		renderBogie(entity);
		sendHornKey(entity);

	}

	GL11.glPopMatrix();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

カスタムボタン対照表

Button0：ブロワー
Button1：ワイパー
Button2：1エンド側前照灯
Button3：1エンド側尾灯/入換灯
Button4：2エンド側前照灯
Button5：2エンド側尾灯/入換灯
Button6：1エンド側パンタ操作
Button7：2エンド側パンタ操作
Button8：連結器切り替え
Button9：10の位
Button10：1の位

*/