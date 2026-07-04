from pathlib import Path
from typing import Dict, Tuple

import pygame
from pygame import Surface
from tilemap_parser import get_shape_aabb
from tilemap_parser.parser import CharacterCollision

from src.utils.animation import load_animation_system

from .fsm import BaseFsm, StateManager


class Entity:
    def __init__(
        self,
        x: float,
        y: float,
        collision: CharacterCollision,
        anim_path: Path,
        states: Dict[str, BaseFsm],
        apply_shape_bound=False,
    ) -> None:
        animation_system = load_animation_system(anim_path)
        self.x = x
        self.y = y
        self.vx = 0.0
        self.vy = 0.0
        self.collision_shape = collision.shape
        self.flipped = False
        self.animation_states = animation_system["animation_states"]
        self.states = states
        self.current_state = states[next(iter(states))]
        self._shape_bounds = animation_system["shape_bound"]
        self._show_debug = True

        self.collision_layer = collision.collision_layer
        self.collision_mask = collision.collision_mask

        self.apply_shape_bound = apply_shape_bound

    def update(self, dt: float):
        StateManager.update(self)
        self.animation_states[self.current_state.name].update(dt * 1000)

    def render(self, surface: Surface, offset: Tuple[float | int, float | int]):
        current_frame = self.animation_states[self.current_state.name].get_current_image()
        if self.apply_shape_bound:
            current_frame = current_frame.subsurface(self._shape_bounds[self.current_state.name])  # type: ignore
        left, top, right, bottom = get_shape_aabb(self.x, self.y, self.collision_shape)
        pos = current_frame.get_rect(midbottom=((left + right) * 0.5 - offset[0], bottom - offset[1]))  # type: ignore
        if self.flipped:
            current_frame = pygame.transform.flip(current_frame, True, False)  # type: ignore
        surface.blit(current_frame, pos)  # type: ignore
