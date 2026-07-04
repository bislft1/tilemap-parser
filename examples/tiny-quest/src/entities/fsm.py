from typing import Dict, Generic, Protocol, TypeVar

from tilemap_parser import AnimationPlayer

T = TypeVar("T", bound=object)


class BaseFsm(Generic[T]):
    def __init__(self, name: str) -> None:
        self.name = name

    def enter(self, entity: T, /) -> None:
        pass

    def exit(self, entity: T, /) -> None:
        pass

    def get_next_state(self, entity: T, /) -> str | None:
        return None

    def update(self, entity: T, /) -> None:
        pass


class StatefulEntity(Protocol):
    states: Dict[str, BaseFsm]
    current_state: BaseFsm
    animation_states: Dict[str, AnimationPlayer]


class StateManager:
    @staticmethod
    def update(entity: StatefulEntity) -> None:
        current = entity.current_state
        next_state = current.get_next_state(entity)
        if next_state is not None:
            current.exit(entity)
            entity.current_state = entity.states[next_state]
            entity.current_state.enter(entity)
            entity.animation_states[next_state].reset()
        entity.current_state.update(entity)
