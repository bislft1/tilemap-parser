from typing import TYPE_CHECKING, List, cast

from pygame import Surface
from tilemap_parser import ObjectCollisionManager

from src.entities.enemies.arial import ArialEnemyBase
from src.entities.enemies.devilkin2 import Devilkin2

if TYPE_CHECKING:
    from src.entities.entity import Entity


class EnemyManager:
    manager = ObjectCollisionManager()

    @classmethod
    def add(cls, obj: "Entity"):
        cls.manager.add_object(obj)

    @classmethod
    def remove(cls, obj: "Entity"):
        cls.manager.remove_object(obj)

    @classmethod
    def update(cls, dt: float):
        removable_enemies = []

        enemies = cast(List["Entity"], cls.manager.objects)
        for enemy in enemies:
            enemy.update(dt)
            if isinstance(enemy, (ArialEnemyBase, Devilkin2)):
                if enemy.can_kill():
                    removable_enemies.append(enemy)

        cls.remove_enemies(removable_enemies)

    @classmethod
    def render(cls, surface: Surface, offset=(0, 0)):
        enemies = cast(List["Entity"], cls.manager.objects)
        for enemy in enemies:
            enemy.render(surface, offset)

    @classmethod
    def get_enemies(cls):
        return cls.manager.objects

    @classmethod
    def remove_enemies(cls, enemies: List["Entity"]):
        for enemy in enemies:
            cls.manager.remove_object(enemy)
