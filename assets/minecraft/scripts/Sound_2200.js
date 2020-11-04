function onUpdate(su) {
	//↓コンプレッサー音の指定↓
	var CompressorName = "RTMLib.CP.CPloop7";
	var CompressorActiveName = "RTMLib.CP.CPstart7";
	var CompressorEndName = "RTMLib.CP.CPend4";
	//↑コンプレッサー音の指定↑
  
	PlayCompressor(su,CompressorName,CompressorActiveName,CompressorEndName);
	var entity = su.getEntity();
	var signal = su.getEntity().getSignal();
	var isControlCar = su.getEntity().isControlCar();
	var dataMap = entity.getResourceState().getDataMap();
	var speed = su.getSpeed();
	var notch = su.getNotch();

	//ショック 力行時
	if (speed > 0 && speed < 90 && notch > 0) {
		su.playSound('sound_krw', 'train.2000Sq', 1, 1, false);
	}
	else {
		su.stopSound('sound_krw', 'train.2000Sq');
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (isControlCar) {
		
		var isOver5 = dataMap.getBoolean('isOver5');
		var isOver10 = dataMap.getBoolean('isOver10');
		var isPushHorn = dataMap.getBoolean("isPushHorn");

		//ATS超過時音声
		if (isOver5) {
			su.playSound('sound_krw', 'train.Pattern_Arr', 1, 1);
		}

		else {
			su.stopSound('sound_krw', 'train.Pattern_Arr');
		}	

		if (isOver10) {
			su.playSound('sound_krw', 'train.Pattern_Emr', 1, 1);
		}

		else {
			su.stopSound('sound_krw', 'train.Pattern_Emr');
		}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (signal == 10) {
		su.playSound('sound_krw', 'train.Pattern_Action10', 1, 1, false);
	}

	else{
		su.stopSound('sound_krw', 'train.Pattern_Action10');
	}


	if (signal == 11) {
		su.playSound('sound_krw', 'train.Pattern_Action11', 1, 1, false);
		}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action11');
	}


	if (signal == 12) {
		su.playSound('sound_krw', 'train.Pattern_Action12', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action12');
	}


	if (signal == 13) {
		su.playSound('sound_krw', 'train.Pattern_Action13', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action13');
	}


	if (signal == 14) {
	su.playSound('sound_krw', 'train.Pattern_Action14', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action14');
	}


	if (signal == 15) {
		su.playSound('sound_krw', 'train.Pattern_Action15', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action15');
	}


	if(signal == 16){
		su.playSound('sound_krw', 'train.Pattern_Action16', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action16');
	}


	if (signal == 17) {
		su.playSound('sound_krw', 'train.Pattern_Action17', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action17');
	}


	if (signal == 18) {
		su.playSound('sound_krw', 'train.Pattern_Action18', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action18');
	}


	if (signal == 19) {
		su.playSound('sound_krw', 'train.Pattern_Action19', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action19');
	}


	if (signal == 20) {
		su.playSound('sound_krw', 'train.Pattern_Action20', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action20');
	}


	if (signal == 21) {
		su.playSound('sound_krw', 'train.Pattern_Action21', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action21');
	}


	if (signal == 22) {
		su.playSound('sound_krw', 'train.Pattern_Action22', 1, 1, false);
	}

	else {
		su.stopSound('sound_krw', 'train.Pattern_Action22');
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//ORP音声
		if (signal == 21) {
			su.playSound('sound_krw', 'train.ATS_Stopping', 1, 1, false);
		}

		else {
			su.stopSound('sound_krw', 'train.ATS_Stopping');
		}

		if (signal == 21 && speed > 1 && speed < 25) {
			su.playSound('sound_krw', 'train.ATS_ORP', 1, 1);
		}

		else {
			su.stopSound('sound_krw', 'train.ATS_ORP');
		}

		//警笛長押し
		if (isPushHorn) {
			su.playSound('sound_krw', 'train.KRWEHorn1', 1, 1, false);
			su.stopSound('sound_krw', 'train.KRWEHorn2');
		}

		else {
			su.stopSound('sound_krw', 'train.KRWEHorn1');
			su.playSound('sound_krw', 'train.KRWEHorn2', 1, 1, false);
		}

		//非常警笛長押し
		if (isPushEmr) {
			su.playSound('sound_krw', 'train.KRWAirHorn1', 1, 1, false);
			su.stopSound('sound_krw', 'train.KRWAirHorn2');
		}

		else {
			su.stopSound('sound_krw', 'train.KRWAirHorn1');
			su.playSound('sound_krw', 'train.KRWAirHorn2', 1, 1, false);
		}
	}
  
	if (speed>0.1) {

		//Loop
		if (speed > 0 && speed < 180) {
			su.playSound('sound_mhnlib', 'RTMLib.loop.loop_20', 0.9, 1.0);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.loop.loop_20');
		}

		if (notch!=0) {

			//run0
			if (speed > 0 && speed < 7 && notch > 0) {
				var vol0 = 1.0;
				if (speed < 1) vol0 = fadeCon(0, 0.0, 1, 1.0, su);
				if (speed > 4) vol0 = fadeCon(4, 1.0, 7, 0.0, su);
				su.playSound('sound_krw', 'train.2000_0', 1.0, vol0);
			} else {
				su.stopSound('sound_krw', 'train.2000_0');
			}

			//run0d
			if (speed > 2 && speed < 7 && notch < 0) {
				var vol0d = 1.0;
				if (speed > 4) vol0d = fadeCon(4, 1.0, 7, 0.0, su);
				su.playSound('sound_krw', 'train.2000_0d', 1.0, vol0d);
			} else {
				su.stopSound('sound_krw', 'train.2000_0d');
			}
			
			//run1
			if (speed>0&&speed<13 && notch > 0) {
				var vol1 = 1.0;
				if (speed < 5) vol1 = fadeCon(0, 0.0, 5, 1.0, su);
				if (speed > 7) vol1 = fadeCon(7, 1.0, 13, 0.0, su);
				su.playSound('sound_krw', 'train.2000_1', vol1, 1.0);
			} else {
				su.stopSound('sound_krw', 'train.2000_1');
			}

			//run1d
			if (speed > 2 && speed < 20 && notch < 0) {
				var vol1d = 1.0;
				if (speed < 6) vol1d = fadeCon(2, 0.0, 6, 1.0, su);
				if (speed > 12) vol1d = fadeCon(12, 1.0, 20, 0.0, su);
				su.playSound('sound_krw', 'train.2000_1d', vol1d, 1.0);
			} else {
				su.stopSound('sound_krw', 'train.2000_1d');
			}

			//run2
			if (speed > 5 && speed < 30) {
			var vol2 = 1.0;
				if (speed < 10) vol2 = fadeCon(5, 0.0, 10, 1.0, su);
				if (speed > 15) vol2 = fadeCon(15, 1.0, 30, 0.0, su);
				su.playSound('sound_krw', 'train.2000_2', vol2, 1.0);
			} else {
				su.stopSound('sound_krw', 'train.2000_2');
			}

			//run3
			if (speed > 4 && speed < 28) {
				var pit3 = fadeCon(4, 0.9, 28, 1.7, su);
				var vol3 = 1.0;
				if (speed < 13) vol3 = fadeCon(4, 0.0, 13, 1.0, su);
				if (speed > 14) vol3 = fadeCon(14, 1.0, 28, 0.0, su);
				su.playSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_2', vol3, pit3);
			} else {
				su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_2');
			}

			//run4
			if (speed > 12 && speed < 25 && notch > 0) {
				var pit4 = fadeCon(12, 0.8, 25, 1.1, su),
					vol4 = 1.0;
				if (speed < 16) vol4 = fadeCon(12, 0.0, 16, 1.0, su);
				su.playSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3', vol4, pit4);
			} else {
				su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3');
			}

			//run4d
			if (speed > 5 && speed < 30 && notch < 0) {
			var pit4d = fadeCon(5, 0.6, 30, 1.3, su),
				vol4d = 1.0;
			if (speed < 12) vol4d = fadeCon(5, 0.0, 12, 1.0, su);
			if (speed > 22) vol4d = fadeCon(22, 0.0, 30, 1.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3d', vol4d, pit4d);
			} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3d');
			}
		}

	//ここまでノッチオフ時に音OFF

		else{
			su.stopSound('sound_krw', 'train.2000_0');
			su.stopSound('sound_krw', 'train.2000_0d');
			su.stopSound('sound_krw', 'train.2000_1');
			su.stopSound('sound_krw', 'train.2000_1d');
			su.stopSound('sound_krw', 'train.2000_2');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_2');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3d');
		}

	//ここよりノッチオフ時も音ON

		//run5
		if (speed > 25 && speed < 47 && notch > 0) {
			var pit5 = fadeCon(25, 0.9, 47, 1.3, su);
			var vol5 = 1.0;
			if (speed > 40) vol5 = fadeCon(40, 1.0, 47, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4', vol5, pit5);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4');
		}

		//run5d
		if (speed > 15 && speed < 47 && notch < 0) {
			var pit5d = fadeCon(15, 0.8, 47, 1.3, su);
			var vol5d = 1.0;
			if(speed < 26) vol5d = fadeCon(15, 0.0, 26, 1.0, su);
			if(speed > 40) vol5d = fadeCon(40, 1.0, 47, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4d', vol5d, pit5d);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4d');
		}

		//run6
		if (speed > 40 && speed < 72) {
			var pit6 = fadeCon(40, 0.9, 72, 1.4, su),
				vol6 = 1.0;
			if (speed < 47) vol6 = fadeCon(40, 0.0, 47, 1.0, su);
			if (speed > 63) vol6 = fadeCon(63, 1.0, 72, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan5', vol6, pit6);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan5');
		}

		//run7
		if (speed > 63 && speed < 160) {
			var pit7 = fadeCon(63, 0.8, 160, 1.4, su);
			var vol7 = 1.0;
			if (speed < 72) vol7 = fadeCon(63, 0.0, 72, 1.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan6', vol7, pit7);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan6');
		}



	//EBの時音を消す構文

		if (notch == -8) {
			su.stopSound('sound_krw', 'train.2000_0');
			su.stopSound('sound_krw', 'train.2000_0d');
			su.stopSound('sound_krw', 'train.2000_1');
			su.stopSound('sound_krw', 'train.2000_1d');
			su.stopSound('sound_krw', 'train.2000_2');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_2');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3d');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4d');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan5');
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan6');
		}



		//Run30km
		if (speed > 0.1 && speed < 60) {
			var pit11 = fadeCon(0, 0.5, 30, 1.0, su);
			var vol11 = 1.0;
			if (speed < 10) vol11 = fadeCon(0, 0.0, 10, 1.0, su);
			if (speed > 40) vol11 = fadeCon(40, 1.0, 60, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2', vol11, pit11);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2');
		}

		//Run60km
		if (speed > 40 && speed < 90 && !su.inTunnel()) {
			var pit12 = fadeCon(60, 1.0, 90, 1.5, su);
			var vol12 = 1.0;
			if (speed < 50) vol12 = fadeCon(40, 0.0, 50, 1.0, su);
			if (speed > 70) vol12 = fadeCon(70, 1.0, 90, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2', vol12, pit12);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2');
		}

		//Run60kmT
		if (speed > 40 && speed < 90 && su.inTunnel()) {
			var pit13 = fadeCon(60, 1.0, 90, 1.5, su);
			var vol13 = 1.0;
			if (speed < 50) vol13 = fadeCon(40, 0.0, 50, 1.0, su);
			if (speed > 70) vol13 = fadeCon(70, 1.0, 90, 0.0, su);
			su.playSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3', vol13, pit13);
		} else {
			su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3');
		}

		//Run120km
		if (speed > 70 && speed < 165 && !su.inTunnel()) {
			var pit14 = fadeCon(60, 0.5, 165, 1.6, su);
			var vol14 = 1.0;
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

	//全ての走行音をstop処理
	else {
		su.stopSound('sound_krw', 'train.2000_0');
		su.stopSound('sound_krw', 'train.2000_0d');
		su.stopSound('sound_krw', 'train.2000_1');
		su.stopSound('sound_krw', 'train.2000_1d');
		su.stopSound('sound_krw', 'train.2000_2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_3d');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.MhnIGBT_Ty.Ty225F_4d');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan5');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Keihan_Toyo_New.Keihan6');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run30km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run60kmT3');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120km2');
		su.stopSound('sound_mhnlib', 'RTMLib.Run.Common.Run120kmT');
  	}
}

function PlayCompressor(su,CP,CPA,CPE) {
	if (su.isComplessorActive()) {
		su.playSound('sound_mhnlib', CPA, 0.7, 1, false);
		su.playSound('sound_mhnlib', CP, 0.7, 1);
		su.stopSound('sound_mhnlib', CPE);
	} else {
		su.stopSound('sound_mhnlib', CPA);
		su.stopSound('sound_mhnlib', CP);
		su.playSound('sound_mhnlib', CPE, 0.7, 1, false);
	}
  
}

//fadeCon(速度A,フェードA,速度B,フェードB,su);
//→速度A=フェードA、速度B=フェードBの直線の方程式に速度を当てた値を返す
//ボリュームやピッチに使用可能
function fadeCon(speed1,fade1,speed2,fade2,su) {
	var speed = su.getSpeed();
	return (((fade2-fade1)/(speed2-speed1))*(speed-speed1))+fade1;
} 