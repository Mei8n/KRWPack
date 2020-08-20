# KRWPack

[![MCVer](https://img.shields.io/badge/Minecraft-1.7.10-brightgreen)](https://www.minecraft.net/)
[![ForgeVer](https://img.shields.io/badge/Forge-10.13.4.1614-important)](https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.7.10.html)
[![RTMVer](https://img.shields.io/badge/RealTrainMod-1.7.10.40-informational)](https://www.curseforge.com/minecraft/mc-mods/realtrainmod/files/2940834)  
[![DLCount](https://img.shields.io/github/downloads/Mei8n/KRWPack/total)](https://github.com/Mei8n/KRWPack/releases)
[![DLCountLatest](https://img.shields.io/github/downloads/Mei8n/KRWPack/latest/total)](https://github.com/Mei8n/KRWPack/releases/latest)
[![LatestRelease](https://img.shields.io/github/v/release/Mei8n/KRWPack)](https://github.com/Mei8n/KRWPack/releases/latest)
[![LatestPreRelease](https://img.shields.io/github/v/release/Mei8n/KRWPack?include_prereleases)](https://github.com/Mei8n/KRWPack/releases)

Ver:0.1 現在更新中 800系が完成したらVer1.0リリースします

## Download

Latest Release [Download](https://github.com/Mei8n/KRWPack/releases/latest)  
Latest Pre-Release [Download](https://github.com/Mei8n/KRWPack/releases)

## ATS仕様書

Hキー(仮) 保安電源投入\
Jキー(仮) 保安電源切(構内走行時、無閉塞運転時等に使用)

Signal 22 ATS投入\
Signal 23 ATC投入
上記2つは走行中/停車中の切り替えで使用


### ATS-MK
曲線制限+5km/h以内 ブレーキ無し、予告鳴動\
曲線制限+5km/h以上10km/h以内 常用ブレーキ(4段)動作 動作音鳴動\
曲線制限+10km/h以上15km/h以内 常用ブレーキ(7段)動作 動作音鳴動\
曲線制限+15km/h以上 非常ブレーキ動作 動作音鳴動\

現示変化時音鳴動

出発信号停止時に特定信号地上子通過時警報音鳴動、5秒以内にブレーキ操作ない場合ブレーキ動作(ATS-Sにおけるロング警報)

過走防止予告信号 音鳴動\
絶対停止信号(過走防止)


#### Signal

10 非設\
11 15km/h\
12 25km/h\
13 30km/h\
14 45km/h\
15 65km/h\
16 90km/h\
17 100km/h\
18 110km/h\
19 120km/h\
20 ロング警報\
21 ORP予告\
22 絶対停止信号




### MK-ATC(未実装)
曲線制限+2km/h未満 ブレーキ無し、予告鳴動\
曲線制限+2km/h 常用ブレーキ(1段)動作 動作音鳴動\
曲線制限+3km/h 常用ブレーキ(2段)動作 動作音鳴動\
曲線制限+4km/h 常用ブレーキ(3段)動作 動作音鳴動\
曲線制限+5km/h～6km/h 常用ブレーキ(4段)動作 動作音鳴動\
曲線制限+7km/h～8km/h 常用ブレーキ(5段)動作 動作音鳴動\
曲線制限+9km/h～12km/h 常用ブレーキ(6段)動作 動作音鳴動\
曲線制限+13km/h～18km/h 常用ブレーキ(7段)動作 動作音鳴動\
曲線制限+18km/h～非常ブレーキ(8段)動作 EB動作音鳴動\

現示変化時音鳴動

出発信号停止時に特定信号地上子通過時警報音鳴動、5秒以内にブレーキ操作ない場合ブレーキ動作(ATS-Sにおけるロング警報)

過走防止予告信号 音鳴動\
絶対停止信号(過走防止)


#### Signal

30 非設\
31 15km/h\
32 25km/h\
33 30km/h\
34 35km/h\
35 45km/h\
36 55km/h\
37 60km/h\
38 65km/h\
39 70km/h\
40 80km/h\
41 90km/h\
42 100km/h\
43 110km/h\
44 120km/h\
45 ロング警報\
46 ORP予告
