importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.kaiz.atsassistmod.api);

function onUpdate(su) {

	var entity = su.getEntity();
	var signal = su.getEntity().getSignal();
	var isControlCar = su.getEntity().isControlCar();
	var dataMap = entity.getResourceState().getDataMap();

	if(isControlCar){
		
		var isOver5 = dataMap.getBoolean('isOver5');
		var isOver10 = dataMap.getBoolean('isOver10');
		var isPushHorn = dataMap.getBoolean("isPushHorn");
		//var atsCount = dataMap.getInt('atsCount');
		//var atsWarnOn0 = dataMap.getBoolean('atsWarnOn0');
		//var atsWarnOn1 = dataMap.getBoolean('atsWarnOn1');
	
		//var isTrainProtection = dataMap.getBoolean('isTrainProtection');



		//ATS超過時音声
		if(isOver5){
			su.playSound('sound_krw', 'train.Pattern_Arr', 1, 1);
		}

		else{
			su.stopSound('sound_krw', 'train.Pattern_Arr');
		}

		if(isOver10){
			su.playSound('sound_krw', 'train.Pattern_Emr', 1, 1);
		}

		else{
			su.stopSound('sound_krw', 'train.Pattern_Emr');
		}

		//保安装置未投入音声 未実装
		/*
		if(!isTrainProtection){
			su.playSound('sound_krw', 'train.Pattern_Offing', 1, 1);
		}
		else{
			su.stopSound('sound_krw', 'train.Pattern_Offing');
		}
		
		
		//ATSロング警報
		if(atsWarnOn0){
			su.playSound('sound_krw', 'train.Pattern_Emr2', 1, 1);
		}

	   else{
		   su.stopSound('sound_krw', 'train.Pattern_Emr2');
		}

	   if(atsWarnOn1){
		   su.playSound('sound_krw', 'train.Pattern_ATS', 1, 1);
		}

	   else{
		   su.stopSound('sound_krw', 'train.Pattern_ATS');
		} */


/*		if (atsCount != signal) { //dataMapの削減の為コメントアウト
			if (signal >= 10 && signal <= 21) {
				su.stopSound('sound_krw', 'train.Pattern_Action');
				ControlTrain.logger("PlaySound")
				su.playSound('sound_krw', 'train.Pattern_Action', 1, 1, false);
			}

			dataMap.setInt("atsCount", signal, 1);
		}*/

		if(signal == 10){
			su.playSound('sound_krw', 'train.Pattern_Action10', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action10');
			   }

		if(signal == 11){
			su.playSound('sound_krw', 'train.Pattern_Action11', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action11');
			   }

		if(signal == 12){
			su.playSound('sound_krw', 'train.Pattern_Action12', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action12');
			   }
			   
		if(signal == 13){
			su.playSound('sound_krw', 'train.Pattern_Action13', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action13');
			   }

		if(signal == 14){
			su.playSound('sound_krw', 'train.Pattern_Action14', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action14');
			   }

		if(signal == 15){
			su.playSound('sound_krw', 'train.Pattern_Action15', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action15');
			   }

		if(signal == 16){
			su.playSound('sound_krw', 'train.Pattern_Action16', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action16');
			   }

		if(signal == 17){
			su.playSound('sound_krw', 'train.Pattern_Action17', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action17');
			   }

		if(signal == 18){
			su.playSound('sound_krw', 'train.Pattern_Action18', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action18');
			   }

		if(signal == 19){
			su.playSound('sound_krw', 'train.Pattern_Action19', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action19');
			   }

		if(signal == 20){
			su.playSound('sound_krw', 'train.Pattern_Action20', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action20');
			   }

		if(signal == 21){
			su.playSound('sound_krw', 'train.Pattern_Action21', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action21');
			   }

		if(signal == 22){
			su.playSound('sound_krw', 'train.Pattern_Action22', 1, 1, false);
			   }
			   else{
			su.stopSound('sound_krw', 'train.Pattern_Action22');
			   }


		//ORP音声
		if(signal == 21){
			su.playSound('sound_krw', 'train.ATS_Stopping', 1, 1, false);
		}

		else{
			su.stopSound('sound_krw', 'train.ATS_Stopping');
		}

		if(signal == 21 && speed > 1 && speed < 25){
			su.playSound('sound_krw', 'train.ATS_ORP', 1, 1);
		}

		else{
			su.stopSound('sound_krw', 'train.ATS_ORP');
		}


		//ATS･ATC切り替え音声
		if(signal == 22){
			su.playSound('sound_krw', 'train.Switch_ATS', 1, 1, false);
		}

		else if(signal == 23){
			su.playSound('sound_krw', 'train.Switch_ATC', 1, 1, false);
		}

		else{
			su.stopSound('sound_krw', 'train.Switch_ATS');
			su.stopSound('sound_krw', 'train.Switch_ATC');
		}

		//警笛長押し
		if(isPushHorn){
			su.playSound('sound_krw', 'train.800Horn1', 1, 1, false);
			su.stopSound('sound_krw', 'train.800Horn2');
		}

		else{
			su.stopSound('sound_krw', 'train.800Horn1');
			su.playSound('sound_krw', 'train.800Horn2', 1, 1, false);
		}
	}



//↓コンプレッサー音の指定↓
var CompressorName = "RTMLib.CP.CPloop16";
var CompressorActiveName = "RTMLib.CP.CPstart16";
var CompressorEndName = "RTMLib.CP.CPend16";
//↑コンプレッサー音の指定↑

PlayCompressor(su,CompressorName,CompressorActiveName,CompressorEndName);
var speed = su.getSpeed(),
		notch = su.getNotch();

	if(speed>0.1){
			//Loop
			if(speed>0&&speed<180){
				var pit0 = 1.0,
				    vol0 = 1.0;
				if(speed<0) vol0 = fadeCon(0, 1.0, 0, 1.0, su);
				if(speed>120) vol0 = fadeCon(180, 1.0, 180, 0.0, su);
				su.playSound('sound_mhnlib', 'RTMLib.loop.loop_16', vol0, pit0);
			}
			else{
				su.stopSound('sound_mhnlib', 'RTMLib.loop.loop_16');
			}

			//run5
			if(speed>0&&speed<90){
				var pit5 = fadeCon(0, 0.5, 90, 1.2, su),
						vol5 = 1.0;
				if(speed<12) vol5 = fadeCon(0, 0.0, 12, 1.0, su);
				if(speed>70) vol5 = fadeCon(70, 1.0, 90, 0.0, su);
				su.playSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_2', vol5, pit5);
			}
			else{
				su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_2');
			}

			//run6
			if(speed>70&&speed<160){
				var pit6 = fadeCon(70, 0.7, 160, 1.9, su),
						vol6 = 1.0;
				if(speed<70) vol6 = fadeCon(70, 0.0, 90, 1.0, su);
				su.playSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_3', vol6, pit6);
			}
			else{
				su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_3');
			}

//EBの時音を消す構文
		if(notch == -8){
			su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_2');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_3');
		}

		//Run30km
		if(speed>0.1&&speed<60){
			var pit11 = fadeCon(0, 0.5, 30, 1.0, su),
					vol11 = 1.0;
			if(speed<10) vol11 = fadeCon(0, 0.0, 10, 1.0, su);
			if(speed>40) vol11 = fadeCon(40, 1.0, 60, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2', vol11, pit11);
		}
		else{
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2');

		}

		//Run60km
		if (speed > 40 && speed < 90 && !su.inTunnel()) {
			var pit12 = fadeCon(60, 1.0, 90, 1.5, su),
			    vol12 = 1.0;
			if (speed < 50) vol12 = fadeCon(40, 0.0, 50, 1.0, su);
			if (speed > 70) vol12 = fadeCon(70, 1.0, 90, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2', vol12, pit12);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2');
		}

		//Run60kmT
		if (speed > 40 && speed < 90 && su.inTunnel()) {
			var pit13 = fadeCon(60, 1.0, 90, 1.5, su),
			    vol13 = 1.0;
			if (speed < 50) vol13 = fadeCon(40, 0.0, 50, 1.0, su);
			if (speed > 70) vol13 = fadeCon(70, 1.0, 90, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3', vol13, pit13);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3');
		}

		//Run120km
		if (speed > 70 && speed < 165 && !su.inTunnel()) {
			var pit14 = fadeCon(60, 0.5, 165, 1.6, su),
			    vol14 = 1.0;
			if (speed < 80) vol14 = fadeCon(70, 0.0, 80, 1.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run120km2', vol14, pit14);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120km2');
		}

		//Run120kmT
		if (speed > 70 && speed < 165 && su.inTunnel()) {
			var pit15 = fadeCon(60, 0.5, 165, 1.6, su),
			    vol15 = 1.0;
			if (speed < 80) vol15 = fadeCon(70, 0.0, 80, 1.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run120kmT', vol15, pit15);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120kmT');
		}

	}


	else {	//全ての音を消す構文
		su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.201_Chopper.201_3');
		su.stopSound('sound_krw', 'train.800BcOn');
		su.stopSound('sound_krw', 'train.800BcOff');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120kmT');
	}
}

function PlayCompressor(su, CP, CPA, CPE) {
	if (su.isComplessorActive()) {
		su.playSound('sound_mhnlib', CPA, 0.6, 1, false);
		su.playSound('sound_mhnlib', CP, 0.6, 1);
		su.stopSound('sound_mhnlib', CPE);
	} else {
		su.stopSound('sound_mhnlib', CPA);
		su.stopSound('sound_mhnlib', CP);
		su.playSound('sound_mhnlib', CPE, 0.6, 1, false);
	}
}

//fadeCon(速度A,フェードA,速度B,フェードB,su);
//→速度A=フェードA、速度B=フェードBの直線の方程式に速度を当てた値を返す
//ボリュームやピッチに使用可能

function fadeCon(speed1, fade1, speed2, fade2, su) {
	var speed = su.getSpeed();
	return (((fade2 - fade1) / (speed2 - speed1)) * (speed - speed1)) + fade1;
}