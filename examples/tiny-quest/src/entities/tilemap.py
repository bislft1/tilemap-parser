from tilemap_parser import TilemapData, TilesetCollision, rect_vs_tilemap


class Tilemap:
    def __init__(self, mapdata: TilemapData, tileset_collision: TilesetCollision) -> None:
        excludable_layers = {"nature"}
        self.tilemap = mapdata.build_tile_map(excludable_layers)
        self.tilesize = mapdata.tile_size
        self.render_scale = mapdata.render_scale
        self.tileset_collision = tileset_collision

    def rect_collides(self, left, top, right, bottom):
        return rect_vs_tilemap(
            left, top, right, bottom,
            self.tilemap,
            self.tileset_collision,
            self.tilesize,
            self.render_scale,
        )
