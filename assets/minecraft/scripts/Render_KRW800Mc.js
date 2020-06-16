
//Render_KRW800Mc.js  by unlock [ Mpc, Tc共用 ]

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
importPackage(Packages.jp.kaiz.atsassistmod.api); //ControlTrain renderATSHelper
importPackage(Packages.net.minecraft.util); //ResourceLocation
importPackage(Packages.jp.ngt.rtm.sound); //MovingSoundTileEntity

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//###################################################################

//doorOpn(Cls)Sec：ドアを開く(閉じる)のに必要な秒数
//doorOpn(Cls)Spd：ドアを開く(閉じる)ときの手順
//[秒数,動かす距離(ﾒｰﾄﾙ基準(ﾒﾀｾｺ上の数値/100))]

var doorOpnSec = 2.3;
var doorOpnSpd = [[0.04,0.0], [0.18,0.05], [1.68,0.52], [0.12,0.02], [0.22,0.06], [0.06,0.0]];

var doorClsSec = 3.1;
var doorClsSpd = [[0.045,0.0], [0.15,-0.05], [2.165,-0.55], [0.31,-0.01], [0.34,-0.04], [0.09,0.0]];

//駆動距離：[ 0.65(65) ]
//使用音声：[  ]

//###################################################################

var entityID = 0;
var prevTickID = 0;

var doorMovementID = 1;
var doorStateID = 2;
var doorMovingTickID = 3;
var doorTargetMovementID = 4;

var doorMovement;

var doorState;

var doorStateInTrain;

var shouldUpdate;

var roMc;
var roMcAngle;

var roRev;
var roRevAngle;

