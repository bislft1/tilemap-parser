from pathlib import Path
from typing import Dict, List, TypedDict

from pygame import Rect
from tilemap_parser import AnimationPlayer, SpriteAnimationSet


class AnimationSystem(TypedDict, total=True):
    animation_set: SpriteAnimationSet
    animation_keys: List[str]
    shape_bound: Dict[str, Rect]
    animation_states: Dict[str, AnimationPlayer]


def load_shape_bound(keys: List[str], animation_set: SpriteAnimationSet):
    bounds: Dict[str, Rect] = {}
    for name in keys:
        bound_rect = animation_set.get_content_bounds(name)
        if bound_rect is None:
            raise ValueError(f"mismatch in animation state: {name}")
        bounds[name] = bound_rect
    return bounds


def load_animation_system(path: Path) -> AnimationSystem:
    animation_set = SpriteAnimationSet.load(path)
    animation_keys = list(animation_set.library.animations.keys())
    shape_bounds = load_shape_bound(animation_keys, animation_set)
    animation_states = {k: AnimationPlayer(animation_set, k) for k in animation_keys}
    return {
        "animation_states": animation_states,
        "shape_bound": shape_bounds,
        "animation_keys": animation_keys,
        "animation_set": animation_set,
    }
