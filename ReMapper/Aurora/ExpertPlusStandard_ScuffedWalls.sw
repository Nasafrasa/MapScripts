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
  Path:water.dae
  Type:1
  Duration:659
  Position:[0,0.5,0]
  AnimatePosition:[0, 0, 0, 0], [0, 0, -100, 1]
  color:[0,0,0,0]

0:ModelToWall
  Path:TangerEnvironment.dae
  Track:env
  Type:3