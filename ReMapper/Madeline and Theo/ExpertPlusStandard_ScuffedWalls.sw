# ScuffedWalls v2.1.1

# Documentation on functions can be found at
# https://github.com/thelightdesigner/ScuffedWalls/blob/main/Functions.md

# Using this tool requires an understanding of Noodle Extensions.
# https://github.com/Aeroluna/Heck/wiki

# If the documentation is not sufficient
# DM thelightdesigner#0832 or iswimfly#0556 for help (Discord)
# Noodle Extension Community Discord https://discord.gg/ZDC3pG3xB8

Workspace


0: Import
   Path:ExpertStandard.dat

0:Run
  Script:script.ts
  RunBefore: false
  RefreshOnSave: true

0:ModelToWall
  Path:CelesteEnvironment.dae
  Track:env
  Type:3

#Stars

0:Wall
  Repeat:500
  NJSOffset:-10
  Rotation:[-55,0,0]
  Position:[Random(-750,750),Random(-400,400),Random(-50,50)]
  Scale:[1,1,1]
  Color:HSLtoRGB(Random(0.1,1),Random(0.9,1),Random(0.9,1),0)
  animatedefiniteposition:[0,0,300,0]
  Duration:1000
  AnimateDissolve:[0,0],[1,0.2]