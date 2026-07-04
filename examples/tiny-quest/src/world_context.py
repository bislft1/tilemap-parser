from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entities.player.player import Player


class _WorldContext:
    player: "Player"


world_context = _WorldContext()