var soundPlayingList = {};
var soundList = {};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MhnConfig(par1) { //コンフィグ

	var Mc = {},
		Rev = {},
		bogie = {},
		panta = {},
		r;

//###################################################################

	Mc.Angle = 9; //マスコン回転角度の絶対値

	Rev.Angle = 35; //レバーサ回転角度の絶対値

	Mc.PosX = 0.8316; //マスコンの回転軸X座標(ﾒｰﾄﾙ単位)
	Mc.PosY = 0.8000; //Y
	Mc.PosZ = 9.0400; //Z
	
	Rev.PosX = 0.5657; //レバーサの回転軸X座標(ﾒｰﾄﾙ単位)
	Rev.PosY = 0.8400; //Y
	Rev.PosZ = 9.1660; //Z

	bogie.bd = 6.50; //台車間距離(台車は前後対称位置とする)
	bogie.wd = 1.05; //台車軸距÷2
	bogie.wy = -0.527; //車輪軸Y座標

	panta.ro1 = 33; //パンタ動作角1
	panta.ro2 = 63; //パンタ動作角2

//###################################################################

	switch(par1) {
		case "McAngle" : r = Mc.Angle; break;
		case "RevAngle" : r = Rev.Angle; break;
		case "McPosX" : r = Mc.PosX; break;
		case "McPosY" : r = Mc.PosY; break;
		case "McPosZ" : r = Mc.PosZ; break;
		case "RevPosX" : r = Rev.PosX; break;
		case "RevPosY" : r = Rev.PosY; break;
		case "RevPosZ" : r = Rev.PosZ; break;
		case "bogieBd0" : r = bogie.bd; break;
		case "bogieWd0" : r = bogie.wd; break;
		case "bogieWy0" : r = bogie.wy; break;
		case "pantaRo1" : r = panta.ro1; break;
		case "pantaRo2" : r = panta.ro2; break;
	}

	return(r);

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init(par1, par2) {

	//前面 外装
	body1 = renderer.registerParts(new Parts("前面", "前面2", "前面3", "前面ステップ", "前面窓", "尾灯枠", "手すり", "前照灯", "飾り帯", "前面窓柱", "前面窓Hゴム"));

	//外装
	body2 = renderer.registerParts(new Parts("側面", "乗務員扉外", "雨樋", "戸袋窓", "戸袋窓部シャドウ処理", "側面Hゴム", "間外", "窓枠外",
						 "側面窓外", "ドア下", "屋根", "冷房", "貫通扉外", "幌", "渡り板", "床", "TSUMA", "obj6", "obj8"));

	//前面 内装 (運転室)
	cab_body = renderer.registerParts(new Parts("乗務員扉内"));

	//内装
	interior = renderer.registerParts(new Parts("間", "窓枠内", "側面窓内", "内側", "広告枠", "座席", "ポール",
						    "仕切り客室側", "妻面内側", "貫通扉内", "天井", "床", "妻面", "obj4", "obj5"));

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

	//仮
	MC = renderer.registerParts(new Parts("うんげ"));
	Rev = renderer.registerParts(new Parts("ちんげ"));

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MhnTS(entity, par1) {

	var r;

	if(entity != null) {

		switch(par1) {
			case "dclampMoveL" : r = entity.doorMoveL / 60; break;
			case "dclampMoveR" : r = entity.doorMoveR / 60; break;
			case "speed" : r = entity.getSpeed() * 72.0; break;
			case "notch" : r = entity.getNotch(); break;
			case "trainDir" : r = entity.getTrainStateData(0); break;
			case "doorState" : r = entity.getTrainStateData(4); break;
			case "lightState" : r = entity.getTrainStateData(5); break;
			case "rollsign" : r = entity.getTrainStateData(8); break;
			case "direction" : r = entity.getTrainStateData(10); break;
			case "indoorlight" : r = entity.getTrainStateData(11); break;
			case "isControlCar" : r = entity.isControlCar(); break;
			case "getSignal" : r = entity.getSignal(); break;
			case "entityID" : r = entity.func_145782_y(); break;
			case "tick" : r = renderer.getTick(entity); break;
			case 'dataMap': r = entity.getResourceState().getDataMap(); break;
		}
	}

	return r;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MhnIDS(par1) {

	var r;

	switch(par1){
		case "tickID" : r = 5; break;
		case "roMcID" : r = 6; break;
		case "roRevID" : r = 7; break;
	}

	return r;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function detectTick(entity) {

	var entityID = MhnTS(entity, "entityID");
	var tick = MhnTS(entity, "tick");

	var prevTick = renderer.getData(entityID << MhnIDS("tickID"));

	renderer.setData(entityID << MhnIDS("tickID"), tick);

	if(tick != prevTick) return true;
	return false;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderController(entity, onUpdateTick) {

	var entityID = MhnTS(entity, "entityID");
	var notch = MhnTS(entity, "notch");
	var direction = MhnTS(entity, "direction");

	var McAngle = MhnConfig("McAngle");

	var RevAngle = MhnConfig("RevAngle");

	var McPosX = MhnConfig("McPosX");
	var McPosY = MhnConfig("McPosY");
	var McPosZ = MhnConfig("McPosZ");

	var RevPosX = MhnConfig("RevPosX");
	var RevPosY = MhnConfig("RevPosY");
	var RevPosZ = MhnConfig("RevPosZ");

	roMc = renderer.getData(entityID << MhnIDS("roMcID"));//データ保持↓↓↓
	roRev = renderer.getData(entityID << MhnIDS("roRevID"));

	if(onUpdateTick == true) {

		//マスコン可動
		if(notch >= 0) {
			roMcAngle = notch * -McAngle;
		} else {
			roMcAngle = notch * -McAngle;
		}

		//マスコン動作補間 (ｸﾞﾛｰﾊﾞﾙ変数で宣言する必要あり)
		if(roMc > roMcAngle) {
			roMc = roMc - (McAngle / 2);
		} else if(roMc < roMcAngle) {
			roMc = roMc + (McAngle / 2);
		}

		//レバーサ可動
		if(direction == 0) {
			roRevAngle = RevAngle;
		} else if(direction == 1) {
			roRevAngle = 0;
		} else if(direction == 2) {
			roRevAngle = -RevAngle;
		}

		//レバーサ動作補間 (ｸﾞﾛｰﾊﾞﾙ変数で宣言する必要あり)
		if(roRev > roRevAngle) {
			roRev = roRev - (RevAngle / 2);
		} else if(roRev < roRevAngle) {
			roRev = roRev + (RevAngle / 2);
		}

	}

	renderer.setData(entityID << MhnIDS("roMcID"), roMc);
	renderer.setData(entityID << MhnIDS("roRevID"), roRev);//データ保持↑↑↑

	//マスコン
	GL11.glPushMatrix();
	renderer.rotate(roMc, "X", McPosX, McPosY, McPosZ);
	MC.render(renderer);
	GL11.glPopMatrix();

	//レバーサ
	GL11.glPushMatrix();
	renderer.rotate(roRev, "X", RevPosX, RevPosY, RevPosZ);
	Rev.render(renderer);
	GL11.glPopMatrix();

	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderBogie(entity) { //台車

	if(!entity) {} else {
		if(entity != null) {
			try {

				var bd0 = MhnConfig("bogieBd0"),
					wd0 = MhnConfig("bogieWd0"),
					wy0 = MhnConfig("bogieWy0");

				var f0 = 0.0,
					bodyYaw = 0.0,
					bogieFYaw = 0.0,
					bogieBYaw = 0.0,
					bodyPitch = 0.0,
					bogieFPitch = 0.0,
					bogieBPitch = 0.0,
					slideX = 0.0,
					slideY = 0.0;

				var f0 = renderer.getWheelRotationR(entity);
				var bodyYaw = entity.field_70177_z;

				//前台車ヨーローカル角
				var i = entity.getBogie(0).field_70177_z - bodyYaw;
				if(i > 180) {
					bogieFYaw = i - 360;
				} else if(i < -180) {
					bogieFYaw = i + 360;
				} else {
					bogieFYaw = i;
				}

				//後台車ヨーローカル角
				var i = entity.getBogie(1).field_70177_z - bodyYaw - 180;
				if(i > 180) {
					bogieBYaw = i - 360;
				} else if(i < -180) {
					bogieBYaw = i + 360;
				} else {
					bogieBYaw = i;
				}

				//ピッチローカル角
				bodyPitch = entity.field_70125_A;
				bogieFPitch = entity.getBogie(0).field_70125_A * -1 + bodyPitch;
				bogieBPitch = entity.getBogie(1).field_70125_A + bodyPitch;

			} catch(error) {}
		}
	}

	//前台車
	GL11.glPushMatrix();
	renderer.rotate(bogieFYaw, "Y", 0.0, 0.0, bd0);
	renderer.rotate(bogieFPitch, "X", 0.0, 0.0, bd0);
	bogieF.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(f0, "X", 0.0, wy0, bd0 + wd0);
	wheelF1.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(f0, "X", 0.0, wy0, bd0 - wd0);
	wheelF2.render(renderer);
	GL11.glPopMatrix();
	GL11.glPopMatrix();

	//後台車
	GL11.glPushMatrix();
	renderer.rotate(bogieBYaw, "Y", 0.0, 0.0, -bd0);
	renderer.rotate(bogieBPitch, "X", 0.0, 0.0, -bd0);
	bogieB.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(f0, "X", 0.0, wy0, -bd0 + wd0);
	wheelB1.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(f0, "X", 0.0, wy0, -bd0 - wd0);
	wheelB2.render(renderer);
	GL11.glPopMatrix();
	GL11.glPopMatrix();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderInterior(entity, pass, onUpdateTick) {

	var isControlCar = MhnTS(entity, "isControlCar");
	var interiorLightState = entity == null ? 1 : MhnTS(entity, "indoorlight");

	if(interiorLightState > 0) { //室内灯がONである場合

		//室内灯モードを有効にする
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0);
	      //NGTUtilClient.getMinecraft().field_71460_t.func_175072_h(); //1.10.2
	}

	GL11.glPushMatrix();

	interior.render(renderer); //発光させるオブジェクトを指定(関数も可)
	renderDoors(1);

	if(interiorLightState > 0) {

		if(!isControlCar) { //ControlCarではない(GUIの逆転ハンドルが前以外である)場合

			//室内灯モードを有効にする
			NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0);
		      //NGTUtilClient.getMinecraft().field_71460_t.func_175072_h(); //1.10.2

		} else {

			//室内灯モードを無効にする
			NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);
		      //NGTUtilClient.getMinecraft().field_71460_t.func_180436_i(); //1.10.2
		}
	}

	cab_body.render(renderer); //←逆転ハンドルが前以外の場合に発光させるオブジェクトを指定
	renderController(entity, onUpdateTick);

	if(interiorLightState > 0 && !isControlCar) {

		//室内灯モードを無効にする
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);
	      //NGTUtilClient.getMinecraft().field_71460_t.func_180436_i(); //1.10.2
	}

	GL11.glPopMatrix();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ドアの開閉を判定し、doorOpnSecで指定された秒数内にdoorOpnSpdにて指定されたステップの順にドアを移動します
//うまくやれば、何か物を動かしたいときに流用できます
function updateDoors(entity)
{
	if(entityID == -1) return;
	var movingTick = getArrayFromData(entityID << doorMovingTickID, 2);
	var updated = false;
	for(var i = 0; i <= 1; i++)
	{
		var b0 = doorStateInTrain == 3 ? true : (i == 0 ? doorStateInTrain == 2 : doorStateInTrain == 1);
		var b1 = doorStateInTrain == 0 ? true : (i == 0 ? doorStateInTrain == 1 : doorStateInTrain == 2);
		if(b0 && doorState[i] == 0)
		{
			doorState[i] = 1;
		}
		if(b1 && doorState[i] == 2)
		{
			doorState[i] = 3;
		}

		//doorState[i]が1(ドアを開けてる途中)の場合doorOpnSpdを、doorState[i]が3(ドアを閉めてる途中)の場合doorClsSpdをspdに代入します。
		//どちらでもない場合 は、if(spd != -1)ブロック内のドアを移動する処理をスキップするため-1を代入します。
		var spd = doorState[i] == 1 ? doorOpnSpd : (doorState[i] == 3 ? doorClsSpd : -1);
		if(spd != -1)
		{
			var altick = 0;
			for(var j = 0; j < spd.length; j++)
			{
				if(movingTick[i] == 0)
				{
					var doorTargetMovement = getArrayFromData(entityID << doorTargetMovementID, 2);
					var almove = 0;
					for(var l = 0; l < spd.length; l++)
					{
						almove += spd[l][1];
					}
					doorTargetMovement[i] = doorMovement[i] + almove;
					renderer.setData(entityID << doorTargetMovementID, doorTargetMovement);
				}

				var opnSpeed = spd[j][0];
				var movement = spd[j][1];
				//20 ticks per second
				//20tick毎秒
				if(movingTick[i] <= (altick + (opnSpeed * 20)))
				{
					if(!shouldUpdate) break;

					doorMovement[i] += movement / opnSpeed / 20.0;

					var sec = doorState[i] == 1 ? doorOpnSec : doorClsSec;
					if(movingTick[i] == (sec * 20)-1)
					{
						doorState[i] = (doorState[i] + 1) % 4;
						movingTick[i] = 0;
						var doorTargetMovement = renderer.getData(entityID << doorTargetMovementID);
						doorMovement[i] = doorTargetMovement[i];
					}
					else
					{
						movingTick[i]++;
					}
					updated = true;
					break;
				}
				else
				{
					altick += (opnSpeed * 20);
				}
			}
		}
	}

	if(updated)
	{
		renderer.setData(entityID << doorMovementID, doorMovement);
		renderer.setData(entityID << doorMovingTickID, movingTick);
		renderer.setData(entityID << doorStateID, doorState);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderDoors(io) {

	if(entityID == -1) {

		doorLFi.render(renderer);
		doorLBi.render(renderer);
		doorRFi.render(renderer);
		doorRBi.render(renderer);
		doorLFo.render(renderer);
		doorLBo.render(renderer);
		doorRFo.render(renderer);
		doorRBo.render(renderer);

	} else {

		if(io == 1) {

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

		} else {

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
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var HashMap = Java.type("java.util.HashMap");
var isBreaking = new HashMap();

function renderATS(entity, pass) {

	if(entity == null) return;

	//ATS.render(renderer);//筐体

	var dataMap = MhnTS(entity, 'dataMap');
	var Signal = MhnTS(entity, "getSignal");
	var isControlCar = MhnTS(entity, "isControlCar");
	var ATSspeed = Math.floor(MhnTS(entity, "speed"));

	if(!isControlCar) return;

	function renderATSHelper(int) {

		if(ATSspeed > (int + 15)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-8);
			isBreaking.put(entity, true);

		} else if(ATSspeed > (int + 10)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-7);
			isBreaking.put(entity, true);

		} else if(ATSspeed > (int + 5)) {

			//ATS_Emr.render(renderer);

			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', true, 1);

			ControlTrain.setNotch(-4);
			isBreaking.put(entity, true);

		} else if(ATSspeed > (int + 1)) {

			//ATS_Arr.render(renderer);

			dataMap.setBoolean('isOver5', true, 1);
			dataMap.setBoolean('isOver10', false, 1);

			if(isBreaking.get(entity)) {
				ControlTrain.setNotch(0);
				isBreaking.put(entity, false);
			}

		} else {
			dataMap.setBoolean('isOver5', false, 1);
			dataMap.setBoolean('isOver10', false, 1);

			if(isBreaking.get(entity)) {
				ControlTrain.setNotch(0);
				isBreaking.put(entity, false);
			}
		}
	}

	switch(Signal) {
		case 10:renderATSHelper(810);
			dataMap.setInt('atsCount', Signal, 10);
			break;

		case 11:renderATSHelper(15);
			dataMap.setInt('atsCount', Signal, 11);
			break;

		case 12:renderATSHelper(25);
			dataMap.setInt('atsCount', Signal, 12);
			break;

		case 13:renderATSHelper(30);
			dataMap.setInt('atsCount', Signal, 13);
			break;

		case 14:renderATSHelper(45);
			dataMap.setInt('atsCount', Signal, 14);
			break;

		case 15:renderATSHelper(65);
			dataMap.setInt('atsCount', Signal, 15);
			break;

		case 16:renderATSHelper(90);
			dataMap.setInt('atsCount', Signal, 16);
			break;

		case 17:renderATSHelper(100);
			dataMap.setInt('atsCount', Signal, 17);
			break;

		case 18:renderATSHelper(110);
			dataMap.setInt('atsCount', Signal, 18);
			break;

		case 19:renderATSHelper(120);
			dataMap.setInt('atsCount', Signal, 19);
			break;

		case 20:renderATSHelper(65);
			dataMap.setInt('atsCount', Signal, 20);
			break;

		case 21:renderATSHelper(45);
			dataMap.setInt('atsCount', Signal, 21);
			break;

		default:
			break;

		}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function render(entity, pass, par3) {

	var onUpdateTick = false;

	if(pass == 0) {
	onUpdateTick = detectTick(entity);
	}

	var dclampMoveL = MhnTS(entity, "dclampMoveL");
	var dclampMoveR = MhnTS(entity, "dclampMoveR");
	var isControlCar = MhnTS(entity, "isControlCar");
	var trainDir = MhnTS(entity, "trainDir");

	GL11.glPushMatrix();

	//前照灯
	if(trainDir == 0) { //進行
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

	if(pass == 0 || pass == 1 || pass == 2 || pass == 3 || pass == 4) { 

	body1.render(renderer);
	body2.render(renderer);
	body3.render(renderer);

	renderBogie(entity);
	renderATS(entity, pass);

	}

	//#################################################################################################################################

	if(pass >= 2 || entity == null)
	{
		NGTUtilClient.getMinecraft().field_71460_t.func_78483_a(0.0);
	      //NGTUtilClient.getMinecraft().field_71460_t.func_175072_h(); //1.10.2
		GLHelper.setLightmapMaxBrightness();
	}

	if(entity == null){
		entityID = -1;
	}
	else{
		entityID = MhnTS(entity, "entityID");
		
		//Tickの数値が変化した際、shouldUpdateがtrueになります。
		//shouldUpdateがtrueになるときだけ何らかの物体を移動することにより、移動速度を一定に保ちながら移動することができます。
		//shouldUpdateをグローバル変数として宣言する必要があります。
		var prevTick = renderer.getData(entityID << prevTickID);
		var currentTick = MhnTS(entity, "tick");
		shouldUpdate = ((prevTick != currentTick) && (pass == 0));
		
		if(shouldUpdate) renderer.setData(entityID << prevTickID, currentTick);
		
		//次のようにして変数をEntityごとに宣言することができます。
		//"renderer.getData(entityID << (変数ID))" & "renderer.setData(entityID << (変数ID), (変数のデータ))"
		//(変数のIDをこのファイルの上部で各自宣言しておく必要があります)
		doorState = getArrayFromData(entityID << doorStateID, 2);
		doorMovement = getArrayFromData(entityID << doorMovementID, 2);
		doorStateInTrain = MhnTS(entity, "doorState");
		
		updateDoors(entity);
		
	}

	renderInterior(entity, pass, onUpdateTick);
	renderDoors(0);

	if(pass >= 2 || entity == null)
	{
		NGTUtilClient.getMinecraft().field_71460_t.func_78463_b(0.0);
	      //NGTUtilClient.getMinecraft().field_71460_t.func_180436_i(); //1.10.2
	}

	//#################################################################################################################################

	GL11.glPopMatrix();

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getArrayFromData(ID,amount) {

	var ret = renderer.getData(ID);
	if(ret == 0)
	{
		ret = [];
		for(var i = 0; i < amount; i++)
		{
			ret[ret.length] = 0;
		}
	}
	return ret;
}