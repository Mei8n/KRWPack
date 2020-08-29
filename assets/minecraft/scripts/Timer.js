var prevTick = renderer.getData(entityID << prevTickID);
var currentTick = renderer.getTick(entity);
shouldUpdate = ((prevTick != currentTick) && (pass == 0));
if(shouldUpdate) renderer.setData(entityID << prevTickID, currentTick);

if (signal = 20 && !atsWarnEmr) {
	var countup = parseInt(renderer.getData(entityID << countupID)) % 20;
	if(shouldUpdate) renderer.setData(entityID << countupID, parseInt(++count));

	if(count >= 0 && count <= 10) {

		atsON.render(renderer);
	}

	if(count > 10 && count <= 20) {

		atsOFF.render(renderer);
	}
}

if (atsWarnEmr) atsON.render(renderer);