from typing import Union, cast

from tilemap_parser import CollisionHit

from src.entities.enemies.arial import EyeFire, MutatedBat
from src.entities.enemies.devilkin2 import Devilkin2
from src.entities.player.player import Player

TEnemyTypes = Union[EyeFire, MutatedBat, Devilkin2]

eligible_states: dict[type[TEnemyTypes], tuple[str | None, int]] = {
    EyeFire: (None, 0),
    MutatedBat: ("explode", 2),
    Devilkin2: ("attack", 2),
}


def resolve_player_enemy_hit(player: Player, hit: CollisionHit) -> None:
    enemy = cast(TEnemyTypes, hit.other(player))

    entry = eligible_states.get(type(enemy))
    if entry is None:
        return

    state, min_frame = entry
    if state is not None and enemy.current_state.name != state:
        return
    if enemy.animation_states[enemy.current_state.name].frame_index < min_frame:
        return

    player.is_hitted = True
    player.hit_result = hit
