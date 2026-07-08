from pathlib import Path


WIDTH = 1280
HEIGHT = 720
FPS = 60
TITLE = "Game"


BASE_PATH = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_PATH / "data"
ASSETS_PATH = BASE_PATH / "assets"
NODES_PATH = DATA_PATH / "nodes"
COLLISION_TILESET_PATH = DATA_PATH / "collision"


BLACK = (0, 0, 0, 255)
WHITE = (255, 255, 255, 255)
RED = (255, 0, 0, 255)
GREEN = (0, 255, 0, 255)
BLUE = (0, 0, 255, 255)
YELLOW = (255, 255, 0, 255)
CYAN = (0, 255, 255, 255)
MAGENTA = (255, 0, 255, 255)
GRAY = (128, 128, 128, 255)
TRANSPARENT = (0, 0, 0, 0)


CHARACTER_COLLISION_PATH = BASE_PATH / "data" / "character_collision"
ANIMATION_PATH = BASE_PATH / "data" / "animations"


DEFAULT_CHANGE_RANGE = 300
SPEED_LOW = 100
SPEED_NORMAL = 200
