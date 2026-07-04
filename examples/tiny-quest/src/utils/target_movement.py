from dataclasses import dataclass

from src.entities.entity import Entity
from src.utils.pgdebug import pgdebug
from src.utils.shape import get_sprite_center


@dataclass(frozen=True)
class EnemyTargetMoverConfig:
    speed: float
    stop_dist: float


def velocity_toward_target(
    entity: "Entity",
    target: "Entity",
    *,
    config: EnemyTargetMoverConfig,
) -> tuple[float, float, float]:
    ecx, ecy = get_sprite_center(entity)
    tcx, tcy = get_sprite_center(target)

    dx = tcx - ecx
    dy = tcy - ecy
    length2 = dx * dx + dy * dy
    if length2 == 0.0:
        return 0.0, 0.0, 0.0

    length = length2**0.5

    if length <= config.stop_dist:
        return 0.0, 0.0, length

    vx = (dx / length) * config.speed
    vy = (dy / length) * config.speed
    return vx, vy, length
